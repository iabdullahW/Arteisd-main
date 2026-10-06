import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="px-8 md:px-16 py-12 md:py-20 border-t border-white/5 bg-brand-black overflow-hidden relative">
    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none" />
    
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 md:gap-0 relative z-10">
      <div className="flex flex-col gap-6">
        <Link to="/" className="text-3xl font-display italic tracking-tighter text-white">Aether Studio</Link>
        <p className="text-[11px] uppercase tracking-[0.4em] text-white/30 max-w-[200px] leading-relaxed">
          Precision design. Purposeful space.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-[10px] uppercase tracking-widest text-white/30 font-sans">
        {[
          { name: 'Instagram', path: '#', external: true },
          { name: 'Linkedin', path: '#', external: true },
          { name: 'About', path: '/about', external: false },
          { name: 'Press', path: '/press', external: false },
          { name: 'Privacy', path: '/privacy', external: false }
        ].map((link) => (
          link.external ? (
            <a key={link.name} href={link.path} className="hover:text-white transition-colors duration-500">
              {link.name}
            </a>
          ) : (
            <Link key={link.name} to={link.path} className="hover:text-white transition-colors duration-500">
              {link.name}
            </Link>
          )
        ))}
      </div>

      <div className="flex flex-col items-center md:items-end gap-2">
         <div className="text-[9px] font-mono text-white/10 uppercase tracking-[0.4em]">© 2026 Aether Studio. All rights reserved.</div>
         <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest text-nowrap">51.5074° N, 0.1278° W</div>
      </div>
    </div>
  </footer>
);

export default Footer;
