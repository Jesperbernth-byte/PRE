
import React, { useState, useRef } from 'react';
import { Camera, Upload, Loader2, Search, CheckCircle2, AlertTriangle, ArrowRight, Send, MessageCircle } from 'lucide-react';
import { analyzeProblemImage, askFollowUpQuestion } from '../services/geminiService';

interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

const ImageAnalyzer: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [followUpQuestion, setFollowUpQuestion] = useState('');
  const [isAskingFollowUp, setIsAskingFollowUp] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const processFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const performAnalysis = async () => {
    if (!image) return;
    
    setIsAnalyzing(true);
    const base64Data = image.split(',')[1];
    const mimeType = image.split(';')[0].split(':')[1];
    
    const aiResult = await analyzeProblemImage(base64Data, mimeType);
    setResult(aiResult);
    setIsAnalyzing(false);
  };

  const reset = () => {
    setImage(null);
    setResult(null);
    setChatMessages([]);
    setFollowUpQuestion('');
  };

  const handleFollowUpQuestion = async () => {
    if (!followUpQuestion.trim() || !image || !result) return;

    const userMessage: ChatMessage = {
      role: 'user',
      text: followUpQuestion
    };

    setChatMessages(prev => [...prev, userMessage]);
    setFollowUpQuestion('');
    setIsAskingFollowUp(true);

    // Scroll to bottom
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);

    const base64Data = image.split(',')[1];
    const mimeType = image.split(';')[0].split(':')[1];

    const aiResponse = await askFollowUpQuestion(
      base64Data,
      mimeType,
      result,
      [...chatMessages, userMessage]
    );

    const assistantMessage: ChatMessage = {
      role: 'assistant',
      text: aiResponse
    };

    setChatMessages(prev => [...prev, assistantMessage]);
    setIsAskingFollowUp(false);

    // Scroll to bottom again
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Upload/Preview Zone */}
        <div className="p-8 bg-slate-50 flex flex-col items-center justify-center min-h-[300px] border-r">
          {!image ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className={`w-full h-full border-4 border-dashed rounded-3xl flex flex-col items-center justify-center p-10 cursor-pointer transition-all group ${
                isDragging
                  ? 'border-orange-600 bg-orange-50 scale-[1.02]'
                  : 'border-slate-200 hover:border-blue-900/30 hover:bg-white'
              }`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all ${
                isDragging
                  ? 'bg-orange-600 text-white scale-110'
                  : 'bg-blue-900/5 text-blue-900 group-hover:scale-110'
              }`}>
                {isDragging ? <Upload size={32} className="animate-bounce" /> : <Camera size={32} />}
              </div>
              <h3 className={`text-lg font-black mb-2 uppercase tracking-tight text-center transition-colors ${
                isDragging ? 'text-orange-600' : 'text-slate-800'
              }`}>
                {isDragging ? 'Slip billedet her!' : 'Tag eller upload et billede'}
              </h3>
              <p className="text-sm text-slate-500 text-center leading-relaxed">
                {isDragging
                  ? 'Slip for at uploade billedet'
                  : 'Klik for at vælge eller træk og slip et billede her'}
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-widest">
                <Upload size={14} />
                <span>Drag & Drop eller Klik</span>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
            </div>
          ) : (
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <img src={image} alt="Preview" className="w-full h-full object-cover" />
              <button 
                onClick={reset}
                className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700 transition-colors"
              >
                <AlertTriangle size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Analysis Zone */}
        <div className="p-8 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white">
              <Search size={20} />
            </div>
            <h3 className="text-xl font-black text-blue-900 uppercase italic">AI Billedanalyse</h3>
          </div>

          {!result && !isAnalyzing && (
            <div className="flex-1 flex flex-col justify-center">
              <p className="text-slate-600 mb-8 leading-relaxed">
                Når du har uploadet et billede af dit problem (f.eks. en brønd, fugt i kælderen eller mistænkelig asbest), kan vi bruge kunstig intelligens til at give en foreløbig vurdering.
              </p>
              <button 
                onClick={performAnalysis}
                disabled={!image}
                className="w-full bg-blue-900 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-orange-600 disabled:opacity-50 disabled:bg-slate-300 transition-all uppercase tracking-widest shadow-xl shadow-blue-900/20 active:scale-95"
              >
                {image ? 'START ANALYSE NU' : 'UPLOAD BILLEDE FØRST'}
              </button>
            </div>
          )}

          {isAnalyzing && (
            <div className="flex-1 flex flex-col items-center justify-center py-10">
              <Loader2 className="animate-spin text-orange-600 mb-4" size={48} />
              <p className="text-slate-800 font-black uppercase text-sm tracking-widest animate-pulse">Analyserer dit billede...</p>
              <p className="text-xs text-slate-400 mt-2">Dette tager normalt 5-10 sekunder</p>
            </div>
          )}

          {result && !isAnalyzing && (
            <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-right-4 duration-500">
              {/* Initial Analysis Result */}
              <div className="bg-blue-50 border-l-4 border-blue-900 p-6 rounded-r-2xl mb-4">
                <h4 className="font-black text-blue-900 uppercase text-xs tracking-widest mb-3 flex items-center gap-2">
                  <CheckCircle2 size={14} /> AI Vurdering
                </h4>
                <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                  {result}
                </div>
              </div>

              {/* Chat Messages */}
              {chatMessages.length > 0 && (
                <div className="mb-4 max-h-[300px] overflow-y-auto space-y-3 pr-2">
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl ${
                        msg.role === 'user'
                          ? 'bg-slate-100 ml-4'
                          : 'bg-orange-50 border-l-4 border-orange-600 mr-4'
                      }`}
                    >
                      <div className="text-[10px] font-black uppercase tracking-widest mb-2 text-slate-500">
                        {msg.role === 'user' ? 'Dit spørgsmål' : 'AI Svar'}
                      </div>
                      <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
              )}

              {/* Follow-up Question Input */}
              <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <MessageCircle size={16} className="text-blue-900" />
                  <h5 className="text-xs font-black text-blue-900 uppercase tracking-widest">
                    Stil Spørgsmål Om Billedet
                  </h5>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={followUpQuestion}
                    onChange={(e) => setFollowUpQuestion(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleFollowUpQuestion()}
                    placeholder="F.eks. Hvilken producent er det?"
                    disabled={isAskingFollowUp}
                    className="flex-1 border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-600 focus:border-orange-600 outline-none transition-all font-bold disabled:bg-slate-100 disabled:opacity-50"
                  />
                  <button
                    onClick={handleFollowUpQuestion}
                    disabled={!followUpQuestion.trim() || isAskingFollowUp}
                    className="bg-orange-600 text-white px-6 rounded-xl hover:bg-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-black uppercase text-xs tracking-widest"
                  >
                    {isAskingFollowUp ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Send size={16} />
                    )}
                  </button>
                </div>
                <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">
                  AI'en har billedet i kontekst og kan svare på specifikke spørgsmål om det.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto space-y-3">
                <a
                  href="#/contact"
                  className="w-full bg-orange-600 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-orange-700 transition-all uppercase text-xs tracking-widest shadow-lg shadow-orange-600/20"
                >
                  BESTIL BESIGTIGELSE <ArrowRight size={14} />
                </a>
                <button
                  onClick={reset}
                  className="w-full bg-white text-slate-500 font-bold py-3 rounded-xl hover:text-slate-800 transition-colors uppercase text-[10px] tracking-widest"
                >
                  PRØV IGEN MED ET NYT BILLEDE
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="bg-slate-900 p-4 text-center">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Bemærk: AI-analysen er vejledende. En autoriseret ekspert foretager altid den endelige vurdering.
        </p>
      </div>
    </div>
  );
};

export default ImageAnalyzer;
