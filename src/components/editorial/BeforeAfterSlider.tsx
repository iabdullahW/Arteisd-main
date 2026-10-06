import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ 
  beforeImage, 
  afterImage,
  beforeLabel = "Original",
  afterLabel = "Realized"
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const dragX = useMotionValue(50); // percentage
  const springX = useSpring(dragX, { stiffness: 300, damping: 30 });
  
  const clipPath = useTransform(springX, (v) => `inset(0 ${100 - v}% 0 0)`);

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = ((clientX - rect.left) / rect.width) * 100;
    
    dragX.set(Math.min(Math.max(x, 0), 100));
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden cursor-ew-resize group select-none border border-white/5"
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0">
        <img src={afterImage} alt="After" className="w-full h-full object-cover grayscale contrast-125" />
        <div className="absolute bottom-6 right-6 text-[9px] font-mono text-white/40 uppercase tracking-widest">{afterLabel}</div>
      </div>

      {/* Before Image (Foreground with Clip) */}
      <motion.div 
        className="absolute inset-0 z-10"
        style={{ clipPath }}
      >
        <img src={beforeImage} alt="Before" className="w-full h-full object-cover grayscale brightness-50" />
        <div className="absolute bottom-6 left-6 text-[9px] font-mono text-white/40 uppercase tracking-widest">{beforeLabel}</div>
      </motion.div>

      {/* Slider Handle */}
      <motion.div 
        className="absolute inset-y-0 z-20 w-px bg-white/40 flex items-center justify-center"
        style={{ left: `${dragX.get()}%` }}
      >
        <div className="w-10 h-10 rounded-full border border-white/20 bg-brand-black flex items-center justify-center backdrop-blur-md">
          <div className="flex gap-1">
            <div className="w-px h-3 bg-white/40" />
            <div className="w-px h-3 bg-white/40" />
          </div>
        </div>
      </motion.div>

      {/* Overlay Instructions */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-500">
        <div className="bg-brand-black/60 px-6 py-3 border border-white/10 text-[9px] font-mono text-white/60 uppercase tracking-[0.4em]">
          Slide to Reveal
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
