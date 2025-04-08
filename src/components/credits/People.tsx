export interface Person {
  name: string;
  role: string;
  image?: string;
}

interface PeopleProps {
  people: Person[];
}

export default function People({ people }: PeopleProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {people.map((person) => (
        <div 
          key={person.name} 
          className="glass-item group hover:scale-105 transition-transform flex items-center gap-x-4 p-6"
        >
          {person.image && (
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[var(--accent-ember)] to-[var(--ac-primary)] opacity-75 blur group-hover:opacity-100 transition-opacity"></div>
              <img 
                alt={person.name} 
                src={`/${person.image}`} 
                className="relative rounded-full h-16 w-16 object-cover border-2 border-[rgba(255,255,255,0.2)]" 
              />
            </div>
          )}
          <div>
            <h3 className="text-xl font-semibold text-[var(--accent-honey)]">{person.name}</h3>
            <p className="text-[var(--mist)] opacity-80">{person.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
}