import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export interface Person {
  name: string;
  primaryRole?: string;
  secondaryRole?: string;
  role?: string; // Keep for backward compatibility
  expertise?: string | string[];
  image?: string;
  github?: string;
  bio?: string; // Additional info to show when expanded
}

interface PeopleProps {
  people: Person[];
  onProfileView?: (username: string) => void;
}

export default function People({ people, onProfileView }: PeopleProps) {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [clickedCard, setClickedCard] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animatedItems, setAnimatedItems] = useState<string[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  // Setup staggered entrance animation for cards
  useEffect(() => {
    const timer = setTimeout(() => {
      const names = people.map(person => person.name);
      setAnimatedItems(names);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [people]);

  // Handler for opening the modal with the selected person
  const handlePersonClick = (person: Person) => {
    setClickedCard(person.name);
    
    setTimeout(() => {
      setClickedCard(null);
      setSelectedPerson(person);
      setIsModalOpen(true);
    }, 100);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedPerson(null);
    }, 500); // Extended for smoother animation
  };

  const handleGitHubClick = (e: React.MouseEvent, github: string) => {
    e.stopPropagation();
    e.preventDefault();
 
    if (onProfileView) {
      onProfileView(github);
    }
  };

  // Close modal with escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    // Close modal when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node) && isModalOpen) {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  // Render the modal using a portal to avoid containment issues
  const renderModal = () => {
    if (!selectedPerson) return null;
    
    return createPortal(
      <div className={`modal-backdrop ${isModalOpen ? 'active' : ''}`}>
        <div className="modal-content" ref={modalRef}>
          <div className="modal-header">
            <h2 className="text-2xl font-bold text-[var(--accent-honey)] text-glow-honey">
              {selectedPerson.name}
            </h2>
            <button 
              className="modal-close-button"
              onClick={closeModal}
              aria-label="Close details"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="md:flex gap-6">
            {/* Left column: Person info */}
            <div className="md:w-1/3 flex flex-col items-center mb-6 md:mb-0 fade-in" style={{ opacity: 0, animationDelay: '0.1s' }}>
              {selectedPerson.image && (
                <div className="relative mx-auto md:mx-0 mb-4 scale-in" style={{ opacity: 0, animationDelay: '0.2s' }}>
                  <div className="absolute -inset-1 rounded-full"></div>
                  <img 
                    alt={selectedPerson.name} 
                    src={`/${selectedPerson.image}`} 
                    className="relative rounded-full h-36 w-36 object-cover border-2 border-[rgba(255,255,255,0.2)]" 
                  />
                </div>
              )}
              
              {(selectedPerson.primaryRole || selectedPerson.secondaryRole) ? (
                <>
                  <p className="text-[var(--accent-blush)] font-medium text-lg fade-in" style={{ opacity: 0, animationDelay: '0.3s' }}>{selectedPerson.primaryRole}</p>
                  <p className="text-[var(--accent-blush)] fade-in" style={{ opacity: 0, animationDelay: '0.35s' }}>{selectedPerson.secondaryRole}</p>
                </>
              ) : (
                <p className="text-[var(--accent-blush)] font-medium text-lg fade-in" style={{ opacity: 0, animationDelay: '0.3s' }}>{selectedPerson.role}</p>
              )}
              
              {selectedPerson.github && (
                <button
                  onClick={(e) => handleGitHubClick(e, selectedPerson.github!)}
                  className="mt-6 px-4 py-2 rounded-full glass-button text-[var(--ac-primary)] transition-all inline-flex items-center shimmer-effect fade-in animate-shimmer-infinite"
                  style={{ opacity: 0, animationDelay: '0.4s' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub Profile
                </button>
              )}
            </div>
            
            {/* Right column: Details */}
            <div className="md:w-2/3 md:border-l border-[rgba(255,255,255,0.1)] md:pl-6">
              <div className="mb-6 fade-in" style={{ opacity: 0, animationDelay: '0.5s' }}>
                <h3 className="text-xl font-medium text-[var(--accent-honey)] mb-3 text-glow-honey">About</h3>
                <p className="text-[var(--mist)] leading-relaxed">
                  {selectedPerson.bio || `${selectedPerson.name} is a passionate developer with expertise in ${selectedPerson.primaryRole?.toLowerCase() || ''} and ${selectedPerson.secondaryRole?.toLowerCase() || ''}.`}
                </p>
              </div>
              
              <div className="mb-6 fade-in" style={{ opacity: 0, animationDelay: '0.6s' }}>
                <h3 className="text-xl font-medium text-[var(--accent-honey)] mb-3 text-glow-honey">Expertise</h3>
                {Array.isArray(selectedPerson.expertise) ? (
                  <ul className="text-[var(--mist)] leading-relaxed list-disc pl-5 space-y-2">
                    {selectedPerson.expertise.map((item, index) => (
                      <li key={index} className="fade-in" style={{ opacity: 0, animationDelay: `${0.65 + index * 0.1}s` }}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[var(--mist)] leading-relaxed">{selectedPerson.expertise}</p>
                )}
              </div>
              
              <div className="fade-in" style={{ opacity: 0, animationDelay: '0.7s' }}>
                <h3 className="text-xl font-medium text-[var(--accent-honey)] mb-3 text-glow-honey">Projects & Contributions</h3>
                <ul className="text-[var(--mist)] leading-relaxed list-disc pl-5 space-y-2">
                  <li className="fade-in" style={{ opacity: 0, animationDelay: '0.75s' }}>Led development of high-performance systems</li>
                  <li className="fade-in" style={{ opacity: 0, animationDelay: '0.8s' }}>Contributed to open source projects</li>
                  <li className="fade-in" style={{ opacity: 0, animationDelay: '0.85s' }}>Specialized research in advanced technologies</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative pt-1 pb-16">
        {/* Regular cards */}
        {people.map((person, index) => {
          const isClicked = clickedCard === person.name;
          const hasAnimated = animatedItems.includes(person.name);
          
          return (
            <div 
              key={person.name} 
              className={`glass-item profile-item group p-0 overflow-hidden flex flex-col h-full 
                ${isClicked ? 'animate-click' : ''}
                ${hasAnimated ? 'fade-in' : ''}
                duration-300 person-card modern-card-hover transition-all cursor-pointer`}
              onClick={() => handlePersonClick(person)}
              style={{ 
                opacity: hasAnimated ? undefined : 0, 
                animationDelay: `${index * 0.15}s` 
              }}
            >            
              <div className="flex flex-col items-center sm:flex-row p-6 gap-5 flex-grow">
                {person.image && (
                  <div className="relative flex-shrink-0 mx-auto sm:mx-0 profile-image-wrapper">
                    <div className="absolute -inset-1"></div>
                    <img 
                      alt={person.name} 
                      src={`/${person.image}`} 
                      className={`relative rounded-full h-24 w-24 object-cover border-2 border-[rgba(255,255,255,0.2)] ${isClicked ? 'animate-profilePulse' : ''}`}
                    />
                  </div>
                )}
                <div className="flex flex-col justify-center items-center sm:items-start text-center sm:text-left">
                  <h3 className="text-xl font-semibold text-[var(--accent-honey)] text-glow-honey">{person.name}</h3>
                  {(person.primaryRole || person.secondaryRole) ? (
                    <>
                      <p className="text-[var(--accent-blush)] font-medium">{person.primaryRole}</p>
                      <p className="text-[var(--accent-blush)] text-sm">{person.secondaryRole}</p>
                    </>
                  ) : (
                    <p className="text-[var(--accent-blush)] font-medium">{person.role}</p>
                  )}
                </div>
              </div>
              
              {/* Team card overlay with details preview */}
              <div className="team-overlay hidden sm:block">
                <p className="text-sm text-[var(--mist)] mb-2 line-clamp-2">
                  {person.bio ? person.bio.substring(0, 120) + '...' : `Expert in ${person.primaryRole}`}
                </p>
                <button className="glass-button text-sm px-3 py-1 w-full text-center">
                  View Profile
                </button>
              </div>
              
              {/* GitHub button */}
              {person.github && (
                <button 
                  className="absolute top-3 right-3 z-20 p-2 hover:bg-[rgba(255,255,255,0.1)] rounded-full transition-all"
                  onClick={(e) => handleGitHubClick(e, person.github!)}
                  aria-label={`View ${person.name}'s GitHub profile`}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                    className="text-[var(--accent-blush)] hover:text-[var(--accent-ember)] transition-colors"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Render the modal with portal */}
      {renderModal()}
    </>
  );
}