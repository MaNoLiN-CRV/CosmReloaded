import { motion } from 'framer-motion';

interface Language {
  name: string;
  icon: string;
  color: string;
}

interface LanguageScrollProps {
  languages: Language[];
}

const LanguageScroll: React.FC<LanguageScrollProps> = ({ languages }) => {
  const containerVariants = {
    animate: {
      x: [0, -1000],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
          repeatDelay: 0,
        },
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden bg-[#242424]">
      <div className="relative w-full max-w-6xl mx-auto ">
        <h2 className="text-4xl p-3 font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-[#ff9900] to-[#ff008e]">
          Technologies We Master
        </h2>
        
        <motion.div 
          className="flex gap-12 py-8"
          variants={containerVariants}
          animate="animate"
          style={{ width: "fit-content" }}
        >
          {[...languages, ...languages, ...languages].map((lang, index) => (
            <motion.div
              key={`${lang.name}-${index}`}
              className="flex flex-col items-center justify-center w-64 h-64 bg-gray-800/50 
                       rounded-xl backdrop-blur-sm p-6 hover:scale-120 transition-transform
                       border border-white border-opacity-10"
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="w-24 h-24 mb-4">
                <img
                  src={lang.icon}
                  alt={lang.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {lang.name}
              </h3>
              <div 
                className="w-16 h-1 rounded-full"
                style={{ backgroundColor: lang.color }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LanguageScroll;