import { useState } from 'react'
import './App.css'
import People from './components/credits/People'

// Data
const team = [
  {
    name: 'Félix Caba',
    primaryRole: 'Embedded Systems',
    secondaryRole: 'Full-Stack Developer',
    expertise: [
      'Low-level programming',
      'Performance optimization',
      'Concurrent systems design'
    ],
    image: 'felix.jpg',
    github: 'felix-caba',
    bio: 'Félix is an embedded systems specialist with a passion for highly optimized code and concurrent programming paradigms. He focuses on pushing the boundaries of what\'s possible with hardware-software integration.'
  },  
  {
    name: 'Manuel Cervantes',
    primaryRole: 'Cybersecurity',
    secondaryRole: 'Full-Stack Developer',
    expertise: [
      'Secure systems architecture',
      'Safety-critical applications',
      'Concurrent programming'
    ],
    image: 'manu.jpg',
    github: 'MaNoLiN-CRV',
    bio: 'Manuel specializes in cybersecurity with extensive experience building secure and robust systems. His expertise extends to safety-critical applications where reliability and performance are paramount.'
  }
] 

const languages = [
  {
    name: 'Rust',
    icon: '/icons/rust-original.svg',
    color: '#e34f26'
  },
  {
    name: 'Java',
    icon: '/icons/java-original.svg',
    color: '#f7df1e'
  },
  {
    name: 'TypeScript',
    icon: '/icons/typescript-original.svg',
    color: '#1572b6'
  },
  {
    name: 'C',
    icon: '/icons/c-original.svg',
    color: '#3949AB'
  },
  {
    name: 'Dart',
    icon: '/icons/dart-original.svg',
    color: '#0175c2'
  },
  {
    name: 'Python',
    icon: '/icons/python-original.svg',
    color: '#306998'
  },
  
]

