import { useEffect, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string;
  github_link: string;
  demo_link: string;
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        if (!res.ok) throw new Error('Gagal mengambil data project');
        const data = await res.json();
        setProjects(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-20 bg-white px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">My Projects</h2>
          <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
          <p className="mt-6 text-slate-600 max-w-2xl mx-auto">
            Beberapa project yang telah saya kerjakan selama belajar menjadi Fullstack Developer.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-500">Memuat project...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div 
                key={project.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {project.github_link && (
                      <a 
                        href={project.github_link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                      >
                        <Github size={20} />
                      </a>
                    )}
                    {project.demo_link && (
                      <a 
                        href={project.demo_link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{project.title}</h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.technologies.split(',').map((tech) => (
                      <span 
                        key={tech.trim()} 
                        className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
