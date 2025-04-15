


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





const WhatWeDo: React.FC = () => {
  return (


    <div className="py-8 px-4 max-w-7xl mx-auto fade-in">
      {/* Services Section */}
      <section className="mb-16 fade-in">
        <div className="glass-card">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--accent-ember)] mb-8 pb-4 border-b border-[rgba(255,255,255,0.15)] accent-border">
          // Our Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8"
          > 
            {services.map((service, index) => (
               <div
               className="scale-in"
               style={{ animationDelay: `${0.1 + index * 0.1}s` }}
               key={index}
             >
              <div key={index} className="glass-item group p-8 relative overflow-hidden modern-card-hover h-full" style={{ animationDelay: `${0.1 + index * 0.1}s` }}>
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="fade-in" style={{ animationDelay: '0.3s' }}>
        <div className="glass-card">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--accent-ember)] mb-8 pb-4 border-b border-[rgba(255,255,255,0.1)]">
          // Our Process
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {process.map((step, index) => (
              <div key={index} className="glass-item p-6 text-center modern-card-hover scale-in" style={{ animationDelay: `${0.4 + index * 0.1}s` }}>
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


  );
}

export default WhatWeDo