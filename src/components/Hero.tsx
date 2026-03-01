import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

export function Hero() {
  return (
    <section id="home" className="pt-32 pb-20 md:pt-48 md:pb-32 px-6">
      <div className="container mx-auto max-w-6xl flex flex-col-reverse md:flex-row items-center gap-12">
        <div className="flex-1 flex flex-col items-start text-left">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 font-medium text-sm mb-6">
            Siswa Kelas 11 RPL
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
            Hi, I'm <span className="text-blue-600">Nama Kamu</span>,
            <br /> Fullstack Developer Student.
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-xl leading-relaxed">
            Saya adalah siswa SMK jurusan Rekayasa Perangkat Lunak (RPL) yang bersemangat mempelajari teknologi web modern dari frontend hingga backend.
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
            >
              View Projects
              <ArrowRight size={18} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-700 border border-slate-200 rounded-xl font-medium hover:bg-slate-50 transition-colors"
            >
              Contact Me
            </a>
          </div>

          <div className="flex items-center gap-4 mt-10">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="mailto:hello@example.com" className="p-2 text-slate-400 hover:text-red-500 transition-colors">
              <Mail size={24} />
            </a>
          </div>
        </div>
        
        <div className="flex-1 relative">
          <div className="w-64 h-64 md:w-96 md:h-96 mx-auto relative z-10">
            <img
              src="https://picsum.photos/seed/profile/800/800"
              alt="Profile"
              className="w-full h-full object-cover rounded-3xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Decorative background blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-full blur-3xl -z-10 opacity-70"></div>
        </div>
      </div>
    </section>
  );
}
