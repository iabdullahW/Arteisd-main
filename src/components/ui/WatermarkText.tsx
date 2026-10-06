import React from 'react';

interface WatermarkTextProps {
  text: string;
  top?: string;
  left?: string;
  rotate?: number;
}

const WatermarkText: React.FC<WatermarkTextProps> = ({ text, top = "50%", left = "50%", rotate = 0 }) => (
  <div 
    className="absolute pointer-events-none z-0 select-none overflow-hidden whitespace-nowrap w-full"
    style={{ 
      top, 
      left, 
      transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
    }}
  >
    <span className="font-display uppercase text-[18vw] leading-none text-white/[0.02] block text-center tracking-tighter">
      {text}
    </span>
  </div>
);

export default WatermarkText;
