import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Portfolio', path: '/#portfolio' },
    { name: 'Philosophy', path: '/philosophy' },
    { name: 'Atelier', path: '/atelier' },
    { name: 'Archive', path: '/archive' },
    { name: 'About', path: '/about' }
  ];

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <header className="fixed top-8 md:top-12 left-0 right-0 z-[60] flex justify-center px-4 md:px-8 pointer-events-none">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto flex items-center justify-between md:justify-start gap-4 md:gap-6 lg:gap-10 w-full max-w-[calc(100vw-2rem)] md:max-w-max px-4 md:px-6 lg:px-8 py-2 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
        >
          <Link to="/" className="text-lg tracking-tighter font-light text-white font-display italic md:ml-2 lg:ml-4 md:mr-2 lg:mr-4">
            Aether
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-4 lg:gap-10 items-center h-8 flex-1 justify-center">
            {navItems.map((item) => {
              const isActive = (location.pathname === item.path) || (item.path.startsWith('/#') && location.pathname === '/');
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-[9px] lg:text-[10px] uppercase tracking-[0.2em] transition-all duration-300 hover:text-white font-sans text-nowrap ${isActive ? 'text-white' : 'text-white/40'
                    }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              className="hidden sm:flex bg-white text-black px-4 md:px-5 lg:px-6 py-2 lg:py-2.5 rounded-full text-[9px] lg:text-[10px] uppercase tracking-widest font-bold hover:bg-[#d4d4d4] hover:scale-105 transition-all duration-300 active:scale-95 shadow-[0_4px_12px_rgba(255,255,255,0.1)] text-nowrap items-center gap-2 lg:gap-3"
            >
              Book Consultation
              <ArrowRight className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex md:hidden text-white p-1 hover:text-white/70 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-8 md:hidden"
          >
            <nav className="flex flex-col items-center gap-10">
              {navItems.map((item, idx) => {
                const isActive = (location.pathname === item.path) || (item.path.startsWith('/#') && location.pathname === '/');
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`text-2xl uppercase tracking-[0.3em] font-display italic transition-all duration-300 ${isActive ? 'text-white' : 'text-white/30'
                        }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                className="mt-8"
              >
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="bg-white text-black px-10 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-bold shadow-[0_8px_24px_rgba(255,255,255,0.1)] flex items-center gap-3"
                >
                  Book Consultation
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-12 text-[10px] uppercase tracking-[0.4em] text-white/20"
            >
              Aether Studio // Volume III
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
