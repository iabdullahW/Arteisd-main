import React from 'react';
import { motion } from 'motion/react';

interface TimelineStep {
  phase: string;
  title: string;
  description: string;
  meta: string;
}

const steps: TimelineStep[] = [
  { phase: '01', title: 'Conceptual Synthesis', description: 'Deep immersion into the client intent, site context, and material possibilities.', meta: 'Duration: 4 Weeks' },
  { phase: '02', title: 'Structural Narrative', description: 'Drafting the architectural logic and defining the circulation of light and air.', meta: 'Duration: 6 Weeks' },
  { phase: '03', title: 'Visceral Materiality', description: 'Selection of textures, grains, and finishes that resonate with the human touch.', meta: 'Duration: 3 Weeks' },
  { phase: '04', title: 'Spatial Realization', description: 'Construction oversight and precise curation of the final atmospheric layers.', meta: 'Duration: 12 Months' },
];

const ProcessTimeline = () => {
  return (
    <div className="py-24 relative">
      <div className="max-w-5xl mx-auto">
        <div className="relative border-l border-white/10 ml-4 md:ml-0 md:border-l-0">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="relative pl-12 md:pl-0 md:grid md:grid-cols-12 gap-12 mb-24 last:mb-0 group"
            >
              {/* Dot & Line (Mobile) */}
              <div className="absolute left-0 top-2 w-2 h-2 rounded-full border border-white/40 bg-brand-black md:hidden" />
              
              {/* Desktop Phase & Meta */}
              <div className="hidden md:flex md:col-span-4 flex-col items-end pt-2">
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.5em] mb-4 group-hover:text-white/60 transition-colors">{step.phase}</span>
                <span className="text-[9px] font-mono text-white/10 uppercase tracking-widest">{step.meta}</span>
              </div>

              {/* Vertical Divider (Desktop) */}
              <div className="hidden md:flex md:col-span-1 justify-center relative">
                <div className="w-px h-full bg-white/5 group-hover:bg-white/20 transition-colors" />
                <div className="absolute top-2 w-2 h-2 rounded-full border border-white/20 bg-brand-black group-hover:border-white transition-colors" />
              </div>

              {/* Content */}
              <div className="md:col-span-7">
                <h3 className="font-display italic text-3xl text-white mb-6 tracking-tight group-hover:translate-x-2 transition-transform duration-700">
                  {step.title}
                </h3>
                <p className="font-sans text-[11px] uppercase tracking-widest text-white/40 leading-relaxed max-w-md">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessTimeline;
