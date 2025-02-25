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
    <div className="relative bg-gradient-to-b from-[#ffa07a] to-[#242424] py-12 sm:py-16 transform -skew-y-3 rounded-lg flex items-center justify-center mt-40">
      <div className="container mx-auto max-w-6xl p-10 xl:grid xl:grid-cols-3 xl:gap-10">
        <div className="xl:col-span-1">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl [text-shadow:0.5px_1px_2px_black]">
            Meet the Team
          </h2>
          <p className="mt-6 mb-7 text-lg text-gray-300 font-mono [text-shadow:0.5px_0.5px_1px_black]">
            We are a small team of developers, designers, and creators. We are passionate about what we do and are always looking for new challenges.
          </p>
        </div>
        <div className="xl:col-span-2">
          <ul role="list" className="flex flex-col items-center gap-8 sm:gap-10">
            {people.map((person) => (
              <li key={person.name} className="transition-transform duration-300 hover:scale-105 w-full max-w-md">
                <div className="flex items-center gap-x-6 p-4 bg-gray-800 bg-opacity-60 backdrop-filter backdrop-blur-lg backdrop-saturate-200 rounded-lg shadow-lg">
                  {person.image && <img alt={person.name} src={`/${person.image}`} className="rounded-full h-16 w-16 object-cover" />}
                  <div>
                    <h3 className="text-lg font-semibold text-white">{person.name}</h3>
                    <p className="text-sm text-gray-400">{person.role}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

