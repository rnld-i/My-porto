import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import toast from 'react-hot-toast';

export function AdminLogin() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple hardcoded password for demonstration
    if (password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      toast.success('Login berhasil!');
      navigate('/admin/dashboard');
    } else {
      toast.error('Password salah!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-6 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800">
        <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600 dark:text-blue-400">
          <Lock size={32} />
        </div>
        <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-2">Admin Login</h2>
        <p className="text-center text-slate-500 dark:text-slate-400 mb-8">Gunakan password 'admin123' untuk masuk</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Masukkan password..."
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 dark:shadow-blue-900/20"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
