import React from 'react';
import { motion } from 'motion/react';

interface FluidGlowProps {
  color?: string;
  size?: string;
  top?: string;
  left?: string;
  duration?: number;
}

const FluidGlow: React.FC<FluidGlowProps> = ({ 
  color = "rgba(255, 255, 255, 0.08)", 
  size = "600px", 
  top = "20%", 
  left = "20%", 
  duration = 25 
}) => {
  return (
    <motion.div
      animate={{
        x: [0, 50, -30, 0],
        y: [0, -30, 50, 0],
        scale: [1, 1.1, 0.95, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute pointer-events-none z-0 mix-blend-screen overflow-hidden"
      style={{
        width: size,
        height: size,
        top,
        left,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: "blur(100px)",
      }}
    />
  );
};

export default FluidGlow;
