import React, { useState } from 'react';
import People from '../credits/People';
import historial from '../data/historial';
import { Person } from '../data/person';


interface TeamProps {
  team: Person[];
  onProfileView: (username: string) => void;
}

const Team: React.FC<TeamProps> = ({ team, onProfileView }) => {
  // Extract unique people from historial
  const people = Array.from(new Set(historial.map(h => h.person)));
  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  const selectedHistorial = historial.find(h => h.person === selectedPerson);
  const jobs = selectedHistorial ? selectedHistorial.jobs : [];
  const [fade, setFade] = useState(true);

  const handleTabClick = (person: string) => {
    if (person === selectedPerson) return;
    setFade(false);
    setTimeout(() => {
      setSelectedPerson(person);
      setFade(true);
    }, 200);
  };

  return  (
    <div className="py-8 px-4 max-w-7xl mx-auto pb-20">
      <div className="mb-16 fade-in">
        <div className="glass-card">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--accent-ember)] mb-8 pb-4 border-b border-[rgba(255,255,255,0.1)]">
            // Our Team
          </h2>
          <People people={team} onProfileView={onProfileView} />
        </div>
      </div>
      {/* Our Historial Card with Tabber */}
      <div className="glass-card mb-8 p-8 scale-in">
        <h2 className="text-2xl font-bold text-[var(--accent-honey)] mb-6">Our Team Historial</h2>
        <div className="flex gap-6 mb-6 flex-wrap">
          {people.map(person => (
            <button
              key={person}
              className={`glass-button shimmer-effect font-semibold px-5 py-2 rounded-lg transition-all duration-200 shadow-md border-2
                 border-transparent ${selectedPerson === person ? 'bg-[var(--accent-blush)] text-[var(--ac-primary)] border-[var(--accent-blush)] scale-105' : 'bg-transparent text-[var(--accent-honey)] hover:bg-[var(--accent-honey)] border-[var(--accent-honey)]'}`}
              onClick={() => handleTabClick(person)}
              style={{ minWidth: 120 }}
            >
              {person}
            </button>
          ))}
        </div>
        <div className={`transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}>
          <ul className="divide-y divide-[rgba(255,255,255,0.08)]">
            {jobs.map((job, idx) => (
              <li key={idx} className="py-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <span className="font-semibold text-[var(--accent-ember)]">{job.business}</span>
                  </div>
                  <div className="text-[var(--white)]">{job.position}</div>
                </div>
                <div className="text-[var(--mist)] mt-1">{job.work}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Team;