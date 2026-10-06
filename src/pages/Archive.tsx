import React from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import SmoothWavyCanvas from '../components/SmoothWavyCanvas';
import WatermarkText from '../components/ui/WatermarkText';
import FluidGlow from '../components/ui/FluidGlow';
import PageWrapper from '../components/ui/PageWrapper';
import ParallaxSlices from '../components/editorial/ParallaxSlices';

const ArchivePage = () => {
  const archives = [
    { id: 'AX-092', year: '2026', name: 'Monolith Lounge', cat: 'Living Space', img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=800' },
    { id: 'AX-104', year: '2026', name: 'Quietude Suite', cat: 'Bedroom', img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800' },
    { id: 'AX-211', year: '2025', name: 'Obsidian Culinary', cat: 'Kitchen', img: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=800' },
    { id: 'AX-085', year: '2025', name: 'Marble Sanctuary', cat: 'Bathroom', img: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=800' },
    { id: 'AX-072', year: '2024', name: 'Velvet Void', cat: 'Lounge', img: 'https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=1200' },
    { id: 'AX-064', year: '2024', name: 'Quartz Dining', cat: 'Dining Room', img: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200' },
  ];

  const floatingImages = [
    { src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=600", className: "w-64 aspect-square top-[10%] left-[8%] hidden lg:block", delay: 0.2 },
    { src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=600", className: "w-80 aspect-[4/3] top-[20%] right-[10%] hidden lg:block", delay: 0.4 },
    { src: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=800", className: "w-[400px] aspect-square bottom-[-10%] left-1/2 -translate-x-1/2 z-20 hidden md:block", delay: 0.6 },
  ];

  return (
    <PageWrapper className="min-h-screen">
      <section className="relative h-[90vh] md:h-screen flex flex-col items-center justify-center overflow-hidden px-6 md:px-16 border-b border-white/5 bg-brand-black">
        <WatermarkText text="THE.ARCHIVE" top="40%" />
        <FluidGlow top="10%" left="20%" size="800px" color="rgba(255, 255, 255, 0.05)" />
        
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          {floatingImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 1.05 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.5, delay: img.delay, ease: [0.22, 1, 0.36, 1] }}
              className={`absolute overflow-hidden grayscale brightness-75 contrast-125 border border-white/10 ${img.className}`}
            >
              <img src={img.src} alt="" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mb-6 flex flex-col items-center gap-2"
          >
            <div className="w-4 h-4 text-white/40 flex items-center justify-center">
              <Plus className="w-4 h-4 rotate-45" />
            </div>
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.5em] italic">Project Index (06)</span>
          </motion.div>

          <h1 className="text-white font-display text-[50px] sm:text-7xl md:text-[110px] lg:text-[140px] leading-[0.9] tracking-tighter flex flex-col items-center">
            <motion.span 
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              The Complete
            </motion.span>
            <motion.span 
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="flex items-center gap-4 md:gap-6"
            >
              Project Archive <span className="text-[0.6em] italic font-light font-display lowercase opacity-60">of</span>
            </motion.span>
            <motion.span 
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-2"
            >
              Aether Studio
            </motion.span>
          </h1>
        </div>
      </section>

      <section className="py-24 md:py-48 px-6 md:px-16 relative overflow-hidden">
        <SmoothWavyCanvas lineOpacity={0.15} />
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 border-b border-white/5 pb-8 gap-4">
            <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em]">Index (06)</span>
            <span className="text-[12px] text-white/60 font-light italic">Sorted chronologically</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 md:gap-y-24 gap-x-12 relative z-10">
            {archives.map((item, idx) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group md:cursor-none"
                data-cursor-hover
                data-cursor-text="View"
              >
                <div className="aspect-[4/5] overflow-hidden border border-white/10 mb-6 md:mb-8 relative">
                  <img 
                    src={item.img} 
                    alt={item.name}
                    className="w-full h-full object-cover grayscale brightness-50 contrast-125 group-hover:scale-105 transition-transform duration-[2s]"
                  />
                  <div className="absolute top-4 md:top-6 right-4 md:right-6 font-mono text-[9px] text-white/40 tracking-widest uppercase">
                    {item.year}
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-[9px] font-mono text-white/20 uppercase tracking-widest mb-2">{item.cat} // {item.id}</div>
                    <h3 className="font-display italic text-2xl md:text-3xl text-white group-hover:translate-x-2 transition-transform duration-500">{item.name}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default ArchivePage;
