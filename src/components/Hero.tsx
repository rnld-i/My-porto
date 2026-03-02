import { Github, Linkedin, Mail } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { SmokeShader } from './SmokeShader';

export function Hero() {
  return (
    <section id="home" className="pt-32 pb-20 md:pt-48 md:pb-32 px-6">
      <div className="container mx-auto max-w-6xl flex flex-col-reverse md:flex-row items-center gap-12">
        <div className="flex-1 flex flex-col items-start text-left">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium text-sm mb-6">
            Siswa Kelas 11 RPL
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
            Hi, I'm <span className="text-blue-600 dark:text-blue-400">rnld-i</span>,
            <br /> Fullstack Developer Student.
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-xl leading-relaxed">
            Saya adalah siswa SMK jurusan Rekayasa Perangkat Lunak (RPL) yang bersemangat mempelajari teknologi web modern dari frontend hingga backend.
          </p>

          <div className="flex items-center gap-4 mt-10">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="mailto:hello@example.com" className="p-2 text-slate-400 dark:text-slate-500 hover:text-red-500 transition-colors">
              <Mail size={24} />
            </a>
          </div>
        </div>
        
        <div className="flex-1 relative w-full">
          <div className="w-full h-[400px] md:h-[500px] mx-auto relative z-10 cursor-grab active:cursor-grabbing">
            <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <SmokeShader />
              <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} autoRotate autoRotateSpeed={1.0} />
            </Canvas>
          </div>
          {/* Decorative background blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-100 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-full blur-3xl -z-10 opacity-70"></div>
        </div>
      </div>
    </section>
  );
}
