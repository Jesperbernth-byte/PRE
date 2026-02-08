import React, { useState, useEffect } from 'react';
import { History, RotateCcw, Eye, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { SiteEditorService } from '../services/siteEditorService';
import type { SiteEditVersion } from '../types/siteEditor';

const VersionHistory: React.FC = () => {
  const [versions, setVersions] = useState<SiteEditVersion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await SiteEditorService.getHistory(50);
      setVersions(response.versions || []);
    } catch (err: any) {
      setError(err.message || 'Kunne ikke indlæse historik');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRollback = async (versionId: string) => {
    if (!confirm('Er du sikker på at du vil rulle tilbage til denne version? Dette vil lave en ny commit.')) {
      return;
    }

    try {
      await SiteEditorService.rollback(versionId, 'admin');
      alert('✅ Rollback udført! Sitet opdateres om 1-2 minutter.');
      loadHistory();
    } catch (err: any) {
      alert(`❌ Rollback fejlede: ${err.message}`);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'deployed':
        return <CheckCircle className="text-green-600" size={20} />;
      case 'preview':
        return <Eye className="text-blue-600" size={20} />;
      case 'rolled_back':
        return <RotateCcw className="text-orange-600" size={20} />;
      default:
        return <Clock className="text-slate-400" size={20} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'deployed':
        return 'Deployet';
      case 'preview':
        return 'Preview';
      case 'rolled_back':
        return 'Rullet Tilbage';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deployed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'preview':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'rolled_back':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border-2 border-slate-200 p-10 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-slate-600">Indlæser historik...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 rounded-2xl border-2 border-red-200 p-6">
        <div className="flex items-center gap-3">
          <AlertCircle className="text-red-600" size={24} />
          <div>
            <h3 className="font-bold text-red-900">Fejl ved indlæsning</h3>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-900 rounded-xl flex items-center justify-center">
          <History className="text-white" size={20} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tight">
            Versions Historik
          </h2>
          <p className="text-sm text-slate-600">
            {versions.length} version{versions.length !== 1 ? 'er' : ''} i alt
          </p>
        </div>
      </div>

      {versions.length === 0 ? (
        <div className="bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 p-10 text-center">
          <History className="mx-auto mb-4 text-slate-400" size={48} />
          <h3 className="text-xl font-bold text-slate-800 mb-2">Ingen versioner endnu</h3>
          <p className="text-slate-600">Når du laver ændringer vil de blive vist her</p>
        </div>
      ) : (
        <div className="space-y-3">
          {versions.map((version) => (
            <div
              key={version.id}
              className="bg-white rounded-xl border-2 border-slate-200 p-5 hover:border-blue-900 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  {/* Status Icon */}
                  <div className="shrink-0 mt-1">
                    {getStatusIcon(version.status)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-black text-blue-900 text-lg">
                        Version {version.version_number}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${getStatusColor(
                          version.status
                        )}`}
                      >
                        {getStatusText(version.status)}
                      </span>
                    </div>

                    <p className="text-slate-700 mb-3 leading-relaxed">
                      {version.change_description}
                    </p>

                    {/* Metadata */}
                    <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                      <span>
                        <strong>Af:</strong> {version.changed_by}
                      </span>
                      <span>
                        <strong>Dato:</strong>{' '}
                        {new Date(version.created_at).toLocaleDateString('da-DK', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                      {version.deployed_at && (
                        <span>
                          <strong>Deployet:</strong>{' '}
                          {new Date(version.deployed_at).toLocaleDateString('da-DK', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      )}
                    </div>

                    {/* Files Changed */}
                    {version.files_changed && Object.keys(version.files_changed).length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {Object.keys(version.files_changed).map((file, i) => (
                          <span
                            key={i}
                            className="bg-slate-100 px-2 py-1 rounded text-[10px] font-mono text-slate-700"
                          >
                            {file}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                {version.status === 'deployed' && !version.rolled_back_at && (
                  <button
                    onClick={() => handleRollback(version.id)}
                    className="shrink-0 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase flex items-center gap-2 transition-all"
                  >
                    <RotateCcw size={14} />
                    Rul Tilbage
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VersionHistory;
