import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link, useLocation } from 'react-router-dom';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (location.pathname !== '/') {
      // If not on home page, let the Link handle navigation to /#section
      return;
    }
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-6 max-w-6xl flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-tighter text-blue-600">
          Portfolio.
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={location.pathname === '/' ? link.href : `/${link.href}`}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-slate-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-lg py-4 px-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={location.pathname === '/' ? link.href : `/${link.href}`}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-base font-medium text-slate-600 hover:text-blue-600 py-2"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
