import { useState, useEffect, useRef } from 'react'
import './App.css'
import People from './components/credits/People'
import { fetchGithubData } from './utils/github'

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
      'Optimization and performance tuning',
      'Concurrent programming'
    ],
    image: 'manu.jpg',
    github: 'MaNoLiN-CRV',
    bio: 'Manuel specializes in cybersecurity with extensive experience building secure and robust systems. His expertise in optimization and concurrent programming allows him to create efficient solutions.'
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

// Service data from WhatWeDo component
const services = [
  {
    title: "High-Performance Backend",
    icon: "server",
    description: "We architect efficient backend systems engineered for optimal performance. Our solutions implement sophisticated caching mechanisms, data compression, and robust authentication frameworks that maximize speed, security, and overall system efficiency.",
    features: [
      { text: "Advanced load balancing and performance optimization", icon: "gauge" },
      { text: "Intelligent caching strategies for reduced latency", icon: "database" },
      { text: "Secure authentication and authorization frameworks", icon: "shield" },
    ]
  },
  {
    title: "Seamless System Integration",
    icon: "link",
    description: "We specialize in connecting disparate systems into cohesive, efficient ecosystems. Our integration solutions enable flawless communication between platforms, creating unified workflows that enhance productivity and data consistency across your entire technology stack.",
    features: [
      { text: "Automated data synchronization and transformation", icon: "zap" },
      { text: "API development and integration with third-party services", icon: "link" },
      { text: "Microservices architecture and orchestration", icon: "server" },
    ]
  },
  {
    title: "Optimized Web Solutions",
    icon: "globe",
    description: "We craft web applications that deliver exceptional user experiences without compromising on performance. Through advanced optimization techniques, asset management, and cutting-edge rendering strategies, we build web platforms that load instantly and perform flawlessly.",
    features: [
      { text: "Next-generation performance optimization techniques", icon: "zap" },
      { text: "Responsive, accessible, and standards-compliant interfaces", icon: "globe" },
      { text: "Advanced code splitting and resource management", icon: "gauge" },
    ]
  },
  {
    title: "Mobile Application Development",
    icon: "smartphone",
    description: "We develop high-performance mobile applications that provide seamless experiences across all devices. Our mobile solutions combine elegant, intuitive interfaces with sophisticated backend integration to create powerful yet lightweight applications that users love.",
    features: [
      { text: "Cross-platform and native application development", icon: "smartphone" },
      { text: "Battery-efficient code and optimized resource consumption", icon: "zap" },
      { text: "Secure local storage and offline functionality", icon: "shield" },
    ]
  }
];

// Define featuredServices based on services, adding color
const featuredServices = [
  {
    ...services[0], // High-Performance Backend
    color: 'var(--accent-ember)', // Example color
    description: "Building scalable and efficient backend systems." // Shorter description for expertise card
  },
  {
    ...services[1], // Seamless System Integration
    color: 'var(--accent-blush)', // Example color
    description: "Connecting disparate systems for unified workflows." // Shorter description
  },
  {
    ...services[2], // Optimized Web Solutions
    color: 'var(--accent-honey)', // Example color
    description: "Crafting fast, responsive, and accessible web apps." // Shorter description
  },
  {
    ...services[3], // Mobile Application Development
    color: 'var(--ac-primary)', // Example color
    description: "Developing high-performance cross-platform mobile apps." // Shorter description
  }
];


// Process data from WhatWeDo component
const process = [
  {
    number: "01",
    title: "Discovery & Planning",
    description: "We begin by understanding your challenges, goals, and requirements, establishing a clear roadmap for your solution's development."
  },
  {
    number: "02",
    title: "Development & Testing",
    description: "Our engineering team builds your solution using agile methodologies, with continuous testing and optimization throughout the process."
  },
  {
    number: "03",
    title: "Deployment & Support",
    description: "After thorough testing, we deploy your solution and provide ongoing support, monitoring, and optimization to ensure optimal performance."
  }
];

interface GithubProfile {
  name: string;
  login: string;
  avatar_url: string;
  bio: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string | null;
  blog: string | null;
  twitter_username: string | null;
  company: string | null;
  created_at: string;
}

