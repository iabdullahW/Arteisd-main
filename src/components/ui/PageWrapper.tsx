import React from 'react';
import { motion } from 'motion/react';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, className = "" }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={{
        initial: {
          opacity: 0,
          y: 20,
          scale: 0.98,
          filter: 'blur(10px)',
        },
        animate: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            staggerChildren: 0.1,
          },
        },
        exit: {
          opacity: 0,
          y: -20,
          scale: 1.02,
          filter: 'blur(10px)',
          transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className={`w-full min-h-screen ${className}`}
    >
      {/* Cinematic Transition Overlay */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ originY: 1 }}
        className="fixed inset-0 bg-brand-black z-[999] pointer-events-none"
      />
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ originY: 0 }}
        className="fixed inset-0 bg-brand-black z-[999] pointer-events-none"
      />
      
      {children}
    </motion.div>
  );
};

export default PageWrapper;
