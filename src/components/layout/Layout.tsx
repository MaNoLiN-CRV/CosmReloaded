import React, { ReactNode, useState } from 'react';

interface LayoutProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ activeTab, setActiveTab, children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTabMenu, setShowTabMenu] = useState(false);
  
  // Toggle the tab menu
  const toggleTabMenu = () => {
    setShowTabMenu(!showTabMenu);
  };
  
  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setShowTabMenu(false);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2b292e] via-[#3a353c] to-[#50424d] text-[var(--mist)] font-['Hack'] flex flex-col">
      {/* Navbar with enhanced interactions */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[rgba(43,41,45,0.85)] backdrop-blur-md border-b border-[rgba(255,255,255,0.12)] px-4 py-4 md:py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-8 w-8 mr-2 flex items-center justify-center overflow-visible">
              <img src="/C.svg" alt="Cosm Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-[var(--ac-primary)]">Cosm</h1>
          </div>
          
          {/* Mobile tab menu toggle button */}
          <button 
            className="md:hidden mobile-menu-toggle mr-2"
            onClick={toggleTabMenu}
            aria-label="Toggle navigation menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--mist)]">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </button>
          
          {/* Mobile menu button with animation */}
          <button 
            className="md:hidden text-[var(--mist)] focus:outline-none transition-transform duration-300 ease-in-out"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-90">
                <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
              </svg>
            )}
          </button>
          
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
        </div>
        
        {/* Enhanced mobile navigation with animations */}
        <div className={`md:hidden mt-2 pb-2 overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
          <nav className="flex flex-col gap-3">
            <button 
              onClick={() => { setActiveTab('home'); setIsMenuOpen(false); }}
              className={`text-left px-2 py-1 ${activeTab === 'home' ? 'text-[var(--ac-primary)]' : 'text-[var(--accent-ember)]'} hover:text-[var(--ac-primary)] transition-colors ${isMenuOpen ? 'slide-in' : ''}`}
              style={{animationDelay: '0.1s'}}
            >
              Home
            </button>
            <button 
              onClick={() => { setActiveTab('what-we-do'); setIsMenuOpen(false); }}
              className={`text-left px-2 py-1 ${activeTab === 'what-we-do' ? 'text-[var(--ac-primary)]' : 'text-[var(--accent-honey)]'} hover:text-[var(--ac-primary)] transition-colors ${isMenuOpen ? 'slide-in' : ''}`}
              style={{animationDelay: '0.15s'}}
            >
              What We Do
            </button>
            <button 
              onClick={() => { setActiveTab('team'); setIsMenuOpen(false); }}
              className={`text-left px-2 py-1 ${activeTab === 'team' ? 'text-[var(--ac-primary)]' : 'text-[var(--accent-blush)]'} hover:text-[var(--ac-primary)] transition-colors ${isMenuOpen ? 'slide-in' : ''}`}
              style={{animationDelay: '0.2s'}}
            >
              Team
            </button>
            <button 
              onClick={() => { setActiveTab('tech'); setIsMenuOpen(false); }}
              className={`text-left px-2 py-1 ${activeTab === 'tech' ? 'text-[var(--ac-primary)]' : 'text-[var(--accent-honey)]'} hover:text-[var(--ac-primary)] transition-colors ${isMenuOpen ? 'slide-in' : ''}`}
              style={{animationDelay: '0.25s'}}
            >
              Technologies
            </button>
            <button 
              onClick={() => { setActiveTab('contact'); setIsMenuOpen(false); }}
              className={`text-left px-2 py-1 ${activeTab === 'contact' ? 'text-[var(--ac-primary)]' : 'text-[var(--acc-secondary)]'} hover:text-[var(--ac-primary)] transition-colors ${isMenuOpen ? 'slide-in' : ''}`}
              style={{animationDelay: '0.3s'}}
            >
              Contact
            </button>
          </nav>
        </div>
        
        {/* Mobile Tab Menu */}
        <div className={`mobile-tab-menu md:hidden ${showTabMenu ? 'visible' : 'hidden'}`}>
          <button
            className={`${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => handleTabChange('home')}
          >
            Home
          </button>
          <button
            className={`${activeTab === 'what-we-do' ? 'active' : ''}`}
            onClick={() => handleTabChange('what-we-do')}
          >
            What We Do
          </button>
          <button
            className={`${activeTab === 'team' ? 'active' : ''}`}
            onClick={() => handleTabChange('team')}
          >
            Team
          </button>
          <button
            className={`${activeTab === 'tech' ? 'active' : ''}`}
            onClick={() => handleTabChange('tech')}
          >
            Technologies
          </button>
          <button
            className={`${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => handleTabChange('contact')}
          >
            Contact
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Footer with subtle enhancements */}
      <footer className="bg-[rgba(43,41,45,0.7)] backdrop-blur-md border-t border-[rgba(255,255,255,0.1)] py-8 mb-12 md:mb-0">
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