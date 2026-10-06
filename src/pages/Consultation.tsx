import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SmoothWavyCanvas from '../components/SmoothWavyCanvas';
import PageWrapper from '../components/ui/PageWrapper';

const ConsultationPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(14);
  const [selectedTime, setSelectedTime] = useState<string | null>('01:30 PM');
  const [showSuccess, setShowSuccess] = useState(false);
  const [appointmentId, setAppointmentId] = useState('');

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `ATC-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    setAppointmentId(id);
    setShowSuccess(true);
  };

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative py-24 px-8 md:px-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-24 items-center">
          <div className="md:col-span-6">
            <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] block mb-8">Consultation // Enquiries Open</span>
            <h1 className="font-display italic text-6xl md:text-8xl text-white mb-10 tracking-tighter leading-none" data-cursor-text="Reserve">
              Start your project <br/> with Aether.
            </h1>
            <p className="font-sans text-[13px] text-white/40 leading-relaxed tracking-wider max-w-sm">
              Begin your journey toward spatial excellence. Each consultation is an architectural exploration of your vision, lifestyle, and aesthetic intent.
            </p>
          </div>
          <div className="md:col-span-6 flex justify-end">
             <div className="relative w-full max-w-md aspect-[4/5] overflow-hidden border border-white/10 group">
                <img 
                  className="w-full h-full object-cover grayscale contrast-125 brightness-75 group-hover:scale-105 transition-transform duration-[3s]" 
                  src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Interior details"
                  crossOrigin="anonymous"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 right-0 bg-brand-black p-8 border-l border-t border-white/10">
                   <div className="text-[9px] font-mono text-white/40 uppercase tracking-widest leading-loose">
                      PROJECT ID: 00-BC-24 <br/>
                      COORDINATES: 51.5074 N, 0.1278 W
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 01 - Select Category */}
      <section className="py-24 px-8 md:px-16 relative overflow-hidden">
        <SmoothWavyCanvas lineOpacity={0.1} />
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] block mb-16 underline underline-offset-[16px]">01 — Service Type</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { type: 'Type A', title: 'Residential', desc: 'Personal sanctuaries and living spaces defined by intimate structural narratives.' },
              { type: 'Type B', title: 'Commercial', desc: 'Atmospheric environments designed for brand prestige and human interaction.' },
              { type: 'Type C', title: 'Renovation', desc: 'Structural metamorphosis focusing on heritage preservation and modern integration.' }
            ].map((cat, idx) => (
              <motion.div 
                key={cat.title} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                viewport={{ once: true }}
                onClick={() => setSelectedCategory(cat.title)}
                data-cursor-hover
                data-cursor-text="Select"
                className={`p-12 transition-all cursor-pointer group border ${
                  selectedCategory === cat.title 
                    ? 'bg-white/[0.05] border-white/40' 
                    : 'bg-white/[0.02] border-white/5 hover:border-white/20'
                }`}
              >
                <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest mb-6 block">{cat.type}</span>
                <h3 className="font-display italic text-3xl text-white mb-6 group-hover:translate-x-2 transition-transform">{cat.title}</h3>
                <p className="font-sans text-[11px] text-white/30 leading-relaxed tracking-wider">{cat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 02 & 03 - Timing and Details */}
      <section className="py-24 px-8 md:px-16 border-t border-white/5 bg-brand-surface relative overflow-hidden">
        <SmoothWavyCanvas lineOpacity={0.1} />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32">
          
          {/* Calendar Side */}
          <div className="space-y-12">
            <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] block mb-8 underline underline-offset-[16px]">02 — Timing</span>
            <div className="bg-brand-black p-12 border border-white/5 rounded-sm">
              <div className="flex justify-between items-center mb-10">
                <h4 className="font-display uppercase text-white tracking-widest text-lg">April 2026</h4>
                <div className="flex gap-4">
                  <button className="text-white/40 hover:text-white transition-colors">←</button>
                  <button className="text-white/40 hover:text-white transition-colors">→</button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-2 text-center mb-6">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                  <span key={`${d}-${i}`} className="text-[9px] font-mono text-white/20 uppercase">{d}</span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {[...Array(31)].map((_, i) => {
                  const day = i - 1;
                  if (day < 1) return <div key={`prev-${i}`} className="aspect-square flex items-center justify-center text-[10px] text-white/10">{29 + i}</div>
                  const isSelected = selectedDate === day;
                  return (
                    <div 
                      key={`day-${day}`} 
                      onClick={() => setSelectedDate(day)}
                      data-cursor-hover
                      className={`aspect-square flex items-center justify-center text-[10px] font-mono cursor-pointer transition-all
                        ${isSelected ? 'bg-white text-black' : 'text-white/40 hover:bg-white/5 hover:text-white'}
                      `}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
              <div className="grid grid-cols-3 gap-4 mt-12">
                {['10:00 AM', '01:30 PM', '04:00 PM'].map((time) => (
                  <button 
                    key={time} 
                    onClick={() => setSelectedTime(time)}
                    data-cursor-hover
                    className={`py-4 text-[9px] font-mono text-center transition-all border
                      ${selectedTime === time ? 'bg-white text-black border-white' : 'border-white/5 text-white/30 hover:border-white/20'}
                    `}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="space-y-12">
            <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] block mb-8 underline underline-offset-[16px]">03 — Details</span>
            <form onSubmit={handleBook} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[9px] font-mono text-white/40 uppercase tracking-widest">Full Name</label>
                  <input required type="text" placeholder="E.g. Arthur Sterling" className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-white transition-all text-xs" />
                </div>
                <div className="space-y-4">
                  <label className="text-[9px] font-mono text-white/40 uppercase tracking-widest">Email Address</label>
                  <input required type="email" placeholder="sterling@example.com" className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-white transition-all text-xs" />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[9px] font-mono text-white/40 uppercase tracking-widest">Project Location</label>
                <input required type="text" placeholder="City, Country" className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-white transition-all text-xs" />
              </div>
              <div className="space-y-4">
                <label className="text-[9px] font-mono text-white/40 uppercase tracking-widest">Project Brief</label>
                <textarea required rows={4} placeholder="Describe the atmosphere, materiality, and your vision..." className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-white transition-all text-xs resize-none" />
              </div>
              <div className="pt-8">
                <button type="submit" className="bg-white text-black font-sans text-[11px] uppercase tracking-widest font-bold px-16 py-5 hover:bg-[#d4d4d4] transition-all w-full md:w-auto">
                  Confirm Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSuccess(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-brand-surface border border-white/10 p-16 max-w-xl w-full text-center"
            >
              <div className="mb-12 flex justify-center">
                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
              </div>
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] block mb-6">Confirmed</span>
              <h2 className="font-display italic text-5xl text-white mb-8 tracking-tight">Appointment Secured.</h2>
              <p className="font-sans text-sm text-white/40 leading-relaxed mb-12 tracking-wide">
                Your architectural session has been logged. An aesthetic brief will be sent to your inbox shortly.
              </p>
              <div className="bg-white/[0.02] border border-white/5 p-8 mb-12">
                 <div className="text-[9px] font-mono text-white/20 uppercase tracking-widest mb-2">Reference ID</div>
                 <div className="text-xl font-mono text-white tracking-widest">{appointmentId}</div>
              </div>
              <button 
                onClick={() => setShowSuccess(false)}
                className="font-sans text-[11px] uppercase tracking-widest text-white/60 hover:text-white transition-colors"
              >
                Return to Atelier
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </PageWrapper>
  );
};

export default ConsultationPage;
