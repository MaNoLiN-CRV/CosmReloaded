import React from 'react';
import People from '../credits/People';

// Define interfaces for team member data
interface TeamMember {
  name: string;
  primaryRole: string;
  secondaryRole?: string;
  expertise: string[];
  image: string;
  github: string;
  bio: string;
}

interface TeamProps {
  team: TeamMember[];
  onProfileView: (username: string) => void;
}

const Team: React.FC<TeamProps> = ({ team, onProfileView }) => {
  return (
    <div className="py-8 px-4 max-w-7xl mx-auto pb-20">
      <div className="mb-16 fade-in">
        <div className="glass-card">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--accent-ember)] mb-8 pb-4 border-b border-[rgba(255,255,255,0.1)]">
            // Our Team
          </h2>
          <People people={team} onProfileView={onProfileView} />
        </div>
      </div>
    </div>
  );
};

export default Team;