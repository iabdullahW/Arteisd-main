import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [hasVisited, setHasVisited] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // If user prefers reduced motion, skip the intro
    if (shouldReduceMotion) {
      setIsVisible(false);
      setHasVisited(true);
      sessionStorage.setItem('aether-visited', 'true');
      return;
    }

    const visited = sessionStorage.getItem('aether-visited');
    if (visited) {
      setIsVisible(false);
      setHasVisited(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem('aether-visited', 'true');
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [shouldReduceMotion]);

  if (hasVisited) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
          }}
          className="fixed inset-0 z-[1000] bg-brand-black flex items-center justify-center overflow-hidden"
        >
          <div className="relative flex flex-col items-center">
            {/* Minimalist SVG Logo Draw */}
            <svg 
              width="120" 
              height="120" 
              viewBox="0 0 100 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="mb-8"
            >
              <motion.path
                d="M50 10L15 90H85L50 10Z"
                stroke="white"
                strokeWidth="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ 
                  duration: 2.5, 
                  ease: [0.45, 0, 0.55, 1],
                  opacity: { duration: 0.8 }
                }}
              />
              <motion.path
                d="M35 60H65"
                stroke="white"
                strokeWidth="0.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ 
                  duration: 1.5, 
                  delay: 1.2,
                  ease: "easeInOut" 
                }}
              />
            </svg>

            <div className="overflow-hidden h-4 flex items-center">
              <motion.span
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                className="text-[10px] uppercase font-mono tracking-[0.8em] text-white/40"
              >
                Aether Studio
              </motion.span>
            </div>

            {/* Shutter Effect Background */}
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 3, ease: "linear" }}
              className="absolute -bottom-12 left-0 right-0 h-[1px] bg-white/20 origin-left"
            />
          </div>

          {/* Shutter Panels for Exit */}
          <motion.div
            initial={{ scaleY: 0 }}
            exit={{ scaleY: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ originY: 1 }}
            className="fixed inset-0 bg-brand-black z-[1001] pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
