
import React, { useState } from 'react';
import { Lead, LeadPriority, LeadStatus } from '../types';
import { Phone, Check, Clock, AlertCircle, Filter, Trash2, ExternalLink } from 'lucide-react';

const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Mads Jensen',
    phone: '40 50 60 70',
    zipCode: '5000 Odense C',
    problem: 'Vand i kælderen',
    priority: LeadPriority.ACUTE,
    insuranceClaim: true,
    status: LeadStatus.NEW,
    aiSummary: 'Akut vandindtrængning i kælder. Forsikringssag oprettet. Kunden er stresset.',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Anna Schmidt',
    phone: '22 33 44 55',
    zipCode: '5700 Svendborg',
    problem: 'Rottespærre service',
    priority: LeadPriority.PLANNED,
    insuranceClaim: false,
    status: LeadStatus.CONTACTED,
    aiSummary: 'Ønsker årligt eftersyn af rottespærre. Ikke akut.',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
];

const AdminDashboard: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [activeTab, setActiveTab] = useState<'NYE' | 'ALLE'>('NYE');

  const updateStatus = (id: string, newStatus: LeadStatus) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
  };

  const getPriorityColor = (p: LeadPriority) => {
    switch (p) {
      case LeadPriority.ACUTE: return 'bg-red-600 text-white';
      case LeadPriority.URGENT: return 'bg-orange-500 text-white';
      case LeadPriority.PLANNED: return 'bg-green-600 text-white';
    }
  };

  const filteredLeads = activeTab === 'NYE' ? leads.filter(l => l.status === LeadStatus.NEW) : leads;

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="bg-slate-900 text-white p-6 shadow-xl">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center font-black text-xl">PR</div>
            <div>
              <h1 className="text-xl font-black">Lead Dashboard</h1>
              <p className="text-slate-400 text-sm">Håndtering af kundehenvendelser</p>
            </div>
          </div>
          <div className="flex bg-slate-800 p-1 rounded-xl">
            <button 
              onClick={() => setActiveTab('NYE')}
              className={`px-6 py-2 rounded-lg font-bold transition-all ${activeTab === 'NYE' ? 'bg-orange-600 text-white' : 'text-slate-400'}`}
            >
              Nye Leads ({leads.filter(l => l.status === LeadStatus.NEW).length})
            </button>
            <button 
              onClick={() => setActiveTab('ALLE')}
              className={`px-6 py-2 rounded-lg font-bold transition-all ${activeTab === 'ALLE' ? 'bg-orange-600 text-white' : 'text-slate-400'}`}
            >
              Alle
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-10">
        <div className="grid grid-cols-1 gap-6">
          {filteredLeads.length === 0 ? (
            <div className="bg-white rounded-2xl p-20 text-center border-2 border-dashed border-slate-300">
              <Check size={48} className="mx-auto text-green-500 mb-4" />
              <h2 className="text-2xl font-bold text-slate-800">Alt er håndteret!</h2>
              <p className="text-slate-500">Der er ingen nye leads i køen lige nu.</p>
            </div>
          ) : (
            filteredLeads.map((lead) => (
              <div key={lead.id} className="bg-white rounded-3xl shadow-sm border overflow-hidden flex flex-col md:flex-row">
                <div className={`w-full md:w-4 shrink-0 ${getPriorityColor(lead.priority)}`}></div>
                <div className="flex-1 p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${getPriorityColor(lead.priority)}`}>
                          {lead.priority}
                        </span>
                        <span className="text-slate-400 text-sm">{new Date(lead.createdAt).toLocaleString('da-DK')}</span>
                      </div>
                      <h2 className="text-3xl font-black text-slate-900">{lead.name}</h2>
                      <p className="text-xl text-blue-900 font-bold">{lead.zipCode}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <a 
                        href={`tel:${lead.phone.replace(/\s/g, '')}`}
                        className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-2xl flex items-center gap-2 font-black shadow-lg shadow-green-600/20"
                      >
                        <Phone size={24} /> RING OP NU
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-slate-50 p-6 rounded-2xl mb-8">
                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Problembeskrivelse</h4>
                      <p className="text-lg font-bold text-slate-800">{lead.problem}</p>
                      {lead.insuranceClaim && (
                        <div className="mt-2 inline-flex items-center gap-2 text-orange-600 font-bold text-sm bg-orange-50 px-2 py-1 rounded">
                          <AlertCircle size={14} /> Forsikringssag
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">AI Opsummering (Jacob/Preben Info)</h4>
                      <p className="text-slate-700 italic border-l-4 border-slate-300 pl-4">"{lead.aiSummary}"</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <span className="text-sm font-black text-slate-400 uppercase">Marker status:</span>
                    <div className="flex flex-wrap gap-2">
                      {Object.values(LeadStatus).map((status) => (
                        <button
                          key={status}
                          onClick={() => updateStatus(lead.id, status)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border-2 ${
                            lead.status === status 
                              ? 'bg-blue-900 border-blue-900 text-white' 
                              : 'bg-white border-slate-200 text-slate-600 hover:border-blue-900/30'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
