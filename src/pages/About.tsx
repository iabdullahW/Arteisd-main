import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import PageWrapper from '../components/ui/PageWrapper';
import SmoothWavyCanvas from '../components/SmoothWavyCanvas';
import FluidGlow from '../components/ui/FluidGlow';
import WatermarkText from '../components/ui/WatermarkText';

const team = [
  {
    name: 'Elias Vance',
    role: 'Founding Architect',
    bio: 'Architect and author of the minimalist "Silent Structure" design methodology.',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    name: 'Sarah Chen',
    role: 'Principal Designer',
    bio: 'Specialist in tactile material selection and sensory interior design.',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    name: 'Marcus Thorne',
    role: 'Structural Lead',
    bio: 'Expert in structural engineering and natural daylighting systems.',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

const milestones = [
  { year: '2024', event: 'Studio established in London, United Kingdom.', detail: 'Founded with a focus on material honesty and structural clarity.' },
  { year: '2025', event: 'Named Minimalist Architecture Firm of the Year.', detail: 'Recognized for pioneering light-driven interior systems.' },
  { year: '2026', event: 'International studios opened in Tokyo and Berlin.', detail: 'Global expansion to bring the Aether aesthetic to new contexts.' },
];

const TypewriterRole = ({ text }: { text: string }) => {
  return (
    <div className="overflow-hidden">
      <motion.p
        className="font-mono text-[9px] uppercase tracking-[0.5em] text-white/30"
      >
        {text.split('').map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, filter: 'blur(5px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ 
              duration: 0.1, 
              delay: i * 0.05,
              ease: "easeOut"
            }}
            viewport={{ once: true }}
          >
            {char}
          </motion.span>
        ))}
      </motion.p>
    </div>
  );
};

const TeamMember = ({ member, index }: { member: typeof team[0], index: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, index % 2 === 0 ? -100 : 100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, index % 2 === 0 ? 5 : -5]);
  const smoothY = useSpring(y, { stiffness: 50, damping: 20 });
  const smoothRotate = useSpring(rotate, { stiffness: 50, damping: 20 });

  return (
    <motion.div 
      ref={ref}
      style={{ y: smoothY, rotate: smoothRotate }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="relative aspect-[3/4] overflow-hidden mb-10 border border-white/5 grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out">
        <motion.img 
          src={member.image} 
          alt={member.name} 
          className="w-full h-full object-cover brightness-50 group-hover:brightness-90 group-hover:scale-110 transition-all duration-[2s]"
        />
        
        {/* Hover Reveal Overlay */}
        <AnimatePresence>
          <div className="absolute inset-0 bg-brand-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-8 backdrop-blur-[2px]">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="h-px w-12 bg-white/20" />
              <p className="text-[10px] font-sans text-white/70 uppercase tracking-widest leading-loose">
                {member.bio}
              </p>
            </motion.div>
          </div>
        </AnimatePresence>
      </div>

      <div className="space-y-4">
        <TypewriterRole text={member.role} />
        <h3 className="text-3xl font-display italic text-white tracking-tighter group-hover:translate-x-4 transition-transform duration-1000">
          {member.name}
        </h3>
      </div>
    </motion.div>
  );
};

