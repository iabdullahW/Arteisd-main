import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import PageWrapper from '../components/ui/PageWrapper';
import SmoothWavyCanvas from '../components/SmoothWavyCanvas';

const PressPage = () => {
  const articles = [
    { pub: 'The Architectural Review', date: 'Spring 2026', title: 'Aether Studio: The Subtraction of Noise' },
    { pub: 'Frame Magazine', date: 'Dec 2025', title: 'Designing Intangible Boundaries' },
    { pub: 'Wallpaper*', date: 'Oct 2025', title: 'Next Generation Minimalists: Elias Vance' },
    { pub: 'Azure', date: 'Aug 2025', title: 'Spatial Silence in a Digital Age' }
  ];

  const mediaAssets = [
    { name: 'Monolith Lounge', year: '2024', cat: 'Series 01' },
    { name: 'Sanctuary Suite', year: '2024', cat: 'Series 02' },
    { name: 'Obsidian Culinary', year: '2023', cat: 'Series 03' },
  ];

  return (
    <PageWrapper className="bg-brand-black min-h-screen">
      <SmoothWavyCanvas lineOpacity={0.08} />
      <section className="py-24 px-8 md:px-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
            <div className="md:col-span-8">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em] mb-4 block">Media Center</span>
              <h1 className="text-7xl md:text-9xl font-display font-light italic tracking-tight text-white mb-8">Press Archive</h1>
              <p className="text-xl text-white/60 font-light max-w-xl leading-relaxed italic">
                A collection of external narratives, structural inquiries, and curated assets for media distribution.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-24">
          <div className="md:col-span-4 h-fit sticky top-32">
            <h3 className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-12 border-b border-white/10 pb-4">Media Kit</h3>
            <p className="text-sm text-white/40 mb-8 leading-relaxed">
              Download our high-resolution archival package including studio manifestos, principal photography, and brand identity guidelines.
            </p>
            <button className="group flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-white border border-white/10 px-8 py-4 hover:bg-white hover:text-brand-black transition-all duration-500 w-full justify-between">
              Download kit [640mb]
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="md:col-span-8">
            <h3 className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-12 border-b border-white/10 pb-4">Selected Features</h3>
            <div className="space-y-16">
              {articles.map((item, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <div className="flex justify-between items-end mb-4 overflow-hidden">
                    <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">{item.pub}</span>
                    <span className="text-[9px] font-mono text-white/20">{item.date}</span>
                  </div>
                  <h2 className="text-3xl font-display font-light text-white group-hover:italic transition-all duration-500">{item.title}</h2>
                  <div className="h-px bg-white/5 mt-8 group-hover:bg-white/20 transition-colors" />
                </div>
              ))}
            </div>

            <h3 className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-12 border-b border-white/10 pb-4 mt-32">Photography Assets</h3>
            <div className="grid grid-cols-2 gap-4">
              {mediaAssets.map((asset, idx) => (
                <div key={idx} className="group relative aspect-video bg-white/[0.02] border border-white/5 overflow-hidden">
                  <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-brand-black/60">
                    <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest mb-2">{asset.cat}</span>
                    <h4 className="text-sm font-display text-white italic">{asset.name}</h4>
                  </div>
                  <div className="w-full h-full bg-white/[0.05]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] font-mono text-white/10">PREVIEW FILE</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default PressPage;
