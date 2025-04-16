import React, { useRef, useEffect, useState } from 'react';
import Icon from '../data/icon';

interface ServiceItem {
  title: string;
  icon: string;
  description: string;
  color: string;
}

interface HomeProps {
  featuredServices: ServiceItem[];
  setActiveTab: (tab: string) => void;
}

const Home: React.FC<HomeProps> = ({ featuredServices, setActiveTab }) => {
  const heroRef = useRef<HTMLElement>(null);

  // Detect mobile (usar hook para SSR safe)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);



  // Icon tab data (same as nav), quitamos el home
  const iconTabs = [
    {
      tab: 'what-we-do', icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 12h8M8 16h8M8 8h8" /></svg>
      )
    },
    {
      tab: 'team', icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="4" /><path d="M5.5 21a7.5 7.5 0 0113 0" /></svg>
      )
    },
    {
      tab: 'tech', icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 3v4M8 3v4" /></svg>
      )
    },
    {
      tab: 'contact', icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 6l-10 7L2 6" /></svg>
      )
    },
  ];

  useEffect(() => {
    // Import dynamically to avoid issues with SSR
    import('../../lib/animations').then((animations) => {

      animations.initParticleSystem();
      animations.initLogoAnimation();
      animations.init3DCardEffect();

      // Add typing animation if we have an element with id "hero-typing"
      const typingElement = document.getElementById('hero-typing');
      if (typingElement) {
        animations.initTypingAnimation('hero-typing', [
          'We help your business.',
          'We design great experiences.',
          'We build the future.',
        ], 100, 50, 2000);
      }
    });
  }, []);


  return (

    <section ref={heroRef} className="relative flex flex-col items-center justify-center min-h-[70vh] mb-16">

      {/* Interactive neonic grid background */}


      <div className="hero-background">
        <div className="hero-glow"></div>
        <canvas className="hero-particles" width={window.innerWidth} height={window.innerHeight} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }} />
        <div className="blob-gradient"></div>
      </div>

      <div className="py-8 relative z-10 text-center w-full px-4">
        <div className="logo-container mb-8 md:mb-10 fade-in" style={{ animationDelay: '0.3s', animationDuration: '2s' }}>
          <div className="h-80 w-80 md:h-72 md:w-72 mx-auto flex items-center 
          justify-center transform transition-all duration-700 hover:scale-105">
            <img
              src="/C.svg"
              alt="Cosm Logo"
              className="w-full h-full object-contain enhanced-logo-glow float"
            />
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6">
          <span className="bg-gradient-to-r from-[var(--accent-ember)] to-[var(--ac-primary)] text-transparent bg-clip-text fade-in"
            style={{ animationDelay: '0.3s', animationDuration: '2s' }}>Cosm</span>
        </h1>
        <div className="hero-typing-container">
          <p id="hero-typing" className="text-lg md:text-xl fade-in" style={{ animationDelay: '0.3s' }}></p>
        </div>
        <p className="text-lg md:text-xl text-[#d1d1d1] max-w-xl mx-auto mb-6 fade-in" style={{ animationDelay: '0.3s' }}>
          Crafting the future with elegant code and advanced technologies
        </p>
        {/* Botonera de iconos siempre visible en móvil, sin flechita */}
        {isMobile && (
          <div className="flex justify-center gap-4 mb-6 animate-slideInDown">
            {iconTabs.map(({ tab, icon }, idx) => (
              <button
                key={tab}
                className={`glass-button shimmer-effect p-3 rounded-full transition-all duration-300 ${'home' === tab ? 'bg-[var(--ac-primary)] text-white scale-110 shadow-lg' :
                  'bg-[rgba(255,255,255,0.08)] text-[var(--ac-primary)] hover:bg-[rgba(255,255,255,0.15)]'} animate-slideIn`}
                style={{ animationDelay: `${0.1 + idx * 0.07}s` }}
                onClick={() => setActiveTab(tab)}
                aria-label={tab}
              >
                {icon}
              </button>
            ))}
          </div>
        )}
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--accent-honey)] mb-6">
          // Our Expertise
        </h2>
        {/* Updated grid classes */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto items-stretch">
          {featuredServices.map((service, index) => (
            <div
              className="scale-in h-full"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              key={index}
            >
              <div className="glass-item modern-card-hover flex flex-col h-full" style={{ animationDelay: `${0.5 + index * 0.05}s` }}>
                <div className="card-header">
                  <div className={`card-icon bg-[${service.color}15] text-[${service.color}]`}>
                    <Icon name={service.icon} />
                  </div>
                  <h3 className={`text-base md:text-lg font-semibold text-[${service.color}]`}>
                    {service.title}
                  </h3>
                </div>
                <p>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;