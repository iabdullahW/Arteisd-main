import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SmoothWavyCanvas from '../components/SmoothWavyCanvas';
import FluidGlow from '../components/ui/FluidGlow';
import PageWrapper from '../components/ui/PageWrapper';
import BeforeAfterSlider from '../components/editorial/BeforeAfterSlider';
import ProcessTimeline from '../components/editorial/ProcessTimeline';
import EditorialQuote from '../components/editorial/EditorialQuote';
import RelatedWork from '../components/editorial/RelatedWork';

const AtelierPage = () => {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const smoothHero = useSpring(heroScroll, { stiffness: 100, damping: 30 });
  const heroY = useTransform(smoothHero, [0, 1], ["0%", "20%"]);

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[90vh] md:h-screen flex items-end overflow-hidden px-6 md:px-16 pb-20 md:pb-24">
        <FluidGlow top="-20%" left="10%" size="700px" color="rgba(255, 255, 255, 0.1)" />
        <motion.div style={{ y: heroY }} className="absolute right-0 top-0 w-full md:w-2/3 h-full z-0 overflow-hidden">
          <img 
            className="w-full h-full object-cover grayscale brightness-50"
            src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Studio workspace"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-brand-black/20 to-brand-black" />
        </motion.div>
        
        <div className="relative z-10 w-full md:w-1/2">
          <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] block mb-8 underline underline-offset-8">Our Design Process</span>
          <h1 className="font-display font-light text-[64px] md:text-[140px] leading-[0.85] text-white tracking-tighter italic">
            Atelier
          </h1>
          <div className="mt-12 max-w-sm">
            <p className="font-sans text-[11px] uppercase tracking-widest text-white/40 leading-relaxed">
              Rigorous research, precise execution, and material integrity from brief to build. Our workspace is a living laboratory for structural exploration.
            </p>
            <div className="mt-12 flex flex-col gap-4">
              <div className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/20">
                COORDINATES: 40.7128 N, 74.0060 W <br/>
                SCALE: 1:50
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Meta Section */}
      <section className="py-24 md:py-48 px-6 md:px-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 text-center md:text-left">
            <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] block mb-6">Metamorphosis</span>
            <h2 className="text-4xl md:text-6xl font-display italic text-white tracking-tighter">Design Concept vs Built Reality.</h2>
          </div>
          <BeforeAfterSlider 
            beforeImage="https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1200"
            afterImage="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200"
            beforeLabel="The Concept"
            afterLabel="The Reality"
          />
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 md:py-48 px-6 md:px-16 bg-white/[0.01] relative overflow-hidden">
        <SmoothWavyCanvas lineOpacity={0.05} />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32">
             <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] block mb-6">Methodology</span>
             <h2 className="text-4xl md:text-7xl font-display italic text-white tracking-tighter">Research → Refinement → Realisation.</h2>
          </div>
          <ProcessTimeline />
        </div>
      </section>

      {/* Editorial Quote */}
      <EditorialQuote 
        quote="Aether doesn't just build rooms; they curate silence. The final space feels less like a structure and more like a breath of fresh air."
        author="Julianna Moretti"
        role="Principal at Moretti Fine Arts"
      />

      {/* Related Projects */}
      <RelatedWork />
    </PageWrapper>
  );
};

export default AtelierPage;