const AboutPage = () => {
  const manifestoRef = useRef(null);
  const { scrollYProgress: manifestoScroll } = useScroll({
    target: manifestoRef,
    offset: ["start end", "end start"]
  });

  const manifestoOpacity = useTransform(manifestoScroll, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const manifestoScale = useTransform(manifestoScroll, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  return (
    <PageWrapper className="bg-brand-black min-h-screen">
      <SmoothWavyCanvas lineOpacity={0.06} />
      
      {/* Cinematic Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden px-6 md:px-16">
        <WatermarkText text="THE.HUMAN" top="45%" />
        <FluidGlow top="15%" left="25%" size="900px" color="rgba(255, 255, 255, 0.05)" />
        
        <div className="relative z-10 text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.4em]">Studio</span>
            <div className="w-8 h-px bg-white/10" />
            <span className="text-[9px] font-mono text-white uppercase tracking-[0.4em]">About / Team</span>
          </motion.div>
          
          <h1 className="text-6xl md:text-[160px] font-display font-light italic text-white tracking-tighter leading-[0.85] mb-16">
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              The Studio
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="block opacity-40"
            >
              Behind Aether.
            </motion.span>
          </h1>
          
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: 120 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="w-px bg-gradient-to-b from-white/40 to-transparent mx-auto" 
          />
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="flex flex-col items-center gap-4">
            <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-white/20">
              Scroll
            </span>
            <div className="h-12 w-px bg-white/10" />
          </div>
        </motion.div>
      </section>

      {/* Floating Team Gallery */}
      <section className="py-32 md:py-64 px-6 md:px-16 border-t border-white/5 bg-brand-surface/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 md:gap-24 lg:gap-32">
            {team.map((member, idx) => (
              <TeamMember key={idx} member={member} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto Scroll Section */}
      <section ref={manifestoRef} className="py-48 md:py-96 px-6 md:px-16 relative bg-white/[0.01]">
        <motion.div 
          style={{ opacity: manifestoOpacity, scale: manifestoScale }}
          className="max-w-4xl mx-auto sticky top-1/2 -translate-y-1/2"
        >
          <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em] block mb-12 underline underline-offset-[12px] decoration-white/10">Our Manifesto</span>
          <div className="space-y-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="group"
            >
              <h2 className="text-4xl md:text-7xl font-display italic text-white mb-8 leading-tight tracking-tighter">01 / Restraint as <br/> the Foundation.</h2>
              <p className="font-sans text-[12px] uppercase tracking-[0.3em] text-white/40 leading-[2.5] max-w-xl">
                Restraint as the Foundation of Design. We believe that true luxury lies in the subtraction of the unnecessary to reveal the essential.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="group"
            >
              <h2 className="text-4xl md:text-7xl font-display italic text-white mb-8 leading-tight tracking-tighter">02 / Meaning in <br/> Every Material.</h2>
              <p className="font-sans text-[12px] uppercase tracking-[0.3em] text-white/40 leading-[2.5] max-w-xl">
                Every Material Carries Meaning. We select materials for their narrative potential and their ability to age with grace and integrity.
              </p>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none" />
      </section>

      {/* Milestone Timeline */}
      <section className="py-32 md:py-64 px-6 md:px-16 border-t border-white/5 relative overflow-hidden">
        <FluidGlow top="40%" left="70%" size="600px" color="rgba(255, 255, 255, 0.03)" />
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-32"
          >
            <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.6em] block mb-4">Evolution</span>
            <h2 className="text-5xl md:text-7xl font-display italic text-white tracking-tighter">Studio Milestones</h2>
          </motion.div>
          
          <div className="w-full relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent" />
            
            <div className="space-y-24 md:space-y-48">
              {milestones.map((m, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col md:flex-row items-center ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-24`}
                >
                  <div className={`w-full md:w-1/2 ${idx % 2 === 0 ? 'text-left md:text-right' : 'text-left'} pl-8 md:pl-0`}>
                    <span className="text-4xl md:text-6xl font-mono text-white/10 mb-4 block group-hover:text-white/60 transition-colors">{m.year}</span>
                    <h4 className="text-2xl md:text-4xl font-display italic text-white tracking-tight mb-4">{m.event}</h4>
                    <p className="font-sans text-[10px] uppercase tracking-widest text-white/30 max-w-xs ml-auto mr-0">{m.detail}</p>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-1/2 top-12 -translate-x-1/2 w-3 h-3 rounded-full bg-brand-black border border-white/40 z-10 group-hover:border-white transition-colors" />
                  
                  <div className="hidden md:block w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Contact Teaser */}
      <section className="py-32 px-6 text-center border-t border-white/5">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em] block mb-8">Ready to start a project?</span>
          <h2 className="text-4xl md:text-6xl font-display italic text-white mb-12">Let's build silence together.</h2>
          <div className="w-12 h-px bg-white/20 mx-auto" />
        </motion.div>
      </section>
    </PageWrapper>
  );
};

export default AboutPage;
