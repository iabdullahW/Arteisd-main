import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

interface ParallaxSlicesProps {
  image: string;
  alt?: string;
  slices?: number;
  className?: string;
}

const ParallaxSlices: React.FC<ParallaxSlicesProps> = ({ 
  image, 
  alt = "Project detail", 
  slices = 4,
  className = ""
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Calculate slice heights and offsets
  const sliceHeight = 100 / slices;

  return (
    <div 
      ref={containerRef}
      className={`relative w-full aspect-square md:aspect-video overflow-hidden border border-white/5 bg-brand-black ${className}`}
    >
      {[...Array(slices)].map((_, i) => {
        // Each slice moves at a different speed
        // Speed increases for slices further from the center
        const speed = 10 + (i * 15); 
        const y = useTransform(smoothProgress, [0, 1], [`-${speed}%`, `${speed}%`]);
        
        return (
          <div 
            key={i} 
            className="absolute left-0 w-full overflow-hidden"
            style={{ 
              height: `${sliceHeight}%`, 
              top: `${i * sliceHeight}%` 
            }}
          >
            <motion.div
              style={{ y }}
              className="absolute inset-0 w-full"
              // We need to offset the image inside the slice so they align at rest
              // The image height must be larger than the slice to allow for parallax
            >
              <img 
                src={image} 
                alt={alt}
                className="absolute left-0 w-full grayscale contrast-125 brightness-75 group-hover:brightness-100 transition-all duration-700"
                style={{
                  height: `${slices * 100}%`, // Ensure the image is tall enough
                  top: `-${i * 100}%`, // Align the specific band
                  objectFit: 'cover'
                }}
              />
            </motion.div>
            
            {/* Subtle separator line between slices */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/5 z-20" />
          </div>
        );
      })}
      
      {/* Decorative Label */}
      <div className="absolute bottom-6 right-6 z-30 pointer-events-none">
        <div className="text-[8px] font-mono text-white/20 uppercase tracking-[0.4em] flex items-center gap-3">
          <div className="w-8 h-px bg-white/10" />
          Deconstructed View
        </div>
      </div>
    </div>
  );
};

export default ParallaxSlices;
