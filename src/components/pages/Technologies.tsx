import React from 'react';

interface TechnologyItem {
  name: string;
  icon: string;
  color: string;
}

interface TechnologiesProps {
  languages: TechnologyItem[];
  frameworks: TechnologyItem[];
}

const Technologies: React.FC<TechnologiesProps> = ({ languages, frameworks }) => {
  return (
    <div className="py-8 px-4 max-w-7xl mx-auto fade-in">
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
  );
};

export default Technologies;