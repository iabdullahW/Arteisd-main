import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Link } from 'react-router-dom';
import SmoothWavyCanvas from '../components/SmoothWavyCanvas';
import WatermarkText from '../components/ui/WatermarkText';
import FluidGlow from '../components/ui/FluidGlow';
import PageWrapper from '../components/ui/PageWrapper';

const PhilosophyPage = () => {
  const heroRef = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const { scrollYProgress: s1Scroll } = useScroll({
    target: section1Ref,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: s2Scroll } = useScroll({
    target: section2Ref,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: s3Scroll } = useScroll({
    target: section3Ref,
    offset: ["start end", "end start"]
  });

  // Smooth springs for each section
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const smoothHero = useSpring(heroScroll, springConfig);
  const smoothS1 = useSpring(s1Scroll, springConfig);
  const smoothS2 = useSpring(s2Scroll, springConfig);
  const smoothS3 = useSpring(s3Scroll, springConfig);

  const heroY = useTransform(smoothHero, [0, 1], ["0%", "30%"]);
  const s1Y = useTransform(smoothS1, [0, 1], ["-20%", "20%"]);
  const s2Y = useTransform(smoothS2, [0, 1], ["0%", "40%"]);
  const s3Y = useTransform(smoothS3, [0, 1], ["10%", "-10%"]);

  return (
    <PageWrapper className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[90vh] md:h-screen flex items-end overflow-hidden px-6 md:px-16 pb-24">
        <WatermarkText text="MANIFESTO" top="40%" />
        <FluidGlow top="-10%" left="60%" color="rgba(255, 255, 255, 0.12)" size="800px" />
        <FluidGlow top="40%" left="-10%" color="rgba(255, 255, 255, 0.05)" size="600px" />
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover grayscale brightness-50 contrast-125"
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1600"
            alt="Minimalist lounge interior"
          />
          <div className="absolute inset-0 bg-brand-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-90" />
        </motion.div>
        
        <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end">
          <div className="col-span-1 md:col-span-8">
            <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] block mb-6 md:mb-8">Design Manifesto No. 01</span>
            <h1 className="font-display font-light text-[42px] sm:text-[60px] md:text-[110px] lg:text-[140px] leading-[0.9] md:leading-[0.85] text-white tracking-tighter italic">
              HOW WE <br className="hidden md:block" /> <span className="opacity-40 italic">DESIGN SPACE</span>
            </h1>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 mt-8 md:mt-12">
               <p className="font-sans text-[11px] uppercase tracking-widest text-white/40 leading-relaxed max-w-sm">
                Studio Principles // Every space is an orchestration of emotional resonance and physical intention.
              </p>
              <div className="hidden md:block h-[1px] w-24 bg-white/20"></div>
            </div>
          </div>
          <div className="col-span-1 md:col-span-4 flex flex-col items-start md:items-end pb-0 md:pb-4">
             <div className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/20 leading-loose text-left md:text-right">
                COORDINATES: 51.5074 N, 0.1278 W <br/>
                ELEVATION: HIGH CONTRAST MONO
             </div>
          </div>
        </div>
      </section>

      {/* Section 01: Materiality */}
      <section ref={section1Ref} className="py-24 md:py-48 px-6 md:px-16 border-t border-white/5 overflow-hidden relative">
        <SmoothWavyCanvas lineOpacity={0.12} />
        <FluidGlow top="10%" left="60%" size="600px" color="rgba(255, 255, 255, 0.04)" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-center relative z-10">
          <div className="md:col-span-7">
            <div className="relative aspect-square overflow-hidden border border-white/10 group">
              <img 
                className="w-full h-full object-cover grayscale contrast-125 brightness-75 group-hover:brightness-100 transition-all duration-700 hover:scale-105" 
                src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                alt="Architectural texture"
              />
            </div>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="md:col-span-5">
            <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] block mb-6 md:mb-8">01 / Materiality</span>
            <h2 className="font-display italic text-4xl md:text-6xl text-white mb-6 md:mb-10">Material Integrity.</h2>
            <p className="font-sans text-sm text-white/40 leading-relaxed tracking-wider mb-8 md:mb-12">
              Our process begins with the site. Raw concrete, reclaimed timber, natural stone. These are not finishes; they are the fundamental structural and sensory truth of our architecture.
            </p>
            <Link to="/atelier" className="border border-white/20 px-8 py-4 text-[10px] uppercase tracking-[0.3em] text-white/80 hover:bg-white hover:text-black transition-all">
              Our Methodology
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Section 02: Light */}
      <section ref={section2Ref} className="py-24 md:py-48 px-6 md:px-16 border-t border-white/5 bg-brand-surface overflow-hidden relative">
        <SmoothWavyCanvas lineOpacity={0.15} />
        <FluidGlow top="50%" left="20%" size="700px" color="rgba(255, 255, 255, 0.03)" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start mb-16 md:mb-24 gap-8 md:gap-0">
            <div>
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] block mb-4 md:mb-6">02 / Daylighting</span>
              <h2 className="font-display uppercase text-4xl sm:text-5xl md:text-8xl text-white tracking-tighter leading-none">
                Light as a <br className="hidden md:block" /> Design Element.
              </h2>
            </div>
            <p className="font-sans text-[11px] uppercase tracking-widest text-white/40 leading-relaxed max-w-[280px] md:mt-12">
              We engineer natural light as a primary structural and atmospheric tool, defining the emotional volume of every room.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:h-[600px]">
            <div className="md:col-span-8 relative overflow-hidden group border border-white/10 aspect-video md:aspect-auto">
               <img 
                className="w-full h-full object-cover grayscale brightness-50 contrast-125 transition-all duration-700 hover:scale-105" 
                src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&q=80&w=1200" 
                alt="Interior light study"
              />
            </div>
            <div className="md:col-span-4 flex flex-col gap-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex-1 bg-white/[0.05] border border-white/10 overflow-hidden aspect-video md:aspect-auto">
                <img 
                  className="w-full h-full object-cover grayscale opacity-60 mix-blend-luminosity"
                  src="https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&q=80&w=800" 
                  alt="Textural shadow"
                />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
                className="flex-1 bg-brand-black border border-white/5 p-8 md:p-12 flex flex-col justify-center min-h-[200px] md:min-h-0">
                <h3 className="font-display italic text-2xl md:text-3xl text-white mb-4 md:mb-6">Photonic Structure</h3>
                <p className="font-sans text-[11px] uppercase tracking-widest text-white/30 leading-relaxed">
                  The shadow is as vital as the glow. We design for the void where light reveals form.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 03: Human */}
      <section ref={section3Ref} className="py-24 md:py-48 px-6 md:px-16 border-t border-white/5 relative overflow-hidden">
        <SmoothWavyCanvas lineOpacity={0.1} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-display font-light text-white/[0.02] select-none pointer-events-none tracking-tighter uppercase grayscale">
          Human
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center relative z-10">
          <div className="aspect-square bg-white/[0.02] border border-white/10 overflow-hidden group">
            <img 
              className="w-full h-full object-cover grayscale brightness-75 contrast-125 transition-all duration-1000 group-hover:scale-110" 
              src="https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200" 
              alt="Human interaction with interior space"
            />
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="space-y-8 md:space-y-12">
            <div>
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] block mb-4 md:mb-6">03 / Human-Centred Design</span>
              <h2 className="font-display italic text-4xl md:text-6xl text-white leading-tight">The Occupant <br/> as the Focus.</h2>
            </div>
            <p className="font-sans text-sm text-white/40 leading-relaxed tracking-wider max-w-md">
              Every space is calibrated for intuitive movement and ergonomic comfort. We ensure every tactile interaction is an intentional moment of physical and emotional connection.
            </p>
            <div className="space-y-4 md:space-y-6 pt-6 md:pt-8 border-t border-white/5">
              {[
                { id: '01', title: 'Ergonomic Silence' },
                { id: '02', title: 'Intuitive Flow' },
                { id: '03', title: 'Tactile Intimacy' }
              ].map(item => (
                <div key={item.id} className="flex gap-6 md:gap-8 items-center group cursor-pointer">
                  <span className="font-mono text-[9px] text-white/20">{item.id}</span>
                  <span className="font-display italic text-xl md:text-2xl text-white/60 group-hover:text-white transition-colors">{item.title}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-32 md:py-64 bg-brand-surface text-center px-6 md:px-16 border-t border-white/5 relative overflow-hidden">
        <SmoothWavyCanvas lineOpacity={0.15} />
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 md:mb-20 opacity-20 flex justify-center">
             <div className="w-10 md:w-12 h-10 md:h-12 border border-white rounded-full flex items-center justify-center p-2.5 md:p-3">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white w-full h-full">
                 <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" />
                 <path d="M12 18V2" strokeOpacity="0.2"/>
               </svg>
             </div>
          </div>
          <blockquote className="font-display italic font-light text-2xl sm:text-3xl md:text-6xl text-white mb-10 md:mb-16 leading-[1.2] md:leading-[1.1] tracking-tighter px-4">
            "Space is the breath of art. Architecture is the lung."
          </blockquote>
          <cite className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.6em] text-white/30 not-italic font-mono">
            — Elias Vance, Founding Architect
          </cite>
        </div>
      </section>
    </PageWrapper>
  );
};

export default PhilosophyPage;
