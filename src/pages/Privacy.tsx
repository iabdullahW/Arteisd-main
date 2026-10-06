import PageWrapper from '../components/ui/PageWrapper';

const PrivacyPage = () => {
  return (
    <PageWrapper className="bg-brand-black pb-24 min-h-screen px-8 md:px-16 pt-32 md:pt-48">
      <div className="max-w-3xl mx-auto">
        <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em] mb-4 block">Legal Archive</span>
        <h1 className="text-6xl font-display font-light italic text-white mb-24">Privacy Policy</h1>
        
        <div className="space-y-16 text-white/60 font-light leading-relaxed">
          <section>
            <h3 className="text-white text-sm font-mono uppercase tracking-widest mb-6 border-b border-white/10 pb-2">Introduction</h3>
            <p>Our commitment to privacy mirrors our commitment to structural integrity. This document outlines how we collect, process, and safeguard the data generated through your interaction with our digital environment.</p>
          </section>

          <section>
            <h3 className="text-white text-sm font-mono uppercase tracking-widest mb-6 border-b border-white/10 pb-2">Data Collection</h3>
            <p className="mb-4">We collect minimal identifiable information. Interactions are tracked primarily to optimize performance and ensure the continuity of site experiences. Information provided via the Contact Inquiry is used solely for the purpose of professional communication.</p>
          </section>

          <section>
            <h3 className="text-white text-sm font-mono uppercase tracking-widest mb-6 border-b border-white/10 pb-2">Cookies & Analytics</h3>
            <p>We utilize standard digital markers to understand volume and traffic patterns within our sections. These do not allow us to identify users personally unless information is explicitly provided through structured forms.</p>
          </section>

          <section>
            <h3 className="text-white text-sm font-mono uppercase tracking-widest mb-6 border-b border-white/10 pb-2">Security</h3>
            <p>In adherence to the principles of safe sanctuaries, all digital data is stored within encrypted protocols and is reviewed seasonally to ensure compliance with global protection standards.</p>
          </section>

          <div className="pt-24 border-t border-white/5">
            <div className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/20">
              Last Updated // 25.04.2026
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default PrivacyPage;
