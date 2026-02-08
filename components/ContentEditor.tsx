import React, { useState } from 'react';
import { Save, Phone, Users, Briefcase, Palette, MessageCircle, Star, Award, HelpCircle, Image as ImageIcon, Upload } from 'lucide-react';
import {
  COMPANY_NAME,
  TAGLINE,
  PHONE_JACOB,
  PHONE_PREBEN,
  EMAIL,
  ADDRESS,
  SERVICES,
  TEAM,
  CASES,
  REVIEWS,
  CERTIFICATIONS,
  FAQ_GENERAL,
  USPs
} from '../constants';

type Section = 'contact' | 'services' | 'team' | 'cases' | 'reviews' | 'certifications' | 'faq' | 'usps' | 'colors' | 'images';

const ContentEditor: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>('contact');
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // Contact Info State
  const [contactData, setContactData] = useState({
    companyName: COMPANY_NAME,
    tagline: TAGLINE,
    phoneJacob: PHONE_JACOB,
    phonePreben: PHONE_PREBEN,
    email: EMAIL,
    address: ADDRESS
  });

  // Services State
  const [servicesData, setServicesData] = useState(SERVICES);
  const [editingServiceIndex, setEditingServiceIndex] = useState<number | null>(null);

  // Team State
  const [teamData, setTeamData] = useState(TEAM);

  // Cases State
  const [casesData, setCasesData] = useState(CASES);

  // Reviews State
  const [reviewsData, setReviewsData] = useState(REVIEWS);

  // Certifications State
  const [certificationsData, setCertificationsData] = useState(CERTIFICATIONS);

  // FAQ State
  const [faqData, setFaqData] = useState(FAQ_GENERAL);

  // Colors State
  const [colorsData, setColorsData] = useState({
    primaryColor: '#1e3a8a', // blue-900
    secondaryColor: '#ea580c', // orange-600
    primaryColorName: 'Blå',
    secondaryColorName: 'Orange'
  });

  // Images State
  const [imagesData, setImagesData] = useState({
    heroBackground: '/pre/hero-bg.jpg',
    serviceImages: {
      kloakering: '/pre/services/kloakering.jpg',
      omfangsdraen: '/pre/services/omfangsdraen.jpg',
      rottespaerre: '/pre/services/rottespaerre.jpg'
    }
  });
  const [uploadingImage, setUploadingImage] = useState<string | null>(null);

  const handleSaveContact = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/pre/content/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'contact',
          data: contactData
        })
      });

      const result = await response.json();
      if (result.success) {
        setSaveMessage('✅ Kontaktinfo gemt!');
        setTimeout(() => setSaveMessage(null), 3000);
      } else {
        setSaveMessage('❌ Fejl: ' + result.message);
      }
    } catch (error) {
      setSaveMessage('❌ Kunne ikke gemme');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveServices = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/pre/content/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'services',
          data: servicesData
        })
      });

      const result = await response.json();
      if (result.success) {
        setSaveMessage('✅ Services gemt!');
        setTimeout(() => setSaveMessage(null), 3000);
        setEditingServiceIndex(null);
      } else {
        setSaveMessage('❌ Fejl: ' + result.message);
      }
    } catch (error) {
      setSaveMessage('❌ Kunne ikke gemme');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveTeam = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/pre/content/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'team',
          data: teamData
        })
      });

      const result = await response.json();
      if (result.success) {
        setSaveMessage('✅ Team gemt!');
        setTimeout(() => setSaveMessage(null), 3000);
      } else {
        setSaveMessage('❌ Fejl: ' + result.message);
      }
    } catch (error) {
      setSaveMessage('❌ Kunne ikke gemme');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveCases = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/pre/content/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'cases',
          data: casesData
        })
      });

      const result = await response.json();
      if (result.success) {
        setSaveMessage('✅ Cases gemt!');
        setTimeout(() => setSaveMessage(null), 3000);
      } else {
        setSaveMessage('❌ Fejl: ' + result.message);
      }
    } catch (error) {
      setSaveMessage('❌ Kunne ikke gemme');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveReviews = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/pre/content/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'reviews',
          data: reviewsData
        })
      });

      const result = await response.json();
      if (result.success) {
        setSaveMessage('✅ Anmeldelser gemt!');
        setTimeout(() => setSaveMessage(null), 3000);
      } else {
        setSaveMessage('❌ Fejl: ' + result.message);
      }
    } catch (error) {
      setSaveMessage('❌ Kunne ikke gemme');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveCertifications = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/pre/content/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'certifications',
          data: certificationsData
        })
      });

      const result = await response.json();
      if (result.success) {
        setSaveMessage('✅ Certificeringer gemt!');
        setTimeout(() => setSaveMessage(null), 3000);
      } else {
        setSaveMessage('❌ Fejl: ' + result.message);
      }
    } catch (error) {
      setSaveMessage('❌ Kunne ikke gemme');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveFAQ = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/pre/content/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'faq',
          data: faqData
        })
      });

      const result = await response.json();
      if (result.success) {
        setSaveMessage('✅ FAQ gemt!');
        setTimeout(() => setSaveMessage(null), 3000);
      } else {
        setSaveMessage('❌ Fejl: ' + result.message);
      }
    } catch (error) {
      setSaveMessage('❌ Kunne ikke gemme');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveColors = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/pre/content/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'colors',
          data: colorsData
        })
      });

      const result = await response.json();
      if (result.success) {
        setSaveMessage('✅ Farver gemt! Genindlæs siden for at se ændringerne.');
        setTimeout(() => setSaveMessage(null), 5000);
      } else {
        setSaveMessage('❌ Fejl: ' + result.message);
      }
    } catch (error) {
      setSaveMessage('❌ Kunne ikke gemme');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (imageKey: string, file: File) => {
    setUploadingImage(imageKey);
    try {
      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = reader.result as string;

        const response = await fetch('/api/pre/content/upload-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageKey,
            imageData: base64Data,
            fileName: file.name
          })
        });

        const result = await response.json();
        if (result.success && result.imageUrl) {
          // Update local state
          if (imageKey === 'heroBackground') {
            setImagesData(prev => ({ ...prev, heroBackground: result.imageUrl }));
          } else {
            setImagesData(prev => ({
              ...prev,
              serviceImages: { ...prev.serviceImages, [imageKey]: result.imageUrl }
            }));
          }
          setSaveMessage('✅ Billede uploadet!');
          setTimeout(() => setSaveMessage(null), 3000);
        } else {
          setSaveMessage('❌ Upload fejlede: ' + result.message);
        }
        setUploadingImage(null);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      setSaveMessage('❌ Kunne ikke uploade billede');
      setUploadingImage(null);
    }
  };

  const sections = [
    { id: 'contact' as Section, icon: Phone, label: 'Kontaktinfo' },
    { id: 'services' as Section, icon: Briefcase, label: 'Services' },
    { id: 'team' as Section, icon: Users, label: 'Team' },
    { id: 'cases' as Section, icon: Star, label: 'Cases' },
    { id: 'reviews' as Section, icon: MessageCircle, label: 'Anmeldelser' },
    { id: 'certifications' as Section, icon: Award, label: 'Certificeringer' },
    { id: 'faq' as Section, icon: HelpCircle, label: 'FAQ' },
    { id: 'colors' as Section, icon: Palette, label: 'Farver & Typografi' },
    { id: 'images' as Section, icon: ImageIcon, label: 'Billeder' }
  ];

  return (
    <div className="flex h-full bg-white rounded-2xl border-2 border-slate-200 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-slate-50 border-r border-slate-200 p-4">
        <h3 className="text-sm font-black uppercase text-slate-600 mb-4 tracking-widest">
          Sektioner
        </h3>
        <div className="space-y-1">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                  activeSection === section.id
                    ? 'bg-blue-900 text-white'
                    : 'text-slate-600 hover:bg-white hover:text-blue-900'
                }`}
              >
                <Icon size={18} />
                {section.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-8">
        {saveMessage && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 font-bold">
            {saveMessage}
          </div>
        )}

        {/* Contact Info Section */}
        {activeSection === 'contact' && (
          <div>
            <h2 className="text-3xl font-black text-blue-900 mb-6 uppercase tracking-tight">
              Kontaktinformation
            </h2>
            <div className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-sm font-black uppercase tracking-widest text-slate-600 mb-2">
                  Firmanavn
                </label>
                <input
                  type="text"
                  value={contactData.companyName}
                  onChange={(e) => setContactData({ ...contactData, companyName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-900 focus:outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-black uppercase tracking-widest text-slate-600 mb-2">
                  Tagline
                </label>
                <input
                  type="text"
                  value={contactData.tagline}
                  onChange={(e) => setContactData({ ...contactData, tagline: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-900 focus:outline-none font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-black uppercase tracking-widest text-slate-600 mb-2">
                    Jacob's Telefon
                  </label>
                  <input
                    type="text"
                    value={contactData.phoneJacob}
                    onChange={(e) => setContactData({ ...contactData, phoneJacob: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-900 focus:outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-black uppercase tracking-widest text-slate-600 mb-2">
                    Preben's Telefon
                  </label>
                  <input
                    type="text"
                    value={contactData.phonePreben}
                    onChange={(e) => setContactData({ ...contactData, phonePreben: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-900 focus:outline-none font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-black uppercase tracking-widest text-slate-600 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={contactData.email}
                  onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-900 focus:outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-black uppercase tracking-widest text-slate-600 mb-2">
                  Adresse
                </label>
                <input
                  type="text"
                  value={contactData.address}
                  onChange={(e) => setContactData({ ...contactData, address: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-900 focus:outline-none font-medium"
                />
              </div>

              <button
                onClick={handleSaveContact}
                disabled={saving}
                className="bg-blue-900 text-white px-8 py-4 rounded-xl font-black flex items-center gap-3 hover:bg-orange-600 transition-all disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                <Save size={20} />
                {saving ? 'Gemmer...' : 'Gem Kontaktinfo'}
              </button>
            </div>
          </div>
        )}

        {/* Services Section */}
        {activeSection === 'services' && (
          <div>
            <h2 className="text-3xl font-black text-blue-900 mb-6 uppercase tracking-tight">
              Services
            </h2>

            {editingServiceIndex === null ? (
              <div className="space-y-4">
                {servicesData.map((service, index) => (
                  <div key={service.id} className="bg-slate-50 p-6 rounded-xl border-2 border-slate-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-black text-blue-900">{service.title}</h3>
                        <p className="text-slate-600 mt-2">{service.description}</p>
                        <p className="text-sm text-slate-500 mt-2">Pris: {service.priceRange || 'Ikke angivet'}</p>
                        <p className="text-sm text-slate-500">FAQs: {service.faqs?.length || 0}</p>
                      </div>
                      <button
                        onClick={() => setEditingServiceIndex(index)}
                        className="bg-blue-900 text-white px-4 py-2 rounded-lg font-bold hover:bg-orange-600 transition-all"
                      >
                        Rediger
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6 max-w-4xl">
                <button
                  onClick={() => setEditingServiceIndex(null)}
                  className="text-blue-900 font-bold hover:underline mb-4"
                >
                  ← Tilbage til oversigt
                </button>

                <div>
                  <label className="block text-sm font-black uppercase tracking-widest text-slate-600 mb-2">
                    Service Titel
                  </label>
                  <input
                    type="text"
                    value={servicesData[editingServiceIndex].title}
                    onChange={(e) => {
                      const updated = [...servicesData];
                      updated[editingServiceIndex].title = e.target.value;
                      setServicesData(updated);
                    }}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-900 focus:outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-black uppercase tracking-widest text-slate-600 mb-2">
                    Kort Beskrivelse
                  </label>
                  <input
                    type="text"
                    value={servicesData[editingServiceIndex].description}
                    onChange={(e) => {
                      const updated = [...servicesData];
                      updated[editingServiceIndex].description = e.target.value;
                      setServicesData(updated);
                    }}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-900 focus:outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-black uppercase tracking-widest text-slate-600 mb-2">
                    Lang Beskrivelse
                  </label>
                  <textarea
                    value={servicesData[editingServiceIndex].longDescription}
                    onChange={(e) => {
                      const updated = [...servicesData];
                      updated[editingServiceIndex].longDescription = e.target.value;
                      setServicesData(updated);
                    }}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-900 focus:outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-black uppercase tracking-widest text-slate-600 mb-2">
                    Prisramme
                  </label>
                  <input
                    type="text"
                    value={servicesData[editingServiceIndex].priceRange || ''}
                    onChange={(e) => {
                      const updated = [...servicesData];
                      updated[editingServiceIndex].priceRange = e.target.value;
                      setServicesData(updated);
                    }}
                    placeholder="Fra 25.000 kr."
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-900 focus:outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-black uppercase tracking-widest text-slate-600 mb-4">
                    FAQs
                  </label>
                  <div className="space-y-4">
                    {servicesData[editingServiceIndex].faqs?.map((faq, faqIndex) => (
                      <div key={faqIndex} className="bg-white p-4 rounded-lg border-2 border-slate-200">
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={faq.question}
                            onChange={(e) => {
                              const updated = [...servicesData];
                              updated[editingServiceIndex].faqs[faqIndex].question = e.target.value;
                              setServicesData(updated);
                            }}
                            placeholder="Spørgsmål"
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-blue-900 focus:outline-none"
                          />
                          <textarea
                            value={faq.answer}
                            onChange={(e) => {
                              const updated = [...servicesData];
                              updated[editingServiceIndex].faqs[faqIndex].answer = e.target.value;
                              setServicesData(updated);
                            }}
                            placeholder="Svar"
                            rows={2}
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-blue-900 focus:outline-none"
                          />
                          <button
                            onClick={() => {
                              const updated = [...servicesData];
                              updated[editingServiceIndex].faqs.splice(faqIndex, 1);
                              setServicesData(updated);
                            }}
                            className="text-red-600 text-sm font-bold hover:underline"
                          >
                            Fjern FAQ
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const updated = [...servicesData];
                        if (!updated[editingServiceIndex].faqs) {
                          updated[editingServiceIndex].faqs = [];
                        }
                        updated[editingServiceIndex].faqs.push({ question: '', answer: '' });
                        setServicesData(updated);
                      }}
                      className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-bold hover:bg-slate-300 transition-all"
                    >
                      + Tilføj FAQ
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleSaveServices}
                  disabled={saving}
                  className="bg-blue-900 text-white px-8 py-4 rounded-xl font-black flex items-center gap-3 hover:bg-orange-600 transition-all disabled:bg-slate-300 disabled:cursor-not-allowed"
                >
                  <Save size={20} />
                  {saving ? 'Gemmer...' : 'Gem Service'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Team Section */}
        {activeSection === 'team' && (
          <div>
            <h2 className="text-3xl font-black text-blue-900 mb-6 uppercase tracking-tight">
              Team
            </h2>
            <div className="space-y-6 max-w-4xl">
              {teamData.map((member, index) => (
                <div key={index} className="bg-slate-50 p-6 rounded-xl border-2 border-slate-200">
                  <h3 className="text-xl font-black text-blue-900 mb-4">{member.name}</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-black uppercase tracking-widest text-slate-600 mb-2">
                        Rolle
                      </label>
                      <input
                        type="text"
                        value={member.role}
                        onChange={(e) => {
                          const updated = [...teamData];
                          updated[index].role = e.target.value;
                          setTeamData(updated);
                        }}
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-900 focus:outline-none font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-black uppercase tracking-widest text-slate-600 mb-2">
                        Telefon
                      </label>
                      <input
                        type="text"
                        value={member.phone}
                        onChange={(e) => {
                          const updated = [...teamData];
                          updated[index].phone = e.target.value;
                          setTeamData(updated);
                        }}
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-900 focus:outline-none font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-black uppercase tracking-widest text-slate-600 mb-2">
                        Beskrivelse
                      </label>
                      <textarea
                        value={member.description}
                        onChange={(e) => {
                          const updated = [...teamData];
                          updated[index].description = e.target.value;
                          setTeamData(updated);
                        }}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-900 focus:outline-none font-medium"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={handleSaveTeam}
                disabled={saving}
                className="bg-blue-900 text-white px-8 py-4 rounded-xl font-black flex items-center gap-3 hover:bg-orange-600 transition-all disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                <Save size={20} />
                {saving ? 'Gemmer...' : 'Gem Team'}
              </button>
            </div>
          </div>
        )}

        {/* Cases Section */}
        {activeSection === 'cases' && (
          <div>
            <h2 className="text-3xl font-black text-blue-900 mb-6 uppercase tracking-tight">
              Cases
            </h2>
            <div className="space-y-6 max-w-4xl">
              {casesData.map((caseItem, index) => (
                <div key={caseItem.id} className="bg-slate-50 p-6 rounded-xl border-2 border-slate-200">
                  <h3 className="text-xl font-black text-blue-900 mb-4">{caseItem.title}</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-black uppercase tracking-widest text-slate-600 mb-2">
                        Titel
                      </label>
                      <input
                        type="text"
                        value={caseItem.title}
                        onChange={(e) => {
                          const updated = [...casesData];
                          updated[index].title = e.target.value;
                          setCasesData(updated);
                        }}
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-900 focus:outline-none font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-black uppercase tracking-widest text-slate-600 mb-2">
                        Problem
                      </label>
                      <input
                        type="text"
                        value={caseItem.problem}
                        onChange={(e) => {
                          const updated = [...casesData];
                          updated[index].problem = e.target.value;
                          setCasesData(updated);
                        }}
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-900 focus:outline-none font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-black uppercase tracking-widest text-slate-600 mb-2">
                        Løsning
                      </label>
                      <textarea
                        value={caseItem.solution}
                        onChange={(e) => {
                          const updated = [...casesData];
                          updated[index].solution = e.target.value;
                          setCasesData(updated);
                        }}
                        rows={2}
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-900 focus:outline-none font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-black uppercase tracking-widest text-slate-600 mb-2">
                        Resultat
                      </label>
                      <input
                        type="text"
                        value={caseItem.result}
                        onChange={(e) => {
                          const updated = [...casesData];
                          updated[index].result = e.target.value;
                          setCasesData(updated);
                        }}
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-900 focus:outline-none font-medium"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-black uppercase tracking-widest text-slate-600 mb-2">
                          Pris
                        </label>
                        <input
                          type="text"
                          value={caseItem.price}
                          onChange={(e) => {
                            const updated = [...casesData];
                            updated[index].price = e.target.value;
                            setCasesData(updated);
                          }}
                          className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-900 focus:outline-none font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-black uppercase tracking-widest text-slate-600 mb-2">
                          Varighed
                        </label>
                        <input
                          type="text"
                          value={caseItem.duration}
                          onChange={(e) => {
                            const updated = [...casesData];
                            updated[index].duration = e.target.value;
                            setCasesData(updated);
                          }}
                          className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-900 focus:outline-none font-medium"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={handleSaveCases}
                disabled={saving}
                className="bg-blue-900 text-white px-8 py-4 rounded-xl font-black flex items-center gap-3 hover:bg-orange-600 transition-all disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                <Save size={20} />
                {saving ? 'Gemmer...' : 'Gem Cases'}
              </button>
            </div>
          </div>
        )}

        {/* Reviews Section */}
        {activeSection === 'reviews' && (
          <div>
            <h2 className="text-3xl font-black text-blue-900 mb-6 uppercase tracking-tight">
              Anmeldelser
            </h2>
            <div className="space-y-6 max-w-4xl">
              {reviewsData.map((review, index) => (
                <div key={index} className="bg-slate-50 p-6 rounded-xl border-2 border-slate-200">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-black uppercase tracking-widest text-slate-600 mb-2">
                          Navn
                        </label>
                        <input
                          type="text"
                          value={review.name}
                          onChange={(e) => {
                            const updated = [...reviewsData];
                            updated[index].name = e.target.value;
                            setReviewsData(updated);
                          }}
                          className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-900 focus:outline-none font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-black uppercase tracking-widest text-slate-600 mb-2">
                          Lokation
                        </label>
                        <input
                          type="text"
                          value={review.location}
                          onChange={(e) => {
                            const updated = [...reviewsData];
                            updated[index].location = e.target.value;
                            setReviewsData(updated);
                          }}
                          className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-900 focus:outline-none font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-black uppercase tracking-widest text-slate-600 mb-2">
                          Rating (1-5)
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="5"
                          value={review.rating}
                          onChange={(e) => {
                            const updated = [...reviewsData];
                            updated[index].rating = parseInt(e.target.value);
                            setReviewsData(updated);
                          }}
                          className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-900 focus:outline-none font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-black uppercase tracking-widest text-slate-600 mb-2">
                          Dato
                        </label>
                        <input
                          type="text"
                          value={review.date}
                          onChange={(e) => {
                            const updated = [...reviewsData];
                            updated[index].date = e.target.value;
                            setReviewsData(updated);
                          }}
                          className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-900 focus:outline-none font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-black uppercase tracking-widest text-slate-600 mb-2">
                        Anmeldelse
                      </label>
                      <textarea
                        value={review.text}
                        onChange={(e) => {
                          const updated = [...reviewsData];
                          updated[index].text = e.target.value;
                          setReviewsData(updated);
                        }}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-900 focus:outline-none font-medium"
                      />
                    </div>

                    <button
                      onClick={() => {
                        const updated = [...reviewsData];
                        updated.splice(index, 1);
                        setReviewsData(updated);
                      }}
                      className="text-red-600 text-sm font-bold hover:underline"
                    >
                      Fjern Anmeldelse
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={() => {
                  const updated = [...reviewsData];
                  updated.push({
                    name: '',
                    location: '',
                    rating: 5,
                    date: new Date().toLocaleDateString('da-DK', { month: 'long', year: 'numeric' }),
                    text: ''
                  });
                  setReviewsData(updated);
                }}
                className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-bold hover:bg-slate-300 transition-all"
              >
                + Tilføj Anmeldelse
              </button>

              <button
                onClick={handleSaveReviews}
                disabled={saving}
                className="bg-blue-900 text-white px-8 py-4 rounded-xl font-black flex items-center gap-3 hover:bg-orange-600 transition-all disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                <Save size={20} />
                {saving ? 'Gemmer...' : 'Gem Anmeldelser'}
              </button>
            </div>
          </div>
        )}

        {/* Certifications Section */}
        {activeSection === 'certifications' && (
          <div>
            <h2 className="text-3xl font-black text-blue-900 mb-6 uppercase tracking-tight">
              Certificeringer
            </h2>
            <div className="space-y-6 max-w-4xl">
              {certificationsData.map((cert, index) => (
                <div key={index} className="bg-slate-50 p-6 rounded-xl border-2 border-slate-200">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-black uppercase tracking-widest text-slate-600 mb-2">
                        Certificering Navn
                      </label>
                      <input
                        type="text"
                        value={cert.name}
                        onChange={(e) => {
                          const updated = [...certificationsData];
                          updated[index].name = e.target.value;
                          setCertificationsData(updated);
                        }}
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-900 focus:outline-none font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-black uppercase tracking-widest text-slate-600 mb-2">
                        Udsteder
                      </label>
                      <input
                        type="text"
                        value={cert.issuer}
                        onChange={(e) => {
                          const updated = [...certificationsData];
                          updated[index].issuer = e.target.value;
                          setCertificationsData(updated);
                        }}
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-900 focus:outline-none font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-black uppercase tracking-widest text-slate-600 mb-2">
                        Kunde Fordel
                      </label>
                      <textarea
                        value={cert.customerBenefit}
                        onChange={(e) => {
                          const updated = [...certificationsData];
                          updated[index].customerBenefit = e.target.value;
                          setCertificationsData(updated);
                        }}
                        rows={2}
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-900 focus:outline-none font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-black uppercase tracking-widest text-slate-600 mb-2">
                        Badge Path (billede sti)
                      </label>
                      <input
                        type="text"
                        value={cert.badge}
                        onChange={(e) => {
                          const updated = [...certificationsData];
                          updated[index].badge = e.target.value;
                          setCertificationsData(updated);
                        }}
                        placeholder="/pre/badges/..."
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-900 focus:outline-none font-medium"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={handleSaveCertifications}
                disabled={saving}
                className="bg-blue-900 text-white px-8 py-4 rounded-xl font-black flex items-center gap-3 hover:bg-orange-600 transition-all disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                <Save size={20} />
                {saving ? 'Gemmer...' : 'Gem Certificeringer'}
              </button>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        {activeSection === 'faq' && (
          <div>
            <h2 className="text-3xl font-black text-blue-900 mb-6 uppercase tracking-tight">
              Generelle FAQ
            </h2>
            <div className="space-y-6 max-w-4xl">
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <div key={index} className="bg-slate-50 p-6 rounded-xl border-2 border-slate-200">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-black uppercase tracking-widest text-slate-600 mb-2">
                          Spørgsmål
                        </label>
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => {
                            const updated = [...faqData];
                            updated[index].question = e.target.value;
                            setFaqData(updated);
                          }}
                          className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-900 focus:outline-none font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-black uppercase tracking-widest text-slate-600 mb-2">
                          Svar
                        </label>
                        <textarea
                          value={faq.answer}
                          onChange={(e) => {
                            const updated = [...faqData];
                            updated[index].answer = e.target.value;
                            setFaqData(updated);
                          }}
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-900 focus:outline-none font-medium"
                        />
                      </div>

                      <button
                        onClick={() => {
                          const updated = [...faqData];
                          updated.splice(index, 1);
                          setFaqData(updated);
                        }}
                        className="text-red-600 text-sm font-bold hover:underline"
                      >
                        Fjern FAQ
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => {
                    const updated = [...faqData];
                    updated.push({ question: '', answer: '' });
                    setFaqData(updated);
                  }}
                  className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-bold hover:bg-slate-300 transition-all"
                >
                  + Tilføj FAQ
                </button>
              </div>

              <button
                onClick={handleSaveFAQ}
                disabled={saving}
                className="bg-blue-900 text-white px-8 py-4 rounded-xl font-black flex items-center gap-3 hover:bg-orange-600 transition-all disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                <Save size={20} />
                {saving ? 'Gemmer...' : 'Gem FAQ'}
              </button>
            </div>
          </div>
        )}

        {/* Colors Section */}
        {activeSection === 'colors' && (
          <div>
            <h2 className="text-3xl font-black text-blue-900 mb-6 uppercase tracking-tight">
              Farver & Typografi
            </h2>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-black text-blue-900 mb-2">ℹ️ Information</h3>
              <p className="text-slate-700">
                Her kan du ændre sidens hovedfarver. Bemærk at ændringer kræver en genindlæsning af siden for at se effekten.
                Standard farver er Blå (#1e3a8a) som primær og Orange (#ea580c) som sekundær farve.
              </p>
            </div>

            <div className="space-y-6 max-w-4xl">
              {/* Primary Color */}
              <div className="bg-slate-50 p-6 rounded-xl border-2 border-slate-200">
                <h3 className="text-xl font-black text-blue-900 mb-4">Primær Farve (Blå)</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Bruges til: hovedoverskrifter, knapper, links, og generelt dominerende elementer
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-black uppercase tracking-widest text-slate-600 mb-2">
                      Farve Navn
                    </label>
                    <input
                      type="text"
                      value={colorsData.primaryColorName}
                      onChange={(e) => setColorsData({ ...colorsData, primaryColorName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-900 focus:outline-none font-medium"
                      placeholder="fx. Mørk Blå"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-black uppercase tracking-widest text-slate-600 mb-2">
                      Hex Kode
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={colorsData.primaryColor}
                        onChange={(e) => setColorsData({ ...colorsData, primaryColor: e.target.value })}
                        className="w-20 h-12 rounded-xl border-2 border-slate-200 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={colorsData.primaryColor}
                        onChange={(e) => setColorsData({ ...colorsData, primaryColor: e.target.value })}
                        className="flex-1 px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-900 focus:outline-none font-mono font-bold"
                        placeholder="#1e3a8a"
                      />
                    </div>
                  </div>
                </div>

                {/* Preview */}
                <div className="mt-4 p-4 rounded-lg border-2 border-slate-200">
                  <p className="text-sm font-black uppercase tracking-widest text-slate-600 mb-2">Preview</p>
                  <div className="flex gap-3">
                    <button
                      style={{ backgroundColor: colorsData.primaryColor }}
                      className="px-6 py-3 rounded-xl text-white font-black"
                    >
                      Knap Eksempel
                    </button>
                    <h3 style={{ color: colorsData.primaryColor }} className="text-2xl font-black">
                      Overskrift Eksempel
                    </h3>
                  </div>
                </div>
              </div>

              {/* Secondary Color */}
              <div className="bg-slate-50 p-6 rounded-xl border-2 border-slate-200">
                <h3 className="text-xl font-black text-blue-900 mb-4">Sekundær Farve (Orange)</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Bruges til: accent farve, hover effekter, fremhævninger og call-to-action elementer
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-black uppercase tracking-widest text-slate-600 mb-2">
                      Farve Navn
                    </label>
                    <input
                      type="text"
                      value={colorsData.secondaryColorName}
                      onChange={(e) => setColorsData({ ...colorsData, secondaryColorName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-900 focus:outline-none font-medium"
                      placeholder="fx. Brændende Orange"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-black uppercase tracking-widest text-slate-600 mb-2">
                      Hex Kode
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={colorsData.secondaryColor}
                        onChange={(e) => setColorsData({ ...colorsData, secondaryColor: e.target.value })}
                        className="w-20 h-12 rounded-xl border-2 border-slate-200 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={colorsData.secondaryColor}
                        onChange={(e) => setColorsData({ ...colorsData, secondaryColor: e.target.value })}
                        className="flex-1 px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-900 focus:outline-none font-mono font-bold"
                        placeholder="#ea580c"
                      />
                    </div>
                  </div>
                </div>

                {/* Preview */}
                <div className="mt-4 p-4 rounded-lg border-2 border-slate-200">
                  <p className="text-sm font-black uppercase tracking-widest text-slate-600 mb-2">Preview</p>
                  <div className="flex gap-3">
                    <button
                      style={{ backgroundColor: colorsData.secondaryColor }}
                      className="px-6 py-3 rounded-xl text-white font-black"
                    >
                      Knap Eksempel
                    </button>
                    <h3 style={{ color: colorsData.secondaryColor }} className="text-2xl font-black">
                      Accent Eksempel
                    </h3>
                  </div>
                </div>
              </div>

              {/* Combined Preview */}
              <div className="bg-white p-6 rounded-xl border-2 border-slate-200">
                <h3 className="text-lg font-black text-slate-700 mb-4">Kombineret Preview</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <button
                      style={{ backgroundColor: colorsData.primaryColor }}
                      className="px-6 py-3 rounded-xl text-white font-black hover:opacity-90 transition-all"
                    >
                      Primær Knap
                    </button>
                    <button
                      style={{ backgroundColor: colorsData.secondaryColor }}
                      className="px-6 py-3 rounded-xl text-white font-black hover:opacity-90 transition-all"
                    >
                      Sekundær Knap
                    </button>
                  </div>
                  <div>
                    <h2 style={{ color: colorsData.primaryColor }} className="text-3xl font-black mb-2">
                      Sådan ser overskrifter ud
                    </h2>
                    <p className="text-slate-600">
                      Normal tekst ser ud som den altid gør, men{' '}
                      <span style={{ color: colorsData.secondaryColor }} className="font-bold">
                        accent farven
                      </span>{' '}
                      fremhæver vigtige elementer.
                    </p>
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <div className="flex gap-3">
                <button
                  onClick={() => setColorsData({
                    primaryColor: '#1e3a8a',
                    secondaryColor: '#ea580c',
                    primaryColorName: 'Blå',
                    secondaryColorName: 'Orange'
                  })}
                  className="bg-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-300 transition-all"
                >
                  Nulstil til Standard
                </button>

                <button
                  onClick={handleSaveColors}
                  disabled={saving}
                  className="bg-blue-900 text-white px-8 py-4 rounded-xl font-black flex items-center gap-3 hover:bg-orange-600 transition-all disabled:bg-slate-300 disabled:cursor-not-allowed"
                >
                  <Save size={20} />
                  {saving ? 'Gemmer...' : 'Gem Farver'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Images Section */}
        {activeSection === 'images' && (
          <div>
            <h2 className="text-3xl font-black text-blue-900 mb-6 uppercase tracking-tight">
              Billeder
            </h2>
            <p className="text-slate-600 mb-8">
              Upload nye billeder til at erstatte eksisterende billeder på sitet.
            </p>

            <div className="space-y-6 max-w-4xl">
              {/* Hero Background */}
              <div className="bg-slate-50 p-6 rounded-xl border-2 border-slate-200">
                <h3 className="text-xl font-black text-blue-900 mb-4">Hero Baggrundsbillede</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Current Image */}
                  <div>
                    <p className="text-sm font-black uppercase tracking-widest text-slate-600 mb-2">
                      Nuværende Billede
                    </p>
                    <div className="aspect-video rounded-lg overflow-hidden border-2 border-slate-200 bg-slate-100">
                      <img
                        src={imagesData.heroBackground}
                        alt="Hero background"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Upload New */}
                  <div>
                    <p className="text-sm font-black uppercase tracking-widest text-slate-600 mb-2">
                      Upload Nyt Billede
                    </p>
                    <label className="aspect-video rounded-lg border-4 border-dashed border-slate-300 hover:border-blue-900 transition-all cursor-pointer flex flex-col items-center justify-center gap-3 bg-white">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleImageUpload('heroBackground', e.target.files[0])}
                        className="hidden"
                        disabled={uploadingImage === 'heroBackground'}
                      />
                      {uploadingImage === 'heroBackground' ? (
                        <div className="text-center">
                          <Save className="animate-spin mx-auto mb-2 text-blue-900" size={32} />
                          <p className="text-sm font-bold text-blue-900">Uploader...</p>
                        </div>
                      ) : (
                        <>
                          <Upload size={32} className="text-slate-400" />
                          <p className="text-sm font-bold text-slate-600">Klik for at vælge billede</p>
                          <p className="text-xs text-slate-400">Anbefalet: 1920x1080px</p>
                        </>
                      )}
                    </label>
                  </div>
                </div>
              </div>

              {/* Service Images */}
              <div className="bg-slate-50 p-6 rounded-xl border-2 border-slate-200">
                <h3 className="text-xl font-black text-blue-900 mb-4">Service Billeder</h3>

                {Object.entries(imagesData.serviceImages).map(([key, imagePath]) => (
                  <div key={key} className="mb-6 pb-6 border-b border-slate-200 last:border-0">
                    <h4 className="text-lg font-bold text-slate-700 mb-3 capitalize">{key}</h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Current Image */}
                      <div>
                        <p className="text-sm font-black uppercase tracking-widest text-slate-600 mb-2">
                          Nuværende
                        </p>
                        <div className="aspect-video rounded-lg overflow-hidden border-2 border-slate-200 bg-slate-100">
                          <img
                            src={imagePath}
                            alt={key}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Upload New */}
                      <div>
                        <p className="text-sm font-black uppercase tracking-widest text-slate-600 mb-2">
                          Upload Nyt
                        </p>
                        <label className="aspect-video rounded-lg border-4 border-dashed border-slate-300 hover:border-blue-900 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 bg-white">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => e.target.files?.[0] && handleImageUpload(key, e.target.files[0])}
                            className="hidden"
                            disabled={uploadingImage === key}
                          />
                          {uploadingImage === key ? (
                            <div className="text-center">
                              <Save className="animate-spin mx-auto mb-2 text-blue-900" size={24} />
                              <p className="text-xs font-bold text-blue-900">Uploader...</p>
                            </div>
                          ) : (
                            <>
                              <Upload size={24} className="text-slate-400" />
                              <p className="text-xs font-bold text-slate-600">Klik for at vælge</p>
                            </>
                          )}
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border-l-4 border-blue-900 p-6 rounded-r-xl">
                <h4 className="font-black text-blue-900 uppercase text-sm tracking-widest mb-2">
                  ℹ️ Billedinformation
                </h4>
                <ul className="text-sm text-slate-700 space-y-1 list-disc list-inside">
                  <li>Billeder uploades automatisk og erstatter de nuværende</li>
                  <li>Anbefalet format: JPG eller PNG</li>
                  <li>Max filstørrelse: 5MB</li>
                  <li>Billeder optimeres automatisk for web</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentEditor;
