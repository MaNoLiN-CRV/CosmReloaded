import Icon from "../data/icon";
import services from "../data/services";





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