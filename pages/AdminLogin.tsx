import React, { useState } from 'react';
import { Lock, User, LogIn, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (isAuthenticated: boolean) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store session token
        sessionStorage.setItem('admin_authenticated', 'true');
        sessionStorage.setItem('admin_token', data.token);
        onLogin(true);
      } else {
        setError(data.message || 'Forkert brugernavn eller adgangskode');
      }
    } catch (err) {
      setError('Der opstod en fejl. Prøv igen senere.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl p-10 shadow-2xl">
          <div className="w-16 h-16 bg-blue-900 rounded-2xl flex items-center justify-center text-white mx-auto mb-8">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-black text-blue-900 text-center mb-2 uppercase italic">Admin Login</h1>
          <p className="text-slate-600 text-center mb-8 text-sm font-medium">PR Entreprenøren ApS</p>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
              <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
              <p className="text-red-800 text-sm font-bold">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2">
                Brugernavn
              </label>
              <div className="relative">
                <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-blue-900 transition-colors font-bold"
                  placeholder="admin"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2">
                Adgangskode
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-blue-900 transition-colors font-bold"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-900 text-white font-black py-4 rounded-2xl hover:bg-orange-600 transition-all flex items-center justify-center gap-2 uppercase tracking-widest shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Logger ind...
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  Log Ind
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-500 mt-8 font-medium">
            Kun for autoriseret personale
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
