import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface Language {
  name: string;
  icon: string;
  color: string;
}

interface LanguageScrollProps {
  languages: Language[];
}

const LanguageScroll: React.FC<LanguageScrollProps> = ({ languages }) => {
  const controls = useAnimationControls();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const itemWidth = container.scrollWidth / 2;

    const animation = async () => {
      await controls.start({
        x: [0, -itemWidth],
        transition: {
          duration: 30,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
          times: [0, 1],
        },
      });
    };

    animation();
  }, [controls]);

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden bg-[#242424] relative">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#ffa07a]/10 to-transparent pointer-events-none" />
      
      <div className="relative w-full max-w-7xl mx-auto px-4">
        <div className="space-y-4 text-center mb-20">
          <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ffa07a] to-[#ff008e] 
                         filter drop-shadow-lg tracking-tight p-5">
            Technologies We Master
          </h2>
          <p className="text-gray-400 text-lg font-mono">
            Our expertise spans across modern technologies
          </p>
        </div>
        
        <div className="relative">
          {/* Gradient masks for smooth scroll edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#242424] via-[#242424]/80 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#242424] via-[#242424]/80 to-transparent z-10" />
          
          <div className="overflow-hidden">
            <motion.div 
              ref={containerRef}
              className="flex gap-12 py-8"
              animate={controls}
              style={{ width: "fit-content" }}
            >
              {/* Only duplicate once for seamless loop */}
              {[...languages, ...languages ].map((lang, index) => (
                <motion.div
                  key={`${lang.name}-${index}`}
                  className="group relative flex flex-col items-center justify-center w-72 h-72 
                           rounded-2xl p-8 transition-all duration-300 transform"
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Card background with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-800/80 to-gray-900/80 
                                rounded-2xl border border-white/5 backdrop-blur-sm 
                                group-hover:border-[#ffa07a]/20 transition-all duration-300" />
                  
                  {/* Content */}
                  <div className="relative z-10 space-y-6">
                    <div className="w-28 h-28 mb-4 p-4 rounded-xl bg-black/20 
                                  transform group-hover:scale-110 transition-transform duration-300">
                      <img
                        src={lang.icon}
                        alt={lang.name}
                        className="w-full h-full object-contain filter drop-shadow-lg"
                      />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-white group-hover:text-[#ffa07a] 
                                   transition-colors duration-300">
                        {lang.name}
                      </h3>
                      <div 
                        className="w-16 h-1 mx-auto rounded-full transition-all duration-300 
                                 group-hover:w-24 group-hover:drop-shadow-lg"
                        style={{ backgroundColor: lang.color }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageScroll;