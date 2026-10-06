import React, { useEffect, useRef, useCallback } from 'react';

interface SmoothWavyCanvasProps {
  backgroundColor?: string;
  primaryColor?: string; // Expecting "r, g, b"
  secondaryColor?: string;
  accentColor?: string;
  lineOpacity?: number;
  animationSpeed?: number;
}

const SmoothWavyCanvas: React.FC<SmoothWavyCanvasProps> = ({
  backgroundColor = 'transparent',
  primaryColor = '255, 255, 255',
  secondaryColor = '200, 200, 200',
  accentColor = '150, 150, 150',
  lineOpacity = 0.2,
  animationSpeed = 0.003,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestIdRef = useRef<number | null>(null);
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, isDown: false });
  const energyFields = useRef<any[]>([]);

  const getMouseInfluence = (x: number, y: number) => {
    const dx = x - mouseRef.current.x;
    const dy = y - mouseRef.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = 250; // More localized influence
    return Math.max(0, 1 - distance / maxDistance);
  };

  const getEnergyFieldInfluence = (x: number, y: number, currentTime: number) => {
    let totalIntensity = 0;
    let totalDirectionX = 0;
    let totalDirectionY = 0;
    
    energyFields.current.forEach((field) => {
      const age = currentTime - field.time;
      const maxAge = 4000;
      if (age < maxAge) {
        const dx = x - field.x;
        const dy = y - field.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const fieldRadius = (age / maxAge) * 300;
        const fieldWidth = 100;
        if (Math.abs(distance - fieldRadius) < fieldWidth) {
          const fieldStrength = (1 - age / maxAge) * field.intensity;
          const proximityToField = 1 - Math.abs(distance - fieldRadius) / fieldWidth;
          const influence = fieldStrength * proximityToField * 0.6;
          totalIntensity += influence;
          if (distance > 0) {
            totalDirectionX += (dx / distance) * influence;
            totalDirectionY += (dy / distance) * influence;
          }
        }
      }
    });
    
    const direction = Math.atan2(totalDirectionY, totalDirectionX);
    return { intensity: Math.min(totalIntensity, 1), direction };
  };

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
  }, []);

  const handleMouseDown = useCallback(() => {
    mouseRef.current.isDown = true;
  }, []);

  const handleMouseUp = useCallback(() => {
    mouseRef.current.isDown = false;
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentTime = Date.now();
    timeRef.current += animationSpeed;
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const numPrimaryLines = 20; // Reduced for performance
    for (let i = 0; i < numPrimaryLines; i++) {
      const yPos = (i / numPrimaryLines) * height;
      const mouseInfl = getMouseInfluence(width / 2, yPos);
      
      const amplitude = 20 + 15 * Math.sin(timeRef.current * 0.2 + i * 0.1) + mouseInfl * 20;
      const frequency = 0.005 + 0.001 * Math.sin(timeRef.current * 0.1 + i * 0.05);
      const speed = timeRef.current * (0.5 + 0.2 * Math.sin(i * 0.1));
      const thickness = 0.4 + 0.2 * Math.sin(timeRef.current + i * 0.2);
      const opacity = (0.04 + 0.03 * Math.abs(Math.sin(timeRef.current * 0.2 + i * 0.1)) + mouseInfl * 0.1) * lineOpacity;

      ctx.beginPath();
      ctx.lineWidth = thickness;
      ctx.strokeStyle = `rgba(${primaryColor}, ${opacity})`;

      for (let x = 0; x < width; x += 12) { // Increased step size for performance
        const localMouseInfl = getMouseInfluence(x, yPos);
        const y = yPos + amplitude * Math.sin(x * frequency + speed) + localMouseInfl * Math.sin(timeRef.current * 1.5 + x * 0.01) * 15;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    const numSecondaryLines = 15; // Reduced for performance
    for (let i = 0; i < numSecondaryLines; i++) {
      const xPos = (i / numSecondaryLines) * width;
      const mouseInfl = getMouseInfluence(xPos, height / 2);
      
      const amplitude = 15 + 10 * Math.sin(timeRef.current * 0.15 + i * 0.12) + mouseInfl * 15;
      const frequency = 0.006 + 0.002 * Math.cos(timeRef.current * 0.1 + i * 0.07);
      const speed = timeRef.current * (0.4 + 0.2 * Math.cos(i * 0.15));
      const thickness = 0.3 + 0.15 * Math.sin(timeRef.current + i * 0.3);
      const opacity = (0.03 + 0.02 * Math.abs(Math.sin(timeRef.current * 0.25 + i * 0.15)) + mouseInfl * 0.08) * lineOpacity;

      ctx.beginPath();
      ctx.lineWidth = thickness;
      ctx.strokeStyle = `rgba(${secondaryColor}, ${opacity})`;

      for (let y = 0; y < height; y += 12) { // Increased step size for performance
        const localMouseInfl = getMouseInfluence(xPos, y);
        const x = xPos + amplitude * Math.sin(y * frequency + speed) + localMouseInfl * Math.sin(timeRef.current * 1.2 + y * 0.01) * 10;
        if (y === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    requestIdRef.current = requestAnimationFrame(animate);
  }, [backgroundColor, primaryColor, secondaryColor, accentColor, lineOpacity, animationSpeed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    resizeCanvas();
    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      if (requestIdRef.current) cancelAnimationFrame(requestIdRef.current);
    };
  }, [animate, resizeCanvas, handleMouseMove, handleMouseDown, handleMouseUp]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none mix-blend-screen opacity-100" style={{ backgroundColor }}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default SmoothWavyCanvas;
