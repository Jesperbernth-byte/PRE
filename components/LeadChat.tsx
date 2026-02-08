
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, User, Bot, PhoneCall, Loader2 } from 'lucide-react';
import { getChatResponse, qualifyLeadWithAI } from '../services/geminiService';
import { COMPANY_NAME, PHONE_JACOB } from '../constants';

const LeadChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: 'Dav! Jeg er din assistent hos PR Entreprenøren. Hvad kan vi hjælpe dig med i dag? (Er det f.eks. vand i kælderen, rotter eller kloakseparering?)' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    const history = messages.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
    const aiResponse = await getChatResponse(history, userMessage);

    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);

    // Check if we have enough info to qualify the lead (conversation longer than 6 messages)
    if (messages.length > 6) {
      const fullConversation = messages.map(m => `${m.role}: ${m.text}`).join('\n') + `\nuser: ${userMessage}\nmodel: ${aiResponse}`;

      // Qualify lead with AI and submit
      try {
        const leadData = await qualifyLeadWithAI(fullConversation);

        if (leadData && leadData.name && leadData.phone) {
          // Submit lead to backend (saves to DB + sends SMS to Jacob)
          const submitResponse = await fetch('/api/pre/leads/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...leadData,
              conversation: fullConversation
            })
          });

          const result = await submitResponse.json();

          if (result.success) {
            console.log('✅ Lead submitted successfully:', result.leadId);
          } else {
            console.error('❌ Lead submission failed:', result.message);
          }
        }
      } catch (error) {
        console.error('Lead qualification error:', error);
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="bg-white w-[350px] sm:w-[400px] h-[500px] rounded-2xl shadow-2xl border flex flex-col mb-4 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-blue-900 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-lg">PR</div>
              <div>
                <h3 className="font-bold text-sm">PR Entreprenøren AI</h3>
                <p className="text-[10px] text-blue-200">Svarer med det samme (24/7)</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded">
              <X size={20} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-3 text-sm shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-900 text-white rounded-tr-none' 
                    : 'bg-white text-slate-700 rounded-tl-none border border-slate-200'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-slate-400 rounded-2xl rounded-tl-none p-3 border border-slate-200 flex items-center gap-2">
                  <Loader2 className="animate-spin" size={16} />
                  <span>Skriver...</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t bg-white">
            <div className="flex gap-2 mb-2">
              <button 
                onClick={() => window.location.href = `tel:${PHONE_JACOB.replace(/\s/g, '')}`}
                className="text-[11px] font-bold text-blue-900 flex items-center gap-1 border border-blue-900/20 px-2 py-1 rounded-full hover:bg-blue-50"
              >
                <PhoneCall size={12} /> Ring Jacob
              </button>
              <button 
                onClick={() => setInput("Er det akut?")}
                className="text-[11px] font-bold text-red-600 flex items-center gap-1 border border-red-600/20 px-2 py-1 rounded-full hover:bg-red-50"
              >
                Hjælp nu!
              </button>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Skriv din besked her..."
                className="flex-1 border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20"
              />
              <button
                onClick={handleSend}
                disabled={isTyping || !input.trim()}
                className="bg-blue-900 text-white p-2 rounded-xl hover:bg-blue-800 disabled:opacity-50 transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-900 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform group"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} className="group-hover:rotate-6" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-500 border-2 border-white"></span>
          </span>
        )}
      </button>
    </div>
  );
};

export default LeadChat;
