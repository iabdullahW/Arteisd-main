import React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';

const ReadingProgress = () => {
  const { scrollYProgress } = useScroll();
  
  // Smooth the progress
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Fade in after 10%, fade out after 95%
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.95, 1],
    [0, 1, 1, 0]
  );

  return (
    <div className="fixed right-6 md:right-12 top-0 bottom-0 w-px z-[90] pointer-events-none flex flex-col items-center">
      {/* Background Track (Faint) */}
      <motion.div 
        style={{ opacity: useTransform(opacity, [0, 1], [0, 0.05]) }}
        className="absolute inset-y-0 w-px bg-white"
      />
      
      {/* Progress Line */}
      <motion.div
        style={{ 
          scaleY, 
          opacity,
          originY: 0
        }}
        className="absolute inset-y-0 w-px bg-gradient-to-b from-white/20 via-white to-white/20"
      />

      {/* Decorative percentage (optional, very subtle) */}
      <motion.div
        style={{ 
          top: useTransform(scaleY, [0, 1], ["0%", "100%"]),
          opacity 
        }}
        className="absolute -right-4 -translate-y-1/2"
      >
        <div className="text-[7px] font-mono text-white/20 uppercase tracking-tighter rotate-90 origin-left">
          Progress
        </div>
      </motion.div>
    </div>
  );
};

export default ReadingProgress;