const frameworks = [
  {
    name: 'React Native',
    icon: '/icons/react-original.svg',
    color: '#61DAFB'
  },
  {
    name: 'React',
    icon: '/icons/react-original.svg',
    color: '#61DAFB'
  },
  {
    name: 'Express',
    icon: '/icons/express-original.svg',
    color: '#646CFF'
  },
  {
    name: 'NestJS',
    icon: '/icons/nestjs-original.svg', 
    color: '#E0234E' 
  },
  {
    name: 'Flutter',
    icon: '/icons/flutter-original.svg',
    color: '#0175C2'
  },
  {
    name: 'Angular',
    icon: '/icons/angular-original.svg',
    color: '#DD0031'
  }
]

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2b292e] via-[#3a353c] to-[#50424d] text-[var(--mist)] font-['Hack']">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[rgba(43,41,45,0.75)] backdrop-blur-md border-b border-[rgba(255,255,255,0.12)] px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-8 w-8 mr-2 flex items-center justify-center">
              <img src="/C.svg" alt="Cosm Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-[var(--ac-primary)]">Cosm</h1>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-[var(--mist)] focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex gap-6">
            <a href="#" className="text-[var(--accent-ember)] hover:text-[var(--ac-primary)] transition-colors">Home</a>
            <a href="#team" className="text-[var(--accent-blush)] hover:text-[var(--ac-primary)] transition-colors">Team</a>
            <a href="#tech" className="text-[var(--accent-honey)] hover:text-[var(--ac-primary)] transition-colors">Technologies</a>
            <a href="#contact" className="text-[var(--acc-secondary)] hover:text-[var(--ac-primary)] transition-colors">Contact</a>
          </nav>
        </div>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 pb-2">
            <nav className="flex flex-col gap-3">
              <a href="#" className="text-[var(--accent-ember)] hover:text-[var(--ac-primary)] transition-colors px-2 py-1">Home</a>
              <a href="#team" className="text-[var(--accent-blush)] hover:text-[var(--ac-primary)] transition-colors px-2 py-1">Team</a>
              <a href="#tech" className="text-[var(--accent-honey)] hover:text-[var(--ac-primary)] transition-colors px-2 py-1">Technologies</a>
              <a href="#contact" className="text-[var(--acc-secondary)] hover:text-[var(--ac-primary)] transition-colors px-2 py-1">Contact</a>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-24 px-4 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center min-h-[70vh] mb-24">
          <div className="absolute inset-0 bg-[url('/background-grid.svg')] opacity-15 z-0"></div>
          
          <div className="relative z-10 text-center">
            <div className="mb-8 animate-float">
              <div className="h-32 w-32 mx-auto flex items-center justify-center">
                <img src="/C.svg" alt="Cosm Logo" className="w-full h-full object-contain" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-[var(--ac-primary)] mb-4 text-glow">
              Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent-blush)] to-[var(--accent-ember)]">Cosm</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-[var(--mist)] max-w-2xl mx-auto mb-8">
              Building the future with elegant code and innovative technologies
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#team" className="px-6 py-3 rounded-full glass-button text-[var(--ac-primary)] transition-all">
                Meet Our Team
              </a>
              <a href="#tech" className="px-6 py-3 rounded-full glass-button-secondary text-[var(--accent-ember)] transition-all">
                See Technologies
              </a>
            </div>
          </div>
          
          {/* Enhanced decorative elements */}
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-full max-w-md h-10 bg-gradient-to-r from-transparent via-[rgba(255,160,122,0.25)] to-transparent blur-md"></div>
        </section>

        {/* Team Section - simplified without expansion animation */}
        <section id="team" className="mb-24 scroll-mt-24">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(255,160,122,0.15)] to-[rgba(230,107,117,0.15)] rounded-3xl blur-xl transform -translate-y-4"></div>
            <div className="relative glass-card team-container">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--accent-ember)] mb-8 pb-4 border-b border-[rgba(255,255,255,0.1)]">
                // Our Team
              </h2>
              <People people={team} />
            </div>
          </div>
        </section>
        
        {/* Technologies Section */}
        <section id="tech" className="mb-24 scroll-mt-24">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(245,215,110,0.15)] to-[rgba(254,205,178,0.15)] rounded-3xl blur-xl transform -translate-y-4"></div>
            <div className="relative glass-card">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--accent-ember)] mb-8 pb-4 border-b border-[rgba(255,255,255,0.15)] accent-border">
                // Technologies
              </h2>
              
              {/* Languages */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-[var(--accent-blush)] mb-6">Languages</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                  {languages.map((lang, index) => (
                    <div key={index} className="glass-item group hover:scale-105 transition-all">
                      <div className="icon-container mb-3 mx-auto flex items-center justify-center group-hover:animate-pulse">
                        <div 
                          className="icon-wrapper" 
                          style={{
                            backgroundColor: `${lang.color}15`,
                            borderColor: `${lang.color}40`
                          }}
                        >
                          <img 
                            src={lang.icon} 
                            alt={lang.name} 
                            className="tech-icon" 
                          />
                        </div>
                      </div>
                      <p className="text-center text-[var(--accent-blush)]">{lang.name}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Frameworks */}
              <div>
                <h3 className="text-2xl font-bold text-[var(--accent-blush)] mb-6">Frameworks</h3>
                <div className="grid grid-cols-6 gap-4"> 
                  {frameworks.map((fw, index) => (
                    <div key={index} className="glass-item group hover:scale-105 transition-all">
                      <div className="icon-container mb-3 mx-auto flex items-center justify-center group-hover:animate-pulse">
                        <div 
                          className="icon-wrapper" 
                          style={{
                            backgroundColor: `${fw.color}15`,
                            borderColor: `${fw.color}40`
                          }}
                        >
                          <img 
                            src={fw.icon} 
                            alt={fw.name} 
                            className="tech-icon"
                          />
                        </div>
                      </div>
                      <p className="text-center text-[var(--accent-blush)]">{fw.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section id="contact" className="mb-24 scroll-mt-24">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(177,182,149,0.1)] to-[rgba(255,160,122,0.1)] rounded-3xl blur-xl transform -translate-y-4"></div>
            <div className="relative glass-card text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--accent-ember)] mb-8 pb-4 border-b border-[rgba(255,255,255,0.1)]">
                // Get In Touch
              </h2>
              
              <p className="text-lg text-[var(--mist)] mb-8 max-w-2xl mx-auto">
                Have a project in mind? Let's work together to create something amazing.
              </p>
              
              <a href="mailto:contact@cosm.dev" className="inline-block px-8 py-4 rounded-full bg-[rgba(255,160,122,0.15)] backdrop-filter backdrop-blur-sm border border-[rgba(255,160,122,0.3)] text-[var(--ac-primary)] hover:bg-[rgba(255,160,122,0.25)] transition-all">
                contact@cosm.dev
              </a>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-[rgba(43,41,45,0.7)] backdrop-blur-md border-t border-[rgba(255,255,255,0.1)] py-8">
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
  )
}

export default App