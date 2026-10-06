import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface Project {
  title: string;
  category: string;
  year: string;
  image: string;
  link: string;
}

const projects: Project[] = [
  { title: 'Velvet Void', category: 'Residential', year: '2026', image: 'https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=800', link: '/archive' },
  { title: 'Quartz Dining', category: 'Commercial', year: '2025', image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800', link: '/archive' },
  { title: 'Textile Curation', category: 'Studio', year: '2025', image: 'https://images.pexels.com/photos/6444228/pexels-photo-6444228.jpeg?auto=compress&cs=tinysrgb&w=800', link: '/archive' },
];

const RelatedWork = () => {
  return (
    <div className="py-24 px-6 md:px-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] block mb-4">Discovery</span>
            <h2 className="text-4xl md:text-5xl font-display italic text-white tracking-tighter">Related Works.</h2>
          </div>
          <Link to="/archive" className="hidden md:flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-white/60 hover:text-white transition-all">
            View full archive
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <Link to={project.link}>
                <div className="aspect-[4/5] overflow-hidden mb-8 border border-white/5 relative">
                   <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700" 
                  />
                  <div className="absolute inset-0 bg-brand-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-display italic text-white mb-2 group-hover:translate-x-2 transition-transform duration-500">{project.title}</h3>
                    <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{project.category}</span>
                  </div>
                  <span className="text-[10px] font-mono text-white/20">{project.year}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <Link to="/archive" className="flex md:hidden items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-white/60 hover:text-white transition-all mt-12 justify-center">
          View full archive
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default RelatedWork;
