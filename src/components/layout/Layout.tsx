import React, { ReactNode, useState } from 'react';

interface LayoutProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ activeTab, setActiveTab, children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2b292e] via-[#3a353c] to-[#50424d] text-[var(--mist)] font-['Hack'] flex flex-col">
      {/* Navbar with enhanced interactions */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[rgba(43,41,45,0.85)] backdrop-blur-md border-b border-[rgba(255,255,255,0.12)] px-4 py-4 md:py-3">
        <div className=" flex relative w-full">
          <div className="flex flex-1 ">
            <div className="h-10 w-10 mr-2 flex  overflow-visible">
              <img src="/C.svg" alt="Cosm Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-[var(--ac-primary)]">Cosm</h1>
          </div>

          {/* Desktop navigation with active indicators */}
          <nav className="hidden md:flex gap-6">
            <button 
              onClick={() => setActiveTab('home')}
              className={`nav-link ${activeTab === 'home' ? 'text-[var(--ac-primary)] active' : 'text-[var(--accent-ember)]'} hover:text-[var(--ac-primary)] transition-colors`}
            >
              Home
            </button>
            <button 
              onClick={() => setActiveTab('what-we-do')}
              className={`nav-link ${activeTab === 'what-we-do' ? 'text-[var(--ac-primary)] active' : 'text-[var(--accent-honey)]'} hover:text-[var(--ac-primary)] transition-colors`}
            >
              What We Do
            </button>
            <button 
              onClick={() => setActiveTab('team')}
              className={`nav-link ${activeTab === 'team' ? 'text-[var(--ac-primary)] active' : 'text-[var(--accent-blush)]'} hover:text-[var(--ac-primary)] transition-colors`}
            >
              Team
            </button>
            <button 
              onClick={() => setActiveTab('tech')}
              className={`nav-link ${activeTab === 'tech' ? 'text-[var(--ac-primary)] active' : 'text-[var(--accent-honey)]'} hover:text-[var(--ac-primary)] transition-colors`}
            >
              Technologies
            </button>
            <button 
              onClick={() => setActiveTab('contact')}
              className={`nav-link ${activeTab === 'contact' ? 'text-[var(--ac-primary)] active' : 'text-[var(--acc-secondary)]'} hover:text-[var(--ac-primary)] transition-colors`}
            >
              Contact
            </button>
          </nav>

          {/* Hamburger button for mobile (centered animation) */}
          <button
            className="md:hidden absolute right-0 z-50 flex items-center justify-center w-10 h-10 focus:outline-none"
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
        </div>

        {/* Mobile menu (animated, right-aligned, smaller) */}
        <div
          className={`md:hidden absolute right-4 top-[60px] w-44 bg-[rgba(43,41,45,0.97)] backdrop-blur-lg border border-[rgba(255,255,255,0.1)] rounded-xl shadow-xl overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-96 opacity-100 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none'}`}
          style={{ transitionProperty: 'max-height, opacity' }}
        >
          <div className="flex flex-col py-2 px-2">
            {[
              { tab: 'home', label: 'Home', color: 'var(--accent-ember)' },
              { tab: 'what-we-do', label: 'What We Do', color: 'var(--accent-honey)' },
              { tab: 'team', label: 'Team', color: 'var(--accent-blush)' },
              { tab: 'tech', label: 'Technologies', color: 'var(--accent-honey)' },
              { tab: 'contact', label: 'Contact', color: 'var(--acc-secondary)' },
            ].map(({ tab, label, color }, idx) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setMobileMenuOpen(false);
                  setTimeout(() => window.scrollTo(0, 0), 0);
                }}
                className={`nav-link text-left w-full py-3 px-3 rounded-lg mb-1 transition-all duration-200 ${activeTab === tab ? 'text-[var(--ac-primary)] active' : `text-[${color}]`} ${mobileMenuOpen ? 'animate-slideInDown' : ''}`}
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