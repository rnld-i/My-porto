import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Skills } from "../components/Skills";
import { Projects } from "../components/Projects";
import { Contact } from "../components/Contact";
import { Github, Linkedin, Mail } from 'lucide-react';

export function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      
      <footer className="bg-slate-900 text-slate-400 py-12 text-center">
        <div className="container mx-auto px-6">
          <div className="flex justify-center gap-6 mb-8">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 hover:text-white transition-colors">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 hover:text-white transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="mailto:hello@example.com" className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 hover:text-white transition-colors">
              <Mail size={20} />
            </a>
          </div>
          <p>&copy; {new Date().getFullYear()} Nama Kamu. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