interface GithubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [githubUsername, setGithubUsername] = useState<string | null>(null);
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Animation references
  const heroRef = useRef<HTMLElement>(null);
  
  // Initialize animations
  useEffect(() => {
    if (activeTab === 'home') {
      // Import dynamically to avoid issues with SSR
      import('./lib/animations').then((animations) => {
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
    }
  }, [activeTab]);

  // Load GitHub profile when username changes
  useEffect(() => {
    async function loadGithubData() {
      if (!githubUsername) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const [profileData, reposData] = await Promise.all([
          fetchGithubData(`users/${githubUsername}`),
          fetchGithubData(`users/${githubUsername}/repos?sort=updated&per_page=10`)
        ]);
        setProfile(profileData);
        setRepos(reposData);
        setActiveTab('dev-profile');
      } catch (err) {
        console.error('Error fetching GitHub data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load GitHub data');
      } finally {
        setLoading(false);
      }
    }
    
    loadGithubData();
  }, [githubUsername]);

  // Handle clicking a team member's GitHub profile
  const handleProfileView = (username: string) => {
    setGithubUsername(username);
  };

  // Icon component for services section
  const Icon = ({ name }: { name: string }) => {
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
      case 'zap':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
        );
      case 'database':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
          </svg>
        );
      case 'shield':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
        );
      case 'gauge':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v2"></path>
            <path d="M12 14l2.5-2.5"></path>
            <path d="M12 22v-2"></path>
            <path d="M20 12h-2"></path>
            <path d="M6 12H4"></path>
            <path d="M18.5 5.5l-1.4 1.4"></path>
            <path d="M5.5 5.5l1.4 1.4"></path>
            <circle cx="12" cy="12" r="8"></circle>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2b292e] via-[#3a353c] to-[#50424d] text-[var(--mist)] font-['Hack']">
      {/* Navbar with enhanced interactions */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[rgba(43,41,45,0.85)] backdrop-blur-md border-b border-[rgba(255,255,255,0.12)] px-4 py-4 md:py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-8 w-8 mr-2 flex items-center justify-center overflow-visible">
              <img src="/C.svg" alt="Cosm Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-[var(--ac-primary)]">Cosm</h1>
          </div>
          
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
      </header>

      {/* Main Content */}
      <main className="pt-20 px-4 max-w-7xl mx-auto pb-20">
        {/* Enhanced Home Tab with Modern Hero Section */}
        {activeTab === 'home' && (
          <section ref={heroRef} className="relative flex flex-col items-center justify-center min-h-[70vh] mb-16">
            {/* Interactive neonic grid background */}
            <div className="hero-background">
              <div className="hero-grid"></div>
              <div className="hero-glow"></div>
              <div className="hero-particles"></div>
              <div className="blob-gradient"></div>
            </div>
            
            <div className="relative z-10 text-center w-full">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {featuredServices.map((service, index) => (
                    <div key={index} className="glass-item scroll-card modern-card-hover scale-in" style={{animationDelay: `${0.5 + index * 0.05}s`}}>
                      <div className="card-header"> {/* Keep card-header for structure if needed */}
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
        )}

        {/* What We Do Tab - Keep existing code */}
        {activeTab === 'what-we-do' && (
          <div>
            {/* Services Section */}
            <section className="mb-16 fade-in">
              <div className="glass-card">
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--accent-ember)] mb-8 pb-4 border-b border-[rgba(255,255,255,0.15)] accent-border">
                  // Our Services
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {services.map((service, index) => (
                    <div key={index} className="glass-item group p-8 relative overflow-hidden modern-card-hover service-card scale-in" style={{ animationDelay: `${0.1 + index * 0.1}s`}}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--accent-honey)] to-transparent opacity-10 rounded-bl-full"></div>
                      <div className="flex flex-col md:flex-row md:items-start mb-6 gap-4">
                        <div className="p-3 bg-[rgba(245,215,110,0.15)] rounded-lg text-[var(--accent-honey)] flex-shrink-0">
                          <Icon name={service.icon} />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-[var(--accent-honey)]">{service.title}</h3>
                      </div>
                      <p className="text-[#E6E6E6] mb-6 leading-relaxed">
                        {service.description}
                      </p>
                      <ul className="space-y-3">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-[#E6E6E6]">
                            <span className="mr-3 text-[var(--accent-honey)] flex-shrink-0">
                              <Icon name={feature.icon} />
                            </span>
                            {feature.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Process Section */}
            <section className="fade-in" style={{animationDelay: '0.3s'}}>
              <div className="glass-card">
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--accent-ember)] mb-8 pb-4 border-b border-[rgba(255,255,255,0.1)]">
                  // Our Process
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {process.map((step, index) => (
                    <div key={index} className="glass-item p-6 text-center modern-card-hover scale-in" style={{ animationDelay: `${0.4 + index * 0.1}s`}}>
                      <div className="relative w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-[rgba(255,160,122,0.15)] rounded-full">
                        <span className="text-2xl font-bold text-[var(--ac-primary)]">{step.number}</span>
                      </div>
                      <h3 className="text-xl font-bold text-[var(--ac-primary)] mb-4">{step.title}</h3>
                      <p className="text-[#E6E6E6]">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Team Tab with enhanced animations */}
        {activeTab === 'team' && (
          <div className="relative fade-in">
            <div className="glass-card team-container">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--accent-ember)] mb-8 pb-4 border-b border-[rgba(255,255,255,0.1)]">
                // Our Team
              </h2>
              <People people={team} onProfileView={handleProfileView} />
            </div>
          </div>
        )}

        {/* GitHub Profile Tab - Keep existing code with slight enhancements */}
        {activeTab === 'dev-profile' && (
          <div className="fade-in">
            <div className="mb-8">
              <button 
                onClick={() => setActiveTab('team')} 
                className="glass-button inline-flex items-center"
              >
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Team
              </button>
            </div>

            {loading && (
              <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[var(--accent-ember)]"></div>
              </div>
            )}

            {error || !profile ? (
              <div className="glass-card p-8 text-center scale-in">
                <h2 className="text-2xl text-[var(--accent-ember)] mb-4">
                  {error || `Could not find GitHub user "${githubUsername}"`}
                </h2>
                <p className="text-[#E6E6E6]">
                  Please check the username and try again
                </p>
              </div>
            ) : (
              <>
                {/* Profile Header with animations */}
                <div className="glass-card mb-8 p-8 scale-in">
                  <div className="flex flex-col md:flex-row gap-6">
                    <img 
                      src={profile.avatar_url} 
                      alt={profile.name || profile.login} 
                      className="w-32 h-32 rounded-full border-4 border-[var(--accent-ember)]"
                    />
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h1 className="text-3xl font-bold text-[var(--ac-primary)]">{profile.name || profile.login}</h1>
                          <a 
                            href={profile.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--accent-blush)] hover:underline"
                          >
                            @{profile.login}
                          </a>
                        </div>
                        <div className="flex gap-4 mt-3 md:mt-0">
                          <div className="text-center">
                            <div className="text-xl font-bold text-[var(--accent-honey)]">{profile.public_repos}</div>
                            <div className="text-sm text-[#E6E6E6]">Repos</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl font-bold text-[var(--accent-honey)]">{profile.followers}</div>
                            <div className="text-sm text-[#E6E6E6]">Followers</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl font-bold text-[var(--accent-honey)]">{profile.following}</div>
                            <div className="text-sm text-[#E6E6E6]">Following</div>
                          </div>
                        </div>
                      </div>
                      
                      {profile.bio && (
                        <p className="text-[#E6E6E6] mb-4">{profile.bio}</p>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        {profile.location && (
                          <div className="flex items-center text-[#E6E6E6]">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                            </svg>
                            {profile.location}
                          </div>
                        )}
                        {profile.blog && (
                          <div className="flex items-center text-[#E6E6E6]">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
                              <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
                            </svg>
                            <a 
                              href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[var(--accent-blush)] hover:underline truncate"
                            >
                              {profile.blog}
                            </a>
                          </div>
                        )}
                        {profile.twitter_username && (
                          <div className="flex items-center text-[#E6E6E6]">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                            </svg>
                            <a 
                              href={`https://twitter.com/${profile.twitter_username}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[var(--accent-blush)] hover:underline"
                            >
                              @{profile.twitter_username}
                            </a>
                          </div>
                        )}
                        {profile.company && (
                          <div className="flex items-center text-[#E6E6E6]">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                            </svg>
                            {profile.company}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Repositories Grid with staggered animations */}
                <h2 className="text-2xl font-bold text-[var(--ac-primary)] mb-4">Latest Repositories</h2>
                {repos.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {repos.map((repo, index) => (
                      <a 
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-item group p-6 scale-in modern-card-hover"
                        style={{ animationDelay: `${0.1 + index * 0.05}s`}}
                      >
                        <h3 className="text-xl font-semibold text-[var(--accent-honey)]">
                          {repo.name}
                        </h3>
                        <p className="text-[#E6E6E6] mb-4 line-clamp-2">
                          {repo.description || 'No description available'}
                        </p>
                        <div className="flex items-center gap-4">
                          {repo.language && (
                            <span className="text-sm text-[var(--accent-blush)]">
                              {repo.language}
                            </span>
                          )}
                          <span className="flex items-center text-sm text-[#E6E6E6]">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z"/>
                            </svg>
                            {repo.stargazers_count}
                          </span>
                          <span className="flex items-center text-sm text-[#E6E6E6]">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
                            </svg>
                            {repo.forks_count}
                          </span>
                        </div>
                        <div className="text-xs text-[#E6E6E6] mt-3">
                          Updated: {new Date(repo.updated_at).toLocaleDateString()}
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="glass-card p-6 text-center scale-in">
                    <p className="text-[#E6E6E6]">No repositories found</p>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Technologies Tab with enhanced styling */}
        {activeTab === 'tech' && (
          <div className="relative fade-in">
            <div className="glass-card">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--accent-ember)] mb-8 pb-4 border-b border-[rgba(255,255,255,0.15)] accent-border">
                // Technologies
              </h2>
              
              {/* Languages with staggered animations */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-[var(--accent-blush)] mb-6">Languages</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                  {languages.map((lang, index) => (
                    <div key={index} className="glass-item group transition-all scale-in" style={{animationDelay: `${0.1 + index * 0.05}s`}}>
                      <div className="icon-container mb-3 mx-auto flex items-center justify-center">
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
              
              {/* Frameworks with staggered animations */}
              <div className="fade-in" style={{animationDelay: '0.3s'}}>
                <h3 className="text-2xl font-bold text-[var(--accent-blush)] mb-6">Frameworks</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4"> 
                  {frameworks.map((fw, index) => (
                    <div key={index} className="glass-item group transition-all scale-in" style={{animationDelay: `${0.4 + index * 0.05}s`}}>
                      <div className="icon-container mb-3 mx-auto flex items-center justify-center">
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
        )}

        {/* Contact Tab with enhanced styling */}
        {activeTab === 'contact' && (
          <div className="relative fade-in">
            <div className="glass-card text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--accent-ember)] mb-8 pb-4 border-b border-[rgba(255,255,255,0.1)]">
                // Get In Touch
              </h2>
              
              <p className="text-lg text-[var(--mist)] mb-8 max-w-2xl mx-auto">
                Have a project in mind? Let's work together to create something amazing.
              </p>
              
              <a href="mailto:contact@cosm.dev" className="inline-block px-8 py-4 rounded-full glass-button text-[var(--ac-primary)] hover:text-[var(--accent-blush)]">
                contact@cosm.dev
              </a>

              {/* Social links */}
              <div className="mt-12 flex justify-center space-x-6">
                <a href="#" className="p-3 bg-[rgba(255,160,122,0.15)] rounded-full text-[var(--ac-primary)] hover:bg-[rgba(255,160,122,0.25)] transition-all">
                  {/* GitHub icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="#" className="p-3 bg-[rgba(230,107,117,0.15)] rounded-full text-[var(--accent-ember)] hover:bg-[rgba(230,107,117,0.25)] transition-all">
                  {/* Twitter/X icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                  </svg>
                </a>
                <a href="#" className="p-3 bg-[rgba(245,215,110,0.15)] rounded-full text-[var(--accent-honey)] hover:bg-[rgba(245,215,110,0.25)] transition-all">
                  {/* LinkedIn icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        )}
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
  )
}

export default App