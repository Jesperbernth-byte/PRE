import React, { useState, useEffect } from 'react';
import { Save, Phone, Globe, Image as ImageIcon, HelpCircle, Award, Loader2, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';

type Section = 'contact' | 'hero' | 'footer' | 'faq' | 'certifications' | 'images';

const ContentEditor: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>('contact');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);
  const [fileSha, setFileSha] = useState<string>('');
  const [content, setContent] = useState<any>(null);
  const [editedContent, setEditedContent] = useState<any>(null);

  const loadContent = async () => {
    setLoading(true);
    setSaveMsg(null);
    try {
      const res = await fetch('/api/content/read');
      const data = await res.json();
      if (data.success) {
        setContent(data.content);
        setEditedContent(JSON.parse(JSON.stringify(data.content)));
        setFileSha(data.sha);
      } else {
        setSaveMsg({ type: 'err', text: '❌ Kunne ikke hente indhold: ' + data.message });
      }
    } catch (e: any) {
      setSaveMsg({ type: 'err', text: '❌ Netværksfejl: ' + e.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadContent(); }, []);

  const handleSave = async (description: string) => {
    setSaving(true);
    setSaveMsg(null);
    try {
      const res = await fetch('/api/content/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: editedContent, sha: fileSha, changeDescription: description })
      });
      const data = await res.json();
      if (data.success) {
        setSaveMsg({ type: 'ok', text: '✅ Gemt! Sitet opdateres om 1-2 minutter.' });
        setFileSha(data.newSha || fileSha);
        setContent(JSON.parse(JSON.stringify(editedContent)));
      } else {
        setSaveMsg({ type: 'err', text: '❌ Fejl: ' + data.message });
      }
    } catch (e: any) {
      setSaveMsg({ type: 'err', text: '❌ Netværksfejl: ' + e.message });
    } finally {
      setSaving(false);
    }
  };

  const set = (path: string[], value: any) => {
    setEditedContent((prev: any) => {
      const next = JSON.parse(JSON.stringify(prev));
      let obj = next;
      for (let i = 0; i < path.length - 1; i++) obj = obj[path[i]];
      obj[path[path.length - 1]] = value;
      return next;
    });
  };

  const sections = [
    { id: 'contact' as Section, icon: Phone, label: 'Kontakt & Firmainfo' },
    { id: 'hero' as Section, icon: Globe, label: 'Forside (Hero)' },
    { id: 'footer' as Section, icon: Globe, label: 'Footer' },
    { id: 'faq' as Section, icon: HelpCircle, label: 'FAQ' },
    { id: 'certifications' as Section, icon: Award, label: 'Autorisationer' },
    { id: 'images' as Section, icon: ImageIcon, label: 'Billeder' },
  ];

  const inputClass = "w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-900 focus:outline-none font-medium text-slate-800";
  const labelClass = "block text-xs font-black uppercase tracking-widest text-slate-500 mb-2";

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-white rounded-2xl border-2 border-slate-200">
        <div className="text-center">
          <Loader2 size={40} className="animate-spin text-blue-900 mx-auto mb-4" />
          <p className="font-bold text-slate-600">Indlæser seneste indhold fra sitet...</p>
          <p className="text-xs text-slate-400 mt-1">Synkroniserer med GitHub</p>
        </div>
      </div>
    );
  }

  if (!editedContent) {
    return (
      <div className="flex items-center justify-center h-full bg-white rounded-2xl border-2 border-slate-200">
        <div className="text-center">
          <AlertCircle size={40} className="text-red-500 mx-auto mb-4" />
          <p className="font-bold text-slate-600 mb-2">Kunne ikke hente indhold</p>
          <p className="text-xs text-red-500 mb-4">{saveMsg?.text}</p>
          <button onClick={loadContent} className="bg-blue-900 text-white px-6 py-3 rounded-xl font-bold">
            Prøv igen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full bg-white rounded-2xl border-2 border-slate-200 overflow-hidden">
      {/* Sidebar */}
      <div className="w-56 bg-slate-50 border-r border-slate-200 p-4 shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-black uppercase text-slate-500 tracking-widest">Sektioner</h3>
          <button onClick={loadContent} title="Genindlæs fra site" className="text-slate-400 hover:text-blue-900 transition-colors">
            <RefreshCw size={14} />
          </button>
        </div>
        <div className="space-y-1">
          {sections.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl font-bold text-sm transition-all text-left ${
                activeSection === id ? 'bg-blue-900 text-white' : 'text-slate-600 hover:bg-white hover:text-blue-900'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-slate-200">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Synkroniseret</p>
          <p className="text-[10px] text-green-600 font-bold mt-1">✓ Seneste version fra GitHub</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-8">
        {saveMsg && (
          <div className={`mb-6 p-4 rounded-xl font-bold flex items-center gap-3 ${
            saveMsg.type === 'ok' ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            {saveMsg.type === 'ok' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            {saveMsg.text}
          </div>
        )}

        {/* CONTACT */}
        {activeSection === 'contact' && (
          <div className="max-w-2xl space-y-8">
            <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tight">Kontakt & Firmainfo</h2>

            <div className="space-y-4">
              <h3 className="font-black text-slate-700 uppercase text-xs tracking-widest">Firma</h3>
              <div><label className={labelClass}>Firmanavn</label>
                <input className={inputClass} value={editedContent.company.name} onChange={e => set(['company', 'name'], e.target.value)} />
              </div>
              <div><label className={labelClass}>Adresse</label>
                <input className={inputClass} value={editedContent.company.address} onChange={e => set(['company', 'address'], e.target.value)} />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="font-black text-slate-700 uppercase text-xs tracking-widest">Preben (Direktør)</h3>
              <div className="grid grid-cols-2 gap-4">
                <div><label className={labelClass}>Titel</label>
                  <input className={inputClass} value={editedContent.contacts.preben.title} onChange={e => set(['contacts', 'preben', 'title'], e.target.value)} />
                </div>
                <div><label className={labelClass}>Telefon</label>
                  <input className={inputClass} value={editedContent.contacts.preben.phone} onChange={e => set(['contacts', 'preben', 'phone'], e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className={labelClass}>Email</label>
                  <input className={inputClass} type="email" value={editedContent.contacts.preben.email} onChange={e => set(['contacts', 'preben', 'email'], e.target.value)} />
                </div>
                <div><label className={labelClass}>Kort bio</label>
                  <input className={inputClass} value={editedContent.contacts.preben.bio} onChange={e => set(['contacts', 'preben', 'bio'], e.target.value)} />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="font-black text-slate-700 uppercase text-xs tracking-widest">Jacob (Daglig Leder)</h3>
              <div className="grid grid-cols-2 gap-4">
                <div><label className={labelClass}>Titel</label>
                  <input className={inputClass} value={editedContent.contacts.jacob.title} onChange={e => set(['contacts', 'jacob', 'title'], e.target.value)} />
                </div>
                <div><label className={labelClass}>Telefon</label>
                  <input className={inputClass} value={editedContent.contacts.jacob.phone} onChange={e => set(['contacts', 'jacob', 'phone'], e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className={labelClass}>Email</label>
                  <input className={inputClass} type="email" value={editedContent.contacts.jacob.email} onChange={e => set(['contacts', 'jacob', 'email'], e.target.value)} />
                </div>
                <div><label className={labelClass}>Kort bio</label>
                  <input className={inputClass} value={editedContent.contacts.jacob.bio} onChange={e => set(['contacts', 'jacob', 'bio'], e.target.value)} />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="font-black text-slate-700 uppercase text-xs tracking-widest">Faktura</h3>
              <div><label className={labelClass}>Faktura Email</label>
                <input className={inputClass} type="email" value={editedContent.contacts.faktura.email} onChange={e => set(['contacts', 'faktura', 'email'], e.target.value)} />
              </div>
            </div>

            <SaveButton saving={saving} onClick={() => handleSave('Admin: Opdater kontaktinfo og firmaoplysninger')} />
          </div>
        )}

        {/* HERO */}
        {activeSection === 'hero' && (
          <div className="max-w-2xl space-y-6">
            <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tight">Forside (Hero)</h2>

            <div><label className={labelClass}>Undertekst (under overskriften)</label>
              <textarea className={inputClass} rows={3} value={editedContent.hero.subtitle} onChange={e => set(['hero', 'subtitle'], e.target.value)} />
            </div>
            <div><label className={labelClass}>Primær knap tekst</label>
              <input className={inputClass} value={editedContent.hero.ctaPrimary} onChange={e => set(['hero', 'ctaPrimary'], e.target.value)} />
            </div>
            <div><label className={labelClass}>Badge tekst (autorisationslink)</label>
              <input className={inputClass} value={editedContent.hero.badgeText} onChange={e => set(['hero', 'badgeText'], e.target.value)} />
            </div>
            <div><label className={labelClass}>Statistik tekst (kunder)</label>
              <input className={inputClass} value={editedContent.hero.statCustomers} onChange={e => set(['hero', 'statCustomers'], e.target.value)} />
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-4">
              <h3 className="font-black text-slate-700 uppercase text-xs tracking-widest">Stats bar</h3>
              <div className="grid grid-cols-2 gap-4">
                <div><label className={labelClass}>Responstid (tal)</label>
                  <input className={inputClass} value={editedContent.stats.responseTime} onChange={e => set(['stats', 'responseTime'], e.target.value)} />
                </div>
                <div><label className={labelClass}>Responstid (label)</label>
                  <input className={inputClass} value={editedContent.stats.responseLabel} onChange={e => set(['stats', 'responseLabel'], e.target.value)} />
                </div>
                <div><label className={labelClass}>Projekter (tal)</label>
                  <input className={inputClass} value={editedContent.stats.projectsCount} onChange={e => set(['stats', 'projectsCount'], e.target.value)} />
                </div>
                <div><label className={labelClass}>Projekter (label)</label>
                  <input className={inputClass} value={editedContent.stats.projectsLabel} onChange={e => set(['stats', 'projectsLabel'], e.target.value)} />
                </div>
                <div><label className={labelClass}>Erfaring (tal)</label>
                  <input className={inputClass} value={editedContent.stats.yearsCount} onChange={e => set(['stats', 'yearsCount'], e.target.value)} />
                </div>
                <div><label className={labelClass}>Erfaring (label)</label>
                  <input className={inputClass} value={editedContent.stats.yearsLabel} onChange={e => set(['stats', 'yearsLabel'], e.target.value)} />
                </div>
                <div><label className={labelClass}>Garanti (tal)</label>
                  <input className={inputClass} value={editedContent.stats.warrantyYears} onChange={e => set(['stats', 'warrantyYears'], e.target.value)} />
                </div>
                <div><label className={labelClass}>Garanti (label)</label>
                  <input className={inputClass} value={editedContent.stats.warrantyLabel} onChange={e => set(['stats', 'warrantyLabel'], e.target.value)} />
                </div>
              </div>
            </div>

            <SaveButton saving={saving} onClick={() => handleSave('Admin: Opdater forside hero tekst')} />
          </div>
        )}

        {/* FOOTER */}
        {activeSection === 'footer' && (
          <div className="max-w-2xl space-y-6">
            <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tight">Footer</h2>

            <div><label className={labelClass}>Footer tekst (under logo)</label>
              <textarea className={inputClass} rows={3} value={editedContent.footer.tagline} onChange={e => set(['footer', 'tagline'], e.target.value)} />
            </div>
            <div><label className={labelClass}>Serviceområde tekst</label>
              <input className={inputClass} value={editedContent.footer.serviceArea} onChange={e => set(['footer', 'serviceArea'], e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className={labelClass}>Prebens titel i footer</label>
                <input className={inputClass} value={editedContent.footer.prebenTitle} onChange={e => set(['footer', 'prebenTitle'], e.target.value)} />
              </div>
              <div><label className={labelClass}>Jacobs titel i footer</label>
                <input className={inputClass} value={editedContent.footer.jacobTitle} onChange={e => set(['footer', 'jacobTitle'], e.target.value)} />
              </div>
            </div>

            <SaveButton saving={saving} onClick={() => handleSave('Admin: Opdater footer tekst')} />
          </div>
        )}

        {/* FAQ */}
        {activeSection === 'faq' && (
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tight">FAQ</h2>
              <button
                onClick={() => {
                  const updated = [...editedContent.faq, { question: '', answer: '' }];
                  set(['faq'], updated);
                }}
                className="bg-slate-200 text-slate-700 px-4 py-2 rounded-xl font-bold text-sm hover:bg-slate-300 transition-all"
              >
                + Tilføj spørgsmål
              </button>
            </div>

            <div className="space-y-4">
              {editedContent.faq.map((faq: any, i: number) => (
                <div key={i} className="bg-slate-50 p-5 rounded-xl border-2 border-slate-200 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Spørgsmål {i + 1}</span>
                    <button
                      onClick={() => {
                        const updated = editedContent.faq.filter((_: any, idx: number) => idx !== i);
                        set(['faq'], updated);
                      }}
                      className="text-red-500 text-xs font-bold hover:underline"
                    >
                      Fjern
                    </button>
                  </div>
                  <input
                    className={inputClass}
                    placeholder="Spørgsmål"
                    value={faq.question}
                    onChange={e => {
                      const updated = [...editedContent.faq];
                      updated[i] = { ...updated[i], question: e.target.value };
                      set(['faq'], updated);
                    }}
                  />
                  <textarea
                    className={inputClass}
                    rows={2}
                    placeholder="Svar"
                    value={faq.answer}
                    onChange={e => {
                      const updated = [...editedContent.faq];
                      updated[i] = { ...updated[i], answer: e.target.value };
                      set(['faq'], updated);
                    }}
                  />
                </div>
              ))}
            </div>

            <SaveButton saving={saving} onClick={() => handleSave('Admin: Opdater FAQ')} />
          </div>
        )}

        {/* CERTIFICATIONS */}
        {activeSection === 'certifications' && (
          <div className="max-w-3xl space-y-6">
            <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tight">Autorisationer & Certificeringer</h2>

            <div className="space-y-4">
              {editedContent.certifications.map((cert: any, i: number) => (
                <div key={i} className="bg-slate-50 p-5 rounded-xl border-2 border-slate-200 space-y-3">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Certificering {i + 1}</span>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className={labelClass}>Navn</label>
                      <input className={inputClass} value={cert.name} onChange={e => {
                        const updated = [...editedContent.certifications];
                        updated[i] = { ...updated[i], name: e.target.value };
                        set(['certifications'], updated);
                      }} />
                    </div>
                    <div><label className={labelClass}>Udsteder</label>
                      <input className={inputClass} value={cert.issuer} onChange={e => {
                        const updated = [...editedContent.certifications];
                        updated[i] = { ...updated[i], issuer: e.target.value };
                        set(['certifications'], updated);
                      }} />
                    </div>
                  </div>
                  <div><label className={labelClass}>Kundefordel (tekst vist på sitet)</label>
                    <textarea className={inputClass} rows={2} value={cert.customerBenefit} onChange={e => {
                      const updated = [...editedContent.certifications];
                      updated[i] = { ...updated[i], customerBenefit: e.target.value };
                      set(['certifications'], updated);
                    }} />
                  </div>
                </div>
              ))}
            </div>

            <SaveButton saving={saving} onClick={() => handleSave('Admin: Opdater autorisationer og certificeringer')} />
          </div>
        )}

        {/* IMAGES */}
        {activeSection === 'images' && (
          <div className="max-w-2xl space-y-6">
            <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tight">Billeder</h2>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
              <strong>Tip:</strong> Angiv stien til billedet (fx <code>/logo.png</code> eller <code>/Hero/hero.jpg</code>). Brug <strong>Site Redigering</strong> fanen til at uploade nye billeder via AI-assistenten.
            </div>

            <div className="space-y-4">
              <div><label className={labelClass}>Logo sti (header)</label>
                <input className={inputClass} value={editedContent.header.logoPath} onChange={e => set(['header', 'logoPath'], e.target.value)} placeholder="/logo.png" />
                {editedContent.header.logoPath && (
                  <img src={editedContent.header.logoPath} alt="Logo preview" className="mt-2 h-12 object-contain border rounded-lg p-1 bg-slate-50" onError={e => { e.currentTarget.style.display = 'none'; }} />
                )}
              </div>
              <div><label className={labelClass}>Logo alt-tekst</label>
                <input className={inputClass} value={editedContent.header.logoAlt} onChange={e => set(['header', 'logoAlt'], e.target.value)} />
              </div>
              <div><label className={labelClass}>Hero baggrundsbillede</label>
                <input className={inputClass} value={editedContent.hero.imagePath} onChange={e => set(['hero', 'imagePath'], e.target.value)} placeholder="/Hero/hero.jpg" />
                {editedContent.hero.imagePath && (
                  <img src={editedContent.hero.imagePath} alt="Hero preview" className="mt-2 h-32 w-full object-cover rounded-lg border" onError={e => { e.currentTarget.style.display = 'none'; }} />
                )}
              </div>
            </div>

            <SaveButton saving={saving} onClick={() => handleSave('Admin: Opdater billeder og logo')} />
          </div>
        )}
      </div>
    </div>
  );
};

const SaveButton: React.FC<{ saving: boolean; onClick: () => void }> = ({ saving, onClick }) => (
  <button
    onClick={onClick}
    disabled={saving}
    className="bg-blue-900 text-white px-8 py-4 rounded-xl font-black flex items-center gap-3 hover:bg-orange-600 transition-all disabled:bg-slate-300 disabled:cursor-not-allowed shadow-lg"
  >
    {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
    {saving ? 'Gemmer på sitet...' : 'Gem & Opdater Sitet'}
  </button>
);

export default ContentEditor;
