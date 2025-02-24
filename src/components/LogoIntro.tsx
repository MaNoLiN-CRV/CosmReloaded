import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';

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
        when: 'beforeChildren',
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
        type: 'spring',
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
        type: 'spring',
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
      animate={isLoaded ? 'visible' : 'hidden'}
      onAnimationComplete={() => onAnimationComplete?.()}
    >
      {/* Background gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#ffa07a]/80  to-transparent" />
      <div className="absolute inset-0 bg-gradient from-[#242424] via-transparent to-transparent" />
      
      {/* Content container */}
   
        <motion.div variants={logoVariants}>
          <Logo color="#fff" width={400} height={400} />
        </motion.div>
        
     
        <p className="absolute bottom-10 right-10 text-2xl font-semibold text-white mt-10 font-fira-code" >
          we develop  
        </p>
        
    </motion.div>
  );
};

