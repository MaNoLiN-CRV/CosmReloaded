const people = [
  {
    name: 'Leslie Alexander',
    role: 'Co-Founder / CEO',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  
  {
    name: 'Hedy Lamarr',
    role: 'Co-Founder',
    imageUrl: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  // More people...
]

export default function People() {
  return (
    <div className="bg-gradient-to-b from-blue-400 to-black py-12 sm:py-16 transform -skew-y-3 rounded-lg">
      <div className="container mx-auto max-w-6xl p-10 xl:grid xl:grid-cols-3 xl:gap-10">
        <div className="xl:col-span-1">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Meet Our Leadership
          </h2>
          <p className="mt-6 text-lg text-gray-300">
            We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the best results for our clients.
          </p>
        </div>
        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2 xl:gap-x-10">
          {people.map((person) => (
            <li key={person.name} className="transition-transform duration-300 hover:scale-105">
              <div className="flex items-center gap-x-6 p-4 bg-gray-800 rounded-lg shadow-lg">
                <img alt={person.name} src={person.imageUrl} className="rounded-full h-16 w-16" />
                <div>
                  <h3 className="text-lg font-semibold text-white">{person.name}</h3>
                  <p className="text-sm text-indigo-500">{person.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}