// AnimatedSections.tsx
import React, { useEffect, useState } from 'react';

interface AnimatedSectionsProps {
  children: React.ReactNode;
}

const AnimatedSections = ({ children }: AnimatedSectionsProps) => {
  const [activeSection, setActiveSection] = useState(0);
  const [scrolling, setScrolling] = useState(false);
  const sections = React.Children.toArray(children);

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (scrolling) return;
      setScrolling(true);
      setTimeout(() => setScrolling(false), 1000);

      if (e.deltaY > 0 && activeSection < sections.length - 1) {
        setActiveSection((prev) => prev + 1);
      } else if (e.deltaY < 0 && activeSection > 0) {
        setActiveSection((prev) => prev - 1);
      }
    };

    window.addEventListener('wheel', handleScroll);
    return () => window.removeEventListener('wheel', handleScroll);
  }, [activeSection, scrolling, sections.length]);

  const handleNavClick = (index: number) => {
    setActiveSection(index);
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#242424]">
      {/* Side Navigation */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
        <div className="flex flex-col gap-4">
          {sections.map((_, index) => (
            <button
              key={index}
              onClick={() => handleNavClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === index ? 'bg-white scale-150' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Sections Container */}
      <div
        className="transition-transform duration-1000 ease-in-out h-full"
        style={{ transform: `translateY(-${activeSection * 100}%)` }}
      >
        {sections.map((section, index) => (
          <div
            key={index}
            className={`h-full w-full flex items-center justify-center bg-[#242424]
              transition-opacity duration-1000
              ${activeSection === index }`}
          >
            <div
              className={`w-full h-full transform transition-all duration-1000
                ${activeSection === index ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
            >
              {section}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedSections;