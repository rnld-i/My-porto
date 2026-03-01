import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Skills } from "../components/Skills";
import { Projects } from "../components/Projects";
import { Contact } from "../components/Contact";

export function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      
      <footer className="bg-slate-900 text-slate-400 py-8 text-center">
        <div className="container mx-auto px-6">
          <p>&copy; {new Date().getFullYear()} Nama Kamu. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
