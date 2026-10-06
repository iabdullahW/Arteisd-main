import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, animate } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';

const PULL_THRESHOLD = 150;

const PullString = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isPulling, setIsPulling] = useState(false);
  const [triggered, setTriggered] = useState(false);

  const INITIAL_Y = 120;
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  
  const springX = useSpring(dragX, { stiffness: 400, damping: 25 });
  const springY = useSpring(dragY, { stiffness: 400, damping: 25 });
  
  // Create a dynamic SVG path for the string
  const path = useTransform(
    [springX, springY],
    ([x, y]) => `M 50 0 Q 50 ${(INITIAL_Y + (y as number)) / 2} ${50 + (x as number)} ${INITIAL_Y + (y as number)}`
  );

  const pages = ['/', '/philosophy', '/atelier', '/archive', '/contact'];
  
  const handleDragEnd = () => {
    const currentY = dragY.get();
    if (currentY >= PULL_THRESHOLD) {
      triggerTransition();
    }
    
    // Smoothly animate back to 0
    animate(dragX, 0, { type: "spring", stiffness: 500, damping: 30 });
    animate(dragY, 0, { type: "spring", stiffness: 500, damping: 30 });
    
    setIsPulling(false);
  };

  const playShutterSound = () => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const context = new AudioContext();
    
    // First part: Sharp click (High frequency noise)
    const noiseBuffer = context.createBuffer(1, context.sampleRate * 0.05, context.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    
    const noiseSource = context.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    
    const noiseGain = context.createGain();
    noiseGain.gain.setValueAtTime(0.3, context.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.04);
    
    const noiseFilter = context.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.setValueAtTime(2000, context.currentTime);
    
    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(context.destination);
    
    // Second part: Mechanical "clack" (Low-mid frequency pulse)
    const osc = context.createOscillator();
    osc.type = 'square';
    osc.frequency.setValueAtTime(150, context.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, context.currentTime + 0.1);
    
    const oscGain = context.createGain();
    oscGain.gain.setValueAtTime(0.2, context.currentTime);
    oscGain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1);
    
    osc.connect(oscGain);
    oscGain.connect(context.destination);
    
    noiseSource.start();
    osc.start();
    noiseSource.stop(context.currentTime + 0.1);
    osc.stop(context.currentTime + 0.1);
  };

  const triggerTransition = () => {
    playShutterSound();
    setTriggered(true);
    const currentIndex = pages.indexOf(location.pathname);
    const nextIndex = (currentIndex + 1) % pages.length;
    setTimeout(() => {
      navigate(pages[nextIndex]);
      setTriggered(false);
    }, 600);
  };

  return (
    <div className="fixed top-0 right-12 md:right-24 z-[100] h-screen pointer-events-none w-24 flex justify-center">
      <div className="relative h-full w-full">
        {/* Dynamic SVG String */}
        <svg className="absolute inset-0 w-full h-full overflow-visible">
          <motion.path
            d={path}
            fill="transparent"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{ opacity: useTransform(springY, [0, PULL_THRESHOLD], [0.2, 0.8]) }}
            className="filter drop-shadow-sm"
          />
        </svg>
        
        {/* The Handle/Knob */}
        <motion.div
          drag
          dragConstraints={{ top: -80, bottom: 800 }}
          dragElastic={0.1}
          onDragStart={() => setIsPulling(true)}
          onDragEnd={handleDragEnd}
          style={{ x: dragX, y: dragY, top: INITIAL_Y }}
          className="absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border border-white/40 bg-brand-black cursor-grab active:cursor-grabbing pointer-events-auto flex items-center justify-center group z-20"
        >
          <div className="w-2 h-2 bg-white rounded-full group-hover:scale-125 transition-transform" />
          
          <motion.div
            style={{ 
              opacity: useTransform(springY, [0, PULL_THRESHOLD], [0.1, 1]),
              x: useTransform(springY, [0, PULL_THRESHOLD], [-20, -40])
            }}
            className="absolute right-full mr-6 text-[10px] font-mono text-white uppercase tracking-[0.5em] whitespace-nowrap pointer-events-none"
          >
            {triggered ? 'Exploring...' : 'Pull to Explore'}
          </motion.div>
        </motion.div>

        {/* Trigger Flash Effect */}
        <AnimatePresence>
          {triggered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-white z-[1000] pointer-events-none"
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PullString;
