import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Person } from '../data/person';
import Icon from '../data/icon';




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
    setSelectedPerson(person);
    
    // Delay setting isModalOpen to allow the portal to mount first
    requestAnimationFrame(() => {
      setIsModalOpen(true);
      
    });
    
    setTimeout(() => {
      setClickedCard(null);
    }, 200);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    // Wait for the closing animation to finish before removing the modal
    setTimeout(() => {
      setSelectedPerson(null);
    }, 500);
  };

  const handleGitHubClick = (e: React.MouseEvent, github: string) => {
    e.stopPropagation();
    e.preventDefault();

    if (onProfileView) {
      onProfileView(github);
    }
  };

  const handleLinkedinClick = (e: React.MouseEvent, linkedin: string) => {
    e.stopPropagation();
    e.preventDefault();
    window.open(linkedin, '_blank');
  }

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
        <div className={`modal-content ${isModalOpen ? 'active' : ''}`} ref={modalRef}>
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

              <div className='flex items-center mt-0 gap-4'>

                {selectedPerson.github && (
                  <button
                    onClick={(e) => handleGitHubClick(e, selectedPerson.github!)}
                    className="mt-6 px-4 py-2 rounded-full glass-button text-[var(--ac-primary)] transition-all inline-flex items-center shimmer-effect fade-in animate-shimmer-infinite"
                    style={{ opacity: 0, animationDelay: '0.4s' }}
                  >
                    <Icon name="github" />

                  </button>
                )}

                {selectedPerson.linkedin && (
                  <button
                    onClick={(e) => handleLinkedinClick(e, selectedPerson.linkedin!)}
                    className="mt-6 px-4 py-2 rounded-full glass-button text-[var(--ac-primary)] transition-all inline-flex items-center shimmer-effect fade-in animate-shimmer-infinite"
                    style={{ opacity: 0, animationDelay: '0.4s' }}
                  >
                    <Icon name="linkedin" />

                  </button>
                )}

              </div>

           

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
                  {selectedPerson.projectsContributions ? (
                    Object.entries(selectedPerson.projectsContributions).map(([project, role], index) => (
                      <li key={index} className="fade-in" style={{ opacity: 0, animationDelay: `${0.75 + index * 0.05}s` }}>
                        <span className="font-extrabold text-[var(--white)]">{project}</span>: {role}
                      </li>
                    ))
                  ) : (
                    <>
                      <li className="fade-in" style={{ opacity: 0, animationDelay: '0.75s' }}>Led development of high-performance systems</li>
                      <li className="fade-in" style={{ opacity: 0, animationDelay: '0.8s' }}>Contributed to open source projects</li>
                      <li className="fade-in" style={{ opacity: 0, animationDelay: '0.85s' }}>Specialized research in advanced technologies</li>
                    </>
                  )}
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
      
    
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative pt-1">
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
                    <Icon name="github" />
                  </button>
                )}
                {/* LinkedIn */}
                {person.linkedin && (
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3 right-12 z-20 p-2 hover:bg-[rgba(255,255,255,0.1)] rounded-full transition-all"
                    aria-label={`View ${person.name}'s LinkedIn profile`}
                  >
                    <Icon name="linkedin" />
                  </a>
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