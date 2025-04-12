import { Link } from 'react-router-dom';
import { Server, Zap, Link as LinkIcon, Globe, Smartphone, Database, Shield, Gauge } from 'lucide-react';

// Optimized animation variants - smoother and less likely to flicker
const fadeIn = {
  hidden: { opacity: 0, y: 10 }, // Reduced movement amount
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1], // Using a cubic bezier curve for smoother motion
      when: "beforeChildren" 
    } 
  }
};

const staggerContainer = {
  hidden: { opacity: 1 }, // Start with opacity 1 to avoid container flash
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Reduce staggering time
      delayChildren: 0.05,
    }
  }
};

// Smoother hover animations
const cardHover = {
  scale: 1.02, // Reduced scale amount
  transition: { 
    duration: 0.3,
    ease: "easeOut"
  }
};

const buttonHover = {
  scale: 1.03, // Reduced scale amount
  boxShadow: "0 6px 15px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 160, 122, 0.1)",
  transition: { 
    duration: 0.3,
    ease: "easeOut"
  }
};

// Optimized style for GPU acceleration
const gpuAccelerationStyle = { 
  willChange: 'transform', 
  backfaceVisibility: 'hidden',
  WebkitFontSmoothing: 'subpixel-antialiased'
};

export default function WhatWeDo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2b292e] via-[#3a353c] to-[#50424d] text-[var(--mist)] font-['Hack']">
      {/* Header/Navbar (reusing the style from main page) */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[rgba(43,41,45,0.75)] backdrop-blur-md border-b border-[rgba(255,255,255,0.12)] px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <div className="h-8 w-8 mr-2 flex items-center justify-center">
              <img src="/C.svg" alt="Cosm Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-[var(--ac-primary)]">Cosm</h1>
          </Link>
          
          <Link to="/" className="glass-button inline-flex items-center px-4 py-2">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 px-4 max-w-7xl mx-auto overflow-hidden">
        {/* Hero Section - Simplified animation approach */}
        <section 
          className="relative flex flex-col items-center justify-center min-h-[50vh] mb-16"
        >
          <div className="absolute inset-0 bg-[url('/background-grid.svg')] opacity-15 z-0"></div>
          
          <div className="relative z-10 text-center">
            <h1 
              className="text-5xl md:text-7xl font-bold text-[var(--ac-primary)] mb-4 text-glow"
            >
              Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent-blush)] to-[var(--accent-ember)]">Expertise</span>
            </h1>
            
            <p 
              className="text-xl md:text-2xl text-[var(--mist)] max-w-3xl mx-auto mb-8"
            >
              Powering your digital transformation with cutting-edge technology solutions and performance-optimized architectures
            </p>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-full max-w-md h-10 bg-gradient-to-r from-transparent via-[rgba(255,160,122,0.25)] to-transparent blur-md"></div>
        </section>

        {/* Services Grid - With optimized animations */}
        <div className="mb-24">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(245,215,110,0.15)] to-[rgba(254,205,178,0.15)] rounded-3xl blur-xl transform -translate-y-4"></div>
            
            <div className="relative glass-card">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--accent-ember)] mb-12 pb-4 border-b border-[rgba(255,255,255,0.15)] accent-border">
                // Our Services
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Service cards - Each with individual animations */}
                  <div 
                    className="glass-item group p-8 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--accent-honey)] to-transparent opacity-10 rounded-bl-full"></div>
                    <div className="flex items-start mb-6">
                      <div className="p-3 bg-[rgba(245,215,110,0.15)] rounded-lg mr-4">
                        <Server className="w-8 h-8 text-[var(--accent-honey)]" />
                      </div>
                      <h3 className="text-2xl font-bold text-[var(--accent-honey)]">High-Performance Backend</h3>
                    </div>
                    <p className="text-[var(--mist)] mb-6 leading-relaxed">
                      We architect efficient backend systems engineered for optimal performance. Our solutions implement sophisticated caching mechanisms, data compression, and robust authentication frameworks that maximize speed, security, and overall system efficiency.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-[var(--mist)]">
                        <Gauge className="w-5 h-5 mr-2 text-[var(--accent-honey)]" />
                        Advanced load balancing and performance optimization
                      </li>
                      <li className="flex items-center text-[var(--mist)]">
                        <Database className="w-5 h-5 mr-2 text-[var(--accent-honey)]" />
                        Intelligent caching strategies for reduced latency
                      </li>
                      <li className="flex items-center text-[var(--mist)]">
                        <Shield className="w-5 h-5 mr-2 text-[var(--accent-honey)]" />
                        Secure authentication and authorization frameworks
                      </li>
                    </ul>
                  </div>
                  
                  <div 
                    className="glass-item group p-8 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--accent-ember)] to-transparent opacity-10 rounded-bl-full"></div>
                    <div className="flex items-start mb-6">
                      <div className="p-3 bg-[rgba(230,107,117,0.15)] rounded-lg mr-4">
                        <LinkIcon className="w-8 h-8 text-[var(--accent-ember)]" />
                      </div>
                      <h3 className="text-2xl font-bold text-[var(--accent-ember)]">Seamless System Integration</h3>
                    </div>
                    <p className="text-[var(--mist)] mb-6 leading-relaxed">
                      We specialize in connecting disparate systems into cohesive, efficient ecosystems. Our integration solutions enable flawless communication between platforms, creating unified workflows that enhance productivity and data consistency across your entire technology stack.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-[var(--mist)]">
                        <Zap className="w-5 h-5 mr-2 text-[var(--accent-ember)]" />
                        Automated data synchronization and transformation
                      </li>
                      <li className="flex items-center text-[var(--mist)]">
                        <LinkIcon className="w-5 h-5 mr-2 text-[var(--accent-ember)]" />
                        API development and integration with third-party services
                      </li>
                      <li className="flex items-center text-[var(--mist)]">
                        <Server className="w-5 h-5 mr-2 text-[var(--accent-ember)]" />
                        Microservices architecture and orchestration
                      </li>
                    </ul>
                  </div>
                  
                  <div 
                    className="glass-item group p-8 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--accent-blush)] to-transparent opacity-10 rounded-bl-full"></div>
                    <div className="flex items-start mb-6">
                      <div className="p-3 bg-[rgba(254,205,178,0.15)] rounded-lg mr-4">
                        <Globe className="w-8 h-8 text-[var(--accent-blush)]" />
                      </div>
                      <h3 className="text-2xl font-bold text-[var(--accent-blush)]">Optimized Web Solutions</h3>
                    </div>
                    <p className="text-[var(--mist)] mb-6 leading-relaxed">
                      We craft web applications that deliver exceptional user experiences without compromising on performance. Through advanced optimization techniques, asset management, and cutting-edge rendering strategies, we build web platforms that load instantly and perform flawlessly.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-[var(--mist)]">
                        <Zap className="w-5 h-5 mr-2 text-[var(--accent-blush)]" />
                        Next-generation performance optimization techniques
                      </li>
                      <li className="flex items-center text-[var(--mist)]">
                        <Globe className="w-5 h-5 mr-2 text-[var(--accent-blush)]" />
                        Responsive, accessible, and standards-compliant interfaces
                      </li>
                      <li className="flex items-center text-[var(--mist)]">
                        <Gauge className="w-5 h-5 mr-2 text-[var(--accent-blush)]" />
                        Advanced code splitting and resource management
                      </li>
                    </ul>
                  </div>
                  
                  <div 
                    className="glass-item group p-8 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--ac-primary)] to-transparent opacity-10 rounded-bl-full"></div>
                    <div className="flex items-start mb-6">
                      <div className="p-3 bg-[rgba(255,160,122,0.15)] rounded-lg mr-4">
                        <Smartphone className="w-8 h-8 text-[var(--ac-primary)]" />
                      </div>
                      <h3 className="text-2xl font-bold text-[var(--ac-primary)]">Mobile Application Development</h3>
                    </div>
                    <p className="text-[var(--mist)] mb-6 leading-relaxed">
                      We develop high-performance mobile applications that provide seamless experiences across all devices. Our mobile solutions combine elegant, intuitive interfaces with sophisticated backend integration to create powerful yet lightweight applications that users love.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-[var(--mist)]">
                        <Smartphone className="w-5 h-5 mr-2 text-[var(--ac-primary)]" />
                        Cross-platform and native application development
                      </li>
                      <li className="flex items-center text-[var(--mist)]">
                        <Zap className="w-5 h-5 mr-2 text-[var(--ac-primary)]" />
                        Battery-efficient code and optimized resource consumption
                      </li>
                      <li className="flex items-center text-[var(--mist)]">
                        <Shield className="w-5 h-5 mr-2 text-[var(--ac-primary)]" />
                        Secure local storage and offline functionality
                      </li>
                    </ul>
                  </div>
              </div>
              
              <div 
                className="text-center mt-16"
              >
                <div 
                  className="inline-block"
                >
                  <Link 
                    to="/#contact" 
                    className="px-8 py-4 rounded-full glass-button text-[var(--ac-primary)] inline-flex items-center"
                  >
                    Discuss Your Project
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Process Section - With optimized animations */}
        <div className="mb-24">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(177,182,149,0.1)] to-[rgba(255,160,122,0.1)] rounded-3xl blur-xl transform -translate-y-4"></div>
            
            <div className="relative glass-card">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--accent-ember)] mb-12 pb-4 border-b border-[rgba(255,255,255,0.1)]">
                // Our Process
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div 
                    className="glass-item p-6 text-center"
                  >
                    <div className="relative w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-[rgba(255,160,122,0.15)] rounded-full">
                      <span className="text-2xl font-bold text-[var(--ac-primary)]">01</span>
                    </div>
                    <h3 className="text-xl font-bold text-[var(--ac-primary)] mb-4">Discovery & Planning</h3>
                    <p className="text-[var(--mist)]">
                      We begin by understanding your challenges, goals, and requirements, establishing a clear roadmap for your solution's development.
                    </p>
                  </div>
                  
                  <div 
                    className="glass-item p-6 text-center"
                  >
                    <div className="relative w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-[rgba(245,215,110,0.15)] rounded-full">
                      <span className="text-2xl font-bold text-[var(--accent-honey)]">02</span>
                    </div>
                    <h3 className="text-xl font-bold text-[var(--accent-honey)] mb-4">Development & Testing</h3>
                    <p className="text-[var(--mist)]">
                      Our engineering team builds your solution using agile methodologies, with continuous testing and optimization throughout the process.
                    </p>
                  </div>
                  
                  <div 
                    className="glass-item p-6 text-center"
                  >
                    <div className="relative w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-[rgba(230,107,117,0.15)] rounded-full">
                      <span className="text-2xl font-bold text-[var(--accent-ember)]">03</span>
                    </div>
                    <h3 className="text-xl font-bold text-[var(--accent-ember)] mb-4">Deployment & Support</h3>
                    <p className="text-[var(--mist)]">
                      After thorough testing, we deploy your solution and provide ongoing support, monitoring, and optimization to ensure optimal performance.
                    </p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer - similar to the main page */}
      <footer className="bg-[rgba(43,41,45,0.7)] backdrop-blur-md border-t border-[rgba(255,255,255,0.1)] py-8 relative z-10">
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
}
