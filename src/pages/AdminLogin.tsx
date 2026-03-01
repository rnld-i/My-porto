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
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600">
          <Lock size={32} />
        </div>
        <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">Admin Login</h2>
        <p className="text-center text-slate-500 mb-8">Gunakan password 'admin123' untuk masuk</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Masukkan password..."
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
