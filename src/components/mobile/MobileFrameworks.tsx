import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export interface Framework {
  name: string;
  icon: string;
  color: string;
}

interface MobileFrameworksProps {
  frameworks: Framework[];
}

const MobileFrameworks: React.FC<MobileFrameworksProps> = ({ frameworks }) => {
  const controls = useAnimationControls();
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.5 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const contentHeight = container.scrollHeight;
    const containerHeight = container.clientHeight;

    if (contentHeight > containerHeight) {
      const animation = async () => {
        await controls.start({
          y: [0, -(contentHeight - containerHeight)],
          transition: {
            duration: 20,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 1
          },
        });
      };
      animation();
    }
  }, [controls]);

  useEffect(() => {
    if (isIntersecting) {
      controls.start({ opacity: 1, scale: 1 });
    } else {
      controls.start({ opacity: 0, scale: 0.8 });
    }
  }, [isIntersecting, controls]);

  return (
    <div ref={ref as any} className="min-h-screen flex items-center justify-center bg-[#242424] relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#ffa07a]/10 to-transparent pointer-events-none" />
      
      {/* Background Text */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute top-1/4 w-full text-center"
      >
        <h2 className="text-8xl font-bold text-white/5 tracking-widest">
          MOBILE DEVELOP
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={controls}
        transition={{ duration: 1, delay: 1 }}
        className="relative"
      >
        {/* Mobile frame with lighter background */}
        <div className="relative w-[300px] h-[600px] rounded-[3rem] border-4 border-white/20 
                      bg-gray-800/80 shadow-2xl overflow-hidden backdrop-blur-xl
                      before:absolute before:inset-0 before:bg-gradient-to-b 
                      before:from-white/10 before:to-transparent">
          {/* Reflection effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50" />
          
          {/* Notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl" />
          
          {/* Screen content */}
          <div className="relative h-full flex items-center justify-center overflow-hidden">
            {/* Gradient overlays for smooth scroll */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-800/90 to-transparent z-10" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-800/90 to-transparent z-10" />
            
            <motion.div
              ref={containerRef}
              className="flex flex-col gap-6 px-8"
              animate={controls}
            >
              {frameworks.map((framework, index) => (
                <motion.div
                  key={`${framework.name}-${index}`}
                  className="group relative flex items-center gap-4 p-4 rounded-xl bg-white/10 
                           backdrop-blur-sm border border-white/10 transition-all duration-300
                           hover:bg-white/20 hover:border-[#ffa07a]/20"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-12 h-12 rounded-lg bg-black/20 p-2 flex items-center justify-center
                                group-hover:scale-110 transition-transform duration-300">
                    <img
                      src={framework.icon}
                      alt={framework.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-[#ffa07a] 
                                 transition-colors duration-300">
                      {framework.name}
                    </h3>
                    <div 
                      className="w-12 h-0.5 transition-all duration-300 group-hover:w-16"
                      style={{ backgroundColor: framework.color }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Mobile shadow */}
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-[250px] h-[20px] 
                      bg-black/20 blur-xl rounded-full" />
      </motion.div>
    </div>
  );
};

export default MobileFrameworks;