import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SmoothWavyCanvas from '../components/SmoothWavyCanvas';
import WatermarkText from '../components/ui/WatermarkText';
import FluidGlow from '../components/ui/FluidGlow';
import Counter from '../components/ui/Counter';
import PageWrapper from '../components/ui/PageWrapper';

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const y = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={ref} className="relative min-h-[90vh] md:h-screen flex items-end overflow-hidden px-6 md:px-16 pb-20 md:pb-24 bg-brand-black">
      <WatermarkText text="AETHER.STUDIO" top="40%" />
      <FluidGlow top="-10%" left="60%" color="rgba(255, 255, 255, 0.12)" size="800px" />
      <FluidGlow top="40%" left="-10%" color="rgba(255, 255, 255, 0.05)" size="600px" />
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <img 
          className="w-full h-full object-cover grayscale brightness-50 contrast-125"
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1600"
          alt="Modern interior design"
        />
        <div className="absolute inset-0 bg-brand-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-90" />
      </motion.div>
      <div className="relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end">
          <div className="col-span-1 md:col-span-8">
            <div className="text-[10px] md:text-[11px] uppercase tracking-[0.6em] text-white/30 mb-6 md:mb-8">Edition 12 // London</div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-light text-[38px] sm:text-[60px] md:text-[90px] lg:text-[110px] leading-[0.9] md:leading-[0.85] text-white tracking-tighter italic lg:-ml-6 mb-8"
              style={{ fontFamily: "'Noto Serif', serif" }}
              data-cursor-text="Aether"
            >
              AWARD-WINNING <br className="hidden md:block" /> <span className="opacity-40 italic md:ml-32">MINIMALIST ARCHITECTURE.</span>
            </motion.h1>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 mt-8 md:mt-12">
               <p className="font-sans text-[11px] uppercase tracking-widest text-white/40 leading-relaxed max-w-sm">
                London-based boutique architecture studio specialising in bespoke residential design, raw materiality, and light-driven interiors.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 right-16 z-20 hidden md:block"
      >
        <a 
          href="#philosophy" 
          className="flex flex-col items-center gap-6 group"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('philosophy')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-white/20">
            Explore Our Work
          </span>
          <div className="h-24 w-px bg-white/10 group-hover:bg-white/40 transition-all duration-700 relative overflow-hidden">
             <motion.div 
                animate={{ y: [0, 96] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-full h-8 bg-white/40"
             />
          </div>
        </a>
      </motion.div>
    </section>
  );
};

const Philosophy = () => (
  <section id="philosophy" className="py-24 md:py-48 px-6 md:px-16 bg-brand-surface border-t border-white/5 relative overflow-hidden">
    <SmoothWavyCanvas lineOpacity={0.15} backgroundColor="transparent" primaryColor="255, 255, 255" />
    <WatermarkText text="THE SOUL.SPACE" top="50%" />
    <FluidGlow top="20%" left="10%" size="500px" color="rgba(255, 255, 255, 0.05)" />
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-start relative z-10">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      >
        <span className="text-[11px] uppercase tracking-[0.6em] text-white/30 block mb-8 md:mb-12">OUR APPROACH // TO SPACE</span>
        <h2 className="font-display italic font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-8 md:mb-12 lg:mb-16 text-white leading-[1.1]">Architecture defined by restraint and intention.</h2>
        <p className="font-sans text-base lg:text-lg font-light text-white/40 mb-10 md:mb-12 lg:mb-16 leading-relaxed max-w-lg">
          We design spaces that communicate through material honesty and considered light. Our process prioritises raw concrete, natural timber, and structural clarity to create environments built for lasting impact.
        </p>
        <Link to="/philosophy" className="font-sans text-[10px] lg:text-[11px] uppercase tracking-widest border-b border-white/20 pb-2 hover:border-white transition-all inline-flex items-center gap-4">
          Read Our Manifesto <ArrowRight size={14} className="text-white/40" />
        </Link>
        <div className="pt-12 md:pt-16 border-t border-white/5 flex gap-12 md:gap-24">
          {[
            { value: 12, suffix: '+', label: 'Global Awards' },
            { value: 85, label: 'Bespoke Spaces' }
          ].map(stat => (
            <div key={stat.label}>
              <span className="font-display italic text-4xl md:text-5xl block text-white mb-3">
                <Counter target={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-white/20">{stat.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
        className="relative pt-12"
      >
        <div className="aspect-[3/4] bg-white/[0.02] overflow-hidden group border border-white/10">
          <img 
            className="w-full h-full object-cover grayscale brightness-50 contrast-125 transition-transform duration-[3s] group-hover:scale-110" 
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200"
            alt="Interior staircase"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute -bottom-6 md:-bottom-10 -left-6 md:-left-10 p-8 md:p-12 bg-black border border-white/10 backdrop-blur-xl max-w-[240px] md:max-w-[280px]">
          <span className="font-display italic font-light text-lg md:text-xl tracking-tight text-white/80 block">
            "Shadow is the only <br/> scale that matters."
          </span>
        </div>
      </motion.div>
    </div>
  </section>
);

const Portfolio = () => (
  <section id="portfolio" className="py-24 md:py-32 bg-brand-black px-6 md:px-16 border-t border-white/5 relative overflow-hidden">
    <SmoothWavyCanvas lineOpacity={0.1} />
    <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-0">
      <div>
        <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] block mb-4 md:mb-6">FEATURED // PROJECTS</span>
        <h2 className="text-4xl md:text-8xl font-display font-light italic text-white tracking-tighter leading-none">
          Selected <br className="hidden md:block" /> Works.
        </h2>
      </div>
      <Link to="/archive" className="font-sans text-[11px] uppercase tracking-widest border-b border-white/20 pb-2 hover:border-white transition-all whitespace-nowrap">
        View All Projects
      </Link>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      {[
        { 
          id: 'AX-092', 
          type: 'Curated Living', 
          name: 'The Monolith Lounge', 
          coords: '40.7128° N, 74.0060° W',
          img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=800',
          color: '#8B4513'
        },
        { 
          id: 'AX-104', 
          type: 'Quietude Series', 
          name: 'Sanctuary Suite',
          coords: '45.4642° N, 9.1900° E',
          img: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=800',
          color: '#2F4F4F'
        },
        { 
          id: 'AX-211', 
          type: 'Culinary Craft', 
          name: 'Obsidian Kitchen',
          coords: '51.5074° N, 0.1278° W',
          img: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=800',
          color: '#1A1A1A'
        }
      ].map((project, idx) => (
        <motion.div 
          key={project.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: idx * 0.2 }}
          viewport={{ once: true }}
          className="group relative h-[500px] md:h-[600px] overflow-hidden md:cursor-none"
          data-cursor-hover
          data-cursor-text="Explore"
        >
          <div className="absolute inset-0 border border-white/10 z-20 pointer-events-none" />
          <img 
            className="w-full h-full object-cover grayscale brightness-50 contrast-125 transition-all duration-1000 group-hover:scale-110 group-hover:brightness-90 group-hover:grayscale-0" 
            src={project.img}
            alt={project.name}
          />
          
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 z-10 backdrop-blur-md"
            style={{ 
              background: `radial-gradient(circle at center, ${project.color}33 0%, rgba(0,0,0,0.85) 100%)` 
            }}
          />
          
          <div className="absolute inset-0 z-30 p-8 md:p-12 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="font-mono text-[9px] text-white/20 tracking-[0.2em] uppercase transition-all duration-500 group-hover:text-white/60 group-hover:translate-y-2">
                {project.id} // SECURE ARCHIVE
              </div>
              <div className="font-mono text-[9px] text-white/20 tracking-[0.2em] uppercase transition-all duration-500 group-hover:text-white group-hover:translate-y-2 md:opacity-0 group-hover:opacity-100">
                {project.coords}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center flex-grow md:opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-8 group-hover:translate-y-0 text-center">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.5em] mb-4">Location Data</span>
              <div className="text-white text-2xl md:text-3xl font-light tracking-[0.1em] mb-2">{project.coords.split(',')[0]}</div>
              <div className="text-white text-2xl md:text-3xl font-light tracking-[0.1em] mb-8">{project.coords.split(',')[1]}</div>
              <div className="w-12 h-px bg-white/20 mb-8" />
              <div className="text-white/60 text-[10px] uppercase font-mono tracking-widest">{project.type}</div>
            </div>

            <div className="transition-all duration-700 transform translate-y-0 group-hover:translate-y-[-10px]">
              <div className="text-[10px] uppercase tracking-widest text-white/50 mb-3 font-mono group-hover:text-white/80 transition-colors">0{idx + 1} // INDEX</div>
              <div className="text-3xl md:text-4xl font-light italic font-display text-white transition-all duration-700 group-hover:tracking-tight">{project.name}</div>
            </div>
          </div>

          <div className="absolute inset-0 bg-white/[0.03] pointer-events-none z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        </motion.div>
      ))}
    </div>
  </section>
);

const Craft = () => (
  <section id="atelier" className="py-24 md:py-48 px-6 md:px-16 bg-brand-black border-t border-white/5 relative overflow-hidden">
    <SmoothWavyCanvas lineOpacity={0.1} />
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-32">
      <div className="md:w-1/3">
        <div className="text-[10px] uppercase font-mono text-white/30 tracking-[0.4em] block mb-8">Process // Methodology</div>
        <h2 className="font-display italic font-light text-[56px] md:text-[80px] text-white leading-none md:sticky md:top-32 lg:-ml-4">The Craft.</h2>
      </div>
      <div className="md:w-2/3 space-y-20 md:space-y-32">
        {[
          { 
            num: 'I', 
            title: 'Spatial Curation', 
            desc: 'We analyze the genetic makeup of a site, understanding its movement, shadows, and acoustic profile before a single line is drawn.' 
          },
          { 
            num: 'II', 
            title: 'Material Alchemy', 
            desc: 'Experimenting with raw stone, oxidized metals, and glass to create textures that demand tactile engagement.' 
          },
          { 
            num: 'III', 
            title: 'Bespoke Atelier', 
            desc: 'Custom furniture and lighting design integrated seamlessly into the architectural envelope.' 
          }
        ].map((item, idx) => (
          <motion.div 
            key={item.num} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
            viewport={{ once: true }}
            className="flex gap-8 md:gap-16 items-start border-b border-white/5 pb-16 md:pb-20 last:border-0"
          >
            <span className="font-mono text-[11px] text-white/30 pt-3">{item.num}</span>
            <div>
              <h3 className="font-display text-3xl md:text-4xl mb-6 md:mb-8 text-white font-light italic">{item.title}</h3>
              <p className="font-sans text-lg text-white/40 max-w-xl font-light leading-relaxed tracking-wider">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Testimonial = () => (
  <section className="py-24 md:py-48 bg-brand-surface relative overflow-hidden px-6 md:px-16 border-y border-white/5">
    <SmoothWavyCanvas lineOpacity={0.08} />
    <div className="max-w-5xl mx-auto text-center relative z-10">
      <div className="mb-12 md:mb-20 opacity-20">
        <div className="w-10 h-10 rounded-full border border-white mx-auto flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
        </div>
      </div>
      <motion.blockquote 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="font-display italic font-light text-3xl md:text-[64px] text-white mb-12 md:mb-20 leading-[1.2] md:leading-[1.1] tracking-tighter"
      >
        "Aether Studio doesn't just design rooms; they orchestrate silence and drama in a way that feels timeless yet radical."
      </motion.blockquote>
      <div className="flex flex-col items-center">
        <div className="h-px w-20 bg-white/20 mb-8 md:mb-10" />
        <cite className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] md:tracking-[0.6em] text-white/30 not-italic font-mono">
          Adrian Thorne // Curator
        </cite>
      </div>
    </div>
    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_white_0%,_transparent_100%)] opacity-[0.02]" />
  </section>
);

const Contact = () => (
  <section id="contact" className="py-32 md:py-64 px-6 md:px-16 text-center bg-brand-black relative overflow-hidden">
    <SmoothWavyCanvas lineOpacity={0.15} />
    <FluidGlow top="30%" left="15%" size="500px" color="rgba(255, 255, 255, 0.06)" />
    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
      className="relative z-10"
    >
      <div className="text-[11px] uppercase tracking-[0.6em] text-white/30 block mb-8 md:mb-12">CONTACT // ENQUIRIES</div>
      <h2 className="font-display italic font-light text-4xl md:text-7xl mb-12 md:mb-20 text-white leading-[1.1]">Begin your project.</h2>
      <p className="font-sans text-lg md:text-xl font-light text-white/40 mb-12 md:mb-20 leading-relaxed max-w-xl mx-auto">
        Tell us your vision. We'll design the space to match.
      </p>
      <Link to="/contact" className="group font-sans text-[12px] uppercase tracking-[0.3em] bg-white text-black px-12 py-5 rounded-full hover:bg-white/90 transition-all inline-flex items-center gap-6">
        Get in Touch <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
      </Link>
      <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-32 mt-24">
        {[
          { label: 'New Projects', value: 'studio@aether.com' },
          { label: 'Press & Inquiries', value: '+44 (0) 20 7946 0122' }
        ].map(contact => (
          <div key={contact.label} className="group cursor-pointer">
            <span className="text-[10px] uppercase font-mono tracking-widest block mb-4 text-white/20">{contact.label}</span>
            <div className="flex flex-col items-center">
              <p className="font-display italic text-2xl md:text-3xl text-white font-light">
                {contact.value}
              </p>
              <div className="w-0 h-px bg-white mt-4 group-hover:w-full transition-all duration-700 opacity-40" />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  </section>
);

const HomePage = () => (
  <PageWrapper>
    <Hero />
    <Philosophy />
    <Portfolio />
    <Craft />
    <Testimonial />
    <Contact />
  </PageWrapper>
);

export default HomePage;
