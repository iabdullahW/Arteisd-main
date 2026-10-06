import React from 'react';
import { motion } from 'motion/react';

interface EditorialQuoteProps {
  quote: string;
  author: string;
  role: string;
}

const EditorialQuote: React.FC<EditorialQuoteProps> = ({ quote, author, role }) => {
  return (
    <div className="py-32 px-6 md:px-16 overflow-hidden relative border-y border-white/5 bg-white/[0.01]">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.8em] block mb-12">Client Testament</span>
          <blockquote className="font-display italic font-light text-3xl sm:text-4xl md:text-6xl text-white mb-16 leading-[1.1] tracking-tighter">
            "{quote}"
          </blockquote>
          <div className="flex flex-col items-center">
            <div className="w-12 h-px bg-white/20 mb-8" />
            <cite className="not-italic">
              <span className="block font-sans text-xs uppercase tracking-[0.3em] text-white mb-2">{author}</span>
              <span className="block font-mono text-[9px] uppercase tracking-widest text-white/30">{role}</span>
            </cite>
          </div>
        </motion.div>
      </div>

      {/* Decorative background mark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-display italic text-white/[0.02] pointer-events-none select-none z-0">
        Resonance
      </div>
    </div>
  );
};

export default EditorialQuote;
