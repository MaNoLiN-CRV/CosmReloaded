import React, { useRef, useEffect } from 'react';

interface ServiceItem {
  title: string;
  icon: string;
  description: string;
  color: string;
}

interface IconProps {
  name: string;
}

interface HomeProps {
  featuredServices: ServiceItem[];
}

const Icon: React.FC<IconProps> = ({ name }) => {
  switch(name) {
    case 'server':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
          <line x1="6" y1="6" x2="6.01" y2="6"></line>
          <line x1="6" y1="18" x2="6.01" y2="18"></line>
        </svg>
      );
    case 'link':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
        </svg>
      );
    case 'globe':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      );
    case 'smartphone':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
          <line x1="12" y1="18" x2="12.01" y2="18"></line>
        </svg>
      );
    default:
      return null;
  }
};

const Home: React.FC<HomeProps> = ({ featuredServices }) => {
  const heroRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    // Import dynamically to avoid issues with SSR
    import('../../lib/animations').then((animations) => {
      animations.initNeonicGrid();
      animations.initParticleSystem();
      animations.initLogoAnimation();
      animations.initHorizontalCards();
      
      // Add typing animation if we have an element with id "hero-typing"
      const typingElement = document.getElementById('hero-typing');
      if (typingElement) {
        animations.initTypingAnimation('hero-typing', [
          'We are Cosm Reloaded.',
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
        <div className="hero-grid"></div>
        <div className="hero-glow"></div>
        <div className="hero-particles"></div>
        <div className="blob-gradient"></div>
      </div>
      
      <div className="relative z-10 text-center w-full px-4">
        <div className="logo-container mb-8 md:mb-10">
          <div className="h-32 w-32 md:h-40 md:w-40 mx-auto flex items-center justify-center transform transition-all duration-700 hover:scale-105">
            <img 
              src="/C.svg" 
              alt="Cosm Logo" 
              className="w-full h-full object-contain enhanced-logo-glow"
            />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6">
          <span className="bg-gradient-to-r from-[var(--accent-ember)] to-[var(--ac-primary)] text-transparent bg-clip-text">Cosm</span>
        </h1>
        
        <div className="hero-typing-container">
          <p id="hero-typing" className="text-lg md:text-xl fade-in" style={{animationDelay: '0.2s'}}></p>
        </div>
        
        <p className="text-lg md:text-xl text-[#d1d1d1] max-w-xl mx-auto mb-10 fade-in" style={{animationDelay: '0.3s'}}>
          Crafting the future with elegant code and advanced technologies
        </p>
        
        {/* Featured Services using Tailwind Grid */}
        <div className="fade-in" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--accent-honey)] mb-6">
            // Our Expertise
          </h2>
          {/* Updated grid classes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
            {featuredServices.map((service, index) => (
              <div key={index} className="glass-item scroll-card modern-card-hover scale-in" style={{animationDelay: `${0.5 + index * 0.05}s`}}>
                <div className="card-header">
                  <div className={`card-icon bg-[${service.color}15] text-[${service.color}]`}>
                    <Icon name={service.icon} />
                  </div>
                  <h3 className={`text-[${service.color}]`}>{service.title}</h3>
                </div>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;