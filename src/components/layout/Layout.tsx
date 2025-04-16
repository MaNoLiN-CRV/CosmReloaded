import React, { ReactNode, useEffect, useState } from 'react';

interface LayoutProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ activeTab, setActiveTab, children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTabChange = (tab: string, closeMobileMenu = false) => {
    setActiveTab(tab);
    if (closeMobileMenu) setMobileMenuOpen(false);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2b292e] via-[#3a353c] to-[#50424d] text-[var(--mist)] font-['Hack'] flex flex-col">
      {/* Navbar with enhanced interactions */}
      <header className="fixed z-50 bg-[rgba(43,41,45,0.85)] 
      backdrop-blur-md border-b border-[rgba(255,255,255,0.12)] px-5 py-4 md:py-3">
       
          {/* Solo el nombre, sin logo, perfectamente alineado a la izquierda     <div className="flex items-center w-full max-w-7xl mx-auto px-4"> */}

          <h3 className="text-xl md:text-2xl font-bold z-10 text-[var(--ac-primary)]">cosmit.es</h3>

          {/* Desktop navigation with active indicators */}
          <nav className="hidden md:flex gap-6 ml-auto">
            <button 
              onClick={() => handleTabChange('home')}
              className={`nav-link ${activeTab === 'home' ? 'text-[var(--ac-primary)] active' : 'text-[var(--accent-ember)]'} hover:text-[var(--ac-primary)] transition-colors`}
            >
              Home
            </button>
            <button 
              onClick={() => handleTabChange('what-we-do')}
              className={`nav-link ${activeTab === 'what-we-do' ? 'text-[var(--ac-primary)] active' : 'text-[var(--accent-honey)]'} hover:text-[var(--ac-primary)] transition-colors`}
            >
              What We Do
            </button>
            <button 
              onClick={() => handleTabChange('team')}
              className={`nav-link ${activeTab === 'team' ? 'text-[var(--ac-primary)] active' : 'text-[var(--accent-blush)]'} hover:text-[var(--ac-primary)] transition-colors`}
            >
              Team
            </button>
            <button 
              onClick={() => handleTabChange('tech')}
              className={`nav-link ${activeTab === 'tech' ? 'text-[var(--ac-primary)] active' : 'text-[var(--accent-honey)]'} hover:text-[var(--ac-primary)] transition-colors`}
            >
              Technologies
            </button>
            <button 
              onClick={() => handleTabChange('contact', true)}
              className={`nav-link ${activeTab === 'contact' ? 'text-[var(--ac-primary)] active' : 'text-[var(--acc-secondary)]'} hover:text-[var(--ac-primary)] transition-colors`}
            >
              Contact
            </button>
          </nav>

          {/* Hamburger button for mobile (centered animation) */}
          <button
            className="md:hidden hover:translate-y-0 absolute right-3 z-50 flex items-center justify-center w-10 h-10 focus:outline-none"
            aria-label="Open menu"
            onClick={() => setMobileMenuOpen((open) => !open)}
            style={{ padding: 0 }}
          >
            <span
              className={`block absolute w-7 h-0.5 bg-[var(--ac-primary)] rounded transition-all duration-300 ease-in-out origin-center
                ${mobileMenuOpen ? 'rotate-45' : '-translate-y-2'}
              `}
              style={{ left: '50%', top: '50%', transform: mobileMenuOpen ? 'translate(-50%, -50%) rotate(45deg)' : 'translate(-50%, calc(-50% - 8px))' }}
            ></span>
            <span
              className={`block absolute w-7 h-0.5 bg-[var(--ac-primary)] rounded transition-all duration-300 ease-in-out origin-center
                ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}
              `}
              style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
            ></span>
            <span
              className={`block absolute w-7 h-0.5 bg-[var(--ac-primary)] rounded transition-all duration-300 ease-in-out origin-center
                ${mobileMenuOpen ? '-rotate-45' : 'translate-y-2'}
              `}
              style={{ left: '50%', top: '50%', transform: mobileMenuOpen ? 'translate(-50%, -50%) rotate(-45deg)' : 'translate(-50%, calc(-50% + 8px))' }}
            ></span>
          </button>
    

        {/* Mobile menu (animated, right-aligned, smaller) */}
        <div
          className={`md:hidden absolute right-4 top-[60px] bg-[rgba(43,41,45,0.97)] backdrop-blur-lg w-fit
            border border-[rgba(255,255,255,0.1)] rounded-xl shadow-xl overflow-hidden transition-all  duration-300 ${mobileMenuOpen ? 
              'max-h-64 opacity-100 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none'}`}
          style={{ transitionProperty: 'max-height, opacity' }}
        >
          <div className="flex flex-col py-2 pt-4" >
            {[
              { tab: 'home', label: 'Home', color: 'var(--accent-ember)' },
              { tab: 'what-we-do', label: 'What We Do', color: 'var(--accent-honey)' },
              { tab: 'team', label: 'Team', color: 'var(--accent-blush)' },
              { tab: 'tech', label: 'Technologies', color: 'var(--accent-honey)' },
              { tab: 'contact', label: 'Contact', color: 'var(--acc-secondary)' },
            ].map(({ tab, label, color }, idx) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab, true)}
                className={`opacity-0 nav-link py-3 px-3 rounded-lg mb-1 
                  transition-all duration-300 ${activeTab === tab ? 'text-[var(--ac-primary)] active' :
                     `text-[${color}]`} ${mobileMenuOpen ? 'animate-slideInDown' : ''}`}
                style={{ animationDelay: mobileMenuOpen ? `${0.05 * idx + 0.1}s` : undefined }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
     
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Footer with subtle enhancements */}
      <footer className="bg-[rgba(43,41,45,0.7)] backdrop-blur-md border-t border-[rgba(255,255,255,0.1)] py-4 mb-12 md:mb-0">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="h-8 w-8 mr-2 flex items-center justify-center">
              <img src="/C.svg" alt="Cosm Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-lg text-[var(--ac-primary)]">Cosm</span>
          </div>
          
          <div className="text-sm text-[var(--mist)]">
            © {new Date().getFullYear()} Cosm. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;