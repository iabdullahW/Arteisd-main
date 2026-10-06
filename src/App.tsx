import { AnimatePresence } from 'motion/react';
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Layout & UI Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ScrollToTop from './components/ui/ScrollToTop';
import SupportChat from './components/SupportChat';
import PullString from './components/ui/PullString';
import ReadingProgress from './components/ui/ReadingProgress';
import Preloader from './components/ui/Preloader';
import SmoothScroll from './components/ui/SmoothScroll';

// Pages
import HomePage from './pages/Home';
import ConsultationPage from './pages/Consultation';
import PhilosophyPage from './pages/Philosophy';
import AtelierPage from './pages/Atelier';
import ArchivePage from './pages/Archive';
import PressPage from './pages/Press';
import PrivacyPage from './pages/Privacy';
import AboutPage from './pages/About';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ConsultationPage />} />
        <Route path="/philosophy" element={<PhilosophyPage />} />
        <Route path="/atelier" element={<AtelierPage />} />
        <Route path="/archive" element={<ArchivePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/press" element={<PressPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Preloader />
      <SmoothScroll>
        <ScrollToTop />
        <CustomCursor />
        <div className="min-h-screen bg-brand-black selection:bg-white selection:text-black overflow-x-hidden">
          <Navbar />
          <AnimatedRoutes />
          <Footer />
          <SupportChat />
          <PullString />
          <ReadingProgress />
        </div>
      </SmoothScroll>
    </BrowserRouter>
  );
}
