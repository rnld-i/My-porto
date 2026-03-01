import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, LogOut, LayoutDashboard, MessageSquare, FolderGit2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string;
  github_link: string;
  demo_link: string;
}

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'projects' | 'messages'>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    technologies: '',
    github_link: '',
    demo_link: '',
  });

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/admin');
      return;
    }

    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [projectsRes, messagesRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/messages')
      ]);
      
      if (projectsRes.ok) setProjects(await projectsRes.json());
      if (messagesRes.ok) setMessages(await messagesRes.json());
    } catch (error) {
      toast.error('Gagal mengambil data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin');
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success('Project berhasil ditambahkan!');
        setFormData({ title: '', description: '', image: '', technologies: '', github_link: '', demo_link: '' });
        fetchData();
      } else {
        const err = await res.json();
        toast.error(err.error || 'Gagal menambahkan project');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan');
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm('Yakin ingin menghapus project ini?')) return;
    
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Project dihapus');
        fetchData();
      } else {
        toast.error('Gagal menghapus project');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-6 flex flex-col min-h-screen sticky top-0">
        <div className="flex items-center gap-3 mb-10 text-blue-600">
          <LayoutDashboard size={28} />
          <h1 className="text-xl font-bold text-slate-900">Admin Panel</h1>
        </div>

        <nav className="flex-1 space-y-2">
          <button
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
              activeTab === 'projects' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <FolderGit2 size={20} />
            Kelola Projects
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
              activeTab === 'messages' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <MessageSquare size={20} />
            Pesan Masuk
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 px-4 py-3 text-red-600 font-medium hover:bg-red-50 rounded-xl transition-colors"
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {activeTab === 'projects' && (
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Tambah Project Baru</h2>
            
            <form onSubmit={handleAddProject} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-12">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Nama Project *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">URL Gambar *</label>
                  <input
                    type="url"
                    required
                    value={formData.image}
                    onChange={e => setFormData({...formData, image: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Teknologi (pisahkan dengan koma) *</label>
                  <input
                    type="text"
                    required
                    value={formData.technologies}
                    onChange={e => setFormData({...formData, technologies: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="React, Node.js, Tailwind"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Link GitHub</label>
                  <input
                    type="url"
                    value={formData.github_link}
                    onChange={e => setFormData({...formData, github_link: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-slate-700">Link Demo</label>
                  <input
                    type="url"
                    value={formData.demo_link}
                    onChange={e => setFormData({...formData, demo_link: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-slate-700">Deskripsi *</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  ></textarea>
                </div>
              </div>
              <button type="submit" className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                <Plus size={18} />
                Simpan Project
              </button>
            </form>

            <h2 className="text-2xl font-bold text-slate-900 mb-6">Daftar Project</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 font-medium text-slate-600">Project</th>
                    <th className="px-6 py-4 font-medium text-slate-600">Teknologi</th>
                    <th className="px-6 py-4 font-medium text-slate-600 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {projects.map(project => (
                    <tr key={project.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{project.title}</div>
                        <div className="text-sm text-slate-500 truncate max-w-xs">{project.description}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{project.technologies}</td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => handleDeleteProject(project.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors inline-block"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {projects.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-6 py-8 text-center text-slate-500">Belum ada project</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Pesan Masuk</h2>
            <div className="grid gap-6">
              {messages.map(msg => (
                <div key={msg.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">{msg.name}</h3>
                      <a href={`mailto:${msg.email}`} className="text-blue-600 text-sm hover:underline">{msg.email}</a>
                    </div>
                    <span className="text-xs text-slate-400 bg-slate-50 px-3 py-1 rounded-full">
                      {new Date(msg.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <p className="text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    {msg.message}
                  </p>
                </div>
              ))}
              {messages.length === 0 && (
                <div className="text-center py-12 text-slate-500 bg-white rounded-2xl border border-slate-200">
                  Belum ada pesan masuk
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
