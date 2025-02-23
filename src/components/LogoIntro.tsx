import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LogoIntroProps {
  onAnimationComplete?: () => void;
}

export const LogoIntro: React.FC<LogoIntroProps> = ({ onAnimationComplete }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const containerVariants = {
    hidden: {
      backgroundColor: '#242424',
    },
    visible: {
      backgroundColor: '#242424',
      transition: {
        duration: 3,
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };

  const logoVariants = {
    hidden: {
      scale: 0.8,
      opacity: 0,
      y: 20
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      x: -20
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <motion.div
      className="relative flex items-center justify-center min-h-screen w-full overflow-hidden bg-[#242424]"
      variants={containerVariants}
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      onAnimationComplete={() => onAnimationComplete?.()}
    >
      {/* Background gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#ffa07a]/80  to-transparent" />
      <div className="absolute inset-0 bg-gradient from-[#242424] via-transparent to-transparent" />
      
      {/* Content container */}
      <div className="relative z-10 flex items-center gap-4 ... hover:scale-110 transition-transform duration-500">
        <motion.img
          src="/C.svg"
          alt="Logo"
          className="w-40 h-40 drop-shadow-2xl"
          variants={logoVariants}
          draggable={false}
        />
        
        <motion.h1
          className="text-12xl font-bold text-white tracking-wider drop-shadow-2xl"
          style={{
            fontFamily: 'Bebas Neue',
            WebkitTextStroke: '1px rgba(255,255,255,0.1)'
          }}
          variants={textVariants}
        >
          <span className=" bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Cosm
          </span>
        </motion.h1>
      </div>
    </motion.div>
  );
};
