import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { LogOut, Sparkles, Edit } from 'lucide-react';
import AdminLogin from './AdminLogin';
import SiteEditorChat from '../components/SiteEditorChat';
import ContentEditor from '../components/ContentEditor';
import { isTokenLive, clearAuth } from '../lib/clientAuth';

const AdminDashboardProtected: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isTokenLive()) {
      setIsAuthenticated(true);
    } else {
      clearAuth();
    }

    const onExpired = () => {
      setIsAuthenticated(false);
      navigate('/admin');
    };
    window.addEventListener('admin-auth-expired', onExpired);
    return () => window.removeEventListener('admin-auth-expired', onExpired);
  }, [navigate]);

  const handleLogout = () => {
    clearAuth();
    setIsAuthenticated(false);
    navigate('/admin');
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={setIsAuthenticated} />;
  }

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="bg-slate-900 text-white p-6 shadow-xl">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center font-black text-xl">PR</div>
            <div>
              <h1 className="text-xl font-black">Admin</h1>
              <p className="text-slate-400 text-sm">Site-redigering for PR Entreprenøren</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex bg-slate-800 p-1 rounded-xl">
              <button
                onClick={() => navigate('/admin/rediger-indhold')}
                className={`px-6 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${isActive('/admin/rediger-indhold') || isActive('/admin') || isActive('/admin/') ? 'bg-orange-600 text-white' : 'text-slate-400'}`}
              >
                <Edit size={16} />
                Rediger Indhold
              </button>
              <button
                onClick={() => navigate('/admin/site-redigering')}
                className={`px-6 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${isActive('/admin/site-redigering') ? 'bg-orange-600 text-white' : 'text-slate-400'}`}
              >
                <Sparkles size={16} />
                AI-Editor
              </button>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all"
            >
              <LogOut size={18} />
              Log Ud
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-10">
        <Routes>
          <Route index element={<Navigate to="/admin/rediger-indhold" replace />} />
          <Route path="rediger-indhold" element={
            <div className="h-[calc(100vh-200px)]">
              <ContentEditor />
            </div>
          } />
          <Route path="site-redigering" element={
            <div className="max-w-5xl mx-auto">
              <SiteEditorChat />
            </div>
          } />
          {/* Catch any old /admin/nye, /admin/alle URLs and redirect */}
          <Route path="*" element={<Navigate to="/admin/rediger-indhold" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboardProtected;
