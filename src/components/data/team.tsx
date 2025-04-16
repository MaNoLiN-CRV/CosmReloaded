
import { Person } from './person'; 

const team:  Person[] = [
    {
      name: 'Félix Caba',
      primaryRole: 'Embedded Systems',
      secondaryRole: 'Full-Stack Developer',
      expertise: [
        'Low-level programming',
        'Performance optimization',
        'Concurrent systems design'
      ],
      image: 'felix.jpg',
      github: 'felix-caba',
      linkedin: "https://www.linkedin.com/in/felix-caba-martin/",
      projectsContributions: {
         'Safran WhiteRabbit Protocol Testing Library': 'Helped maintaining & optimizing the library',
         'RusterAPI': 'Lead Developer & Architect',
      },
      bio: 'Félix is an embedded systems junior engineer with a passion for highly optimized code and concurrent programming paradigms. He focuses on pushing the boundaries of what\'s possible with hardware-software integration.'
    },  
    {
      name: 'Manuel Cervantes',
      primaryRole: 'Cybersecurity',
      secondaryRole: 'Full-Stack Developer',
      expertise: [
        'Secure systems architecture',
        'Optimization and performance tuning',
        'Concurrent programming'
      ],
      image: 'manu.jpg',
      github: 'MaNoLiN-CRV',
      linkedin: "https://www.linkedin.com/in/manuel-cervantes-vico-835b99308/",
      projectsContributions: {
        'ExpertLims Lab Application': 'Maintainer & Helper Developer',
        'RusterAPI': 'Lead Developer & Architect',
     },
      bio: 'Manuel specializes in cybersecurity with extensive experience building secure and robust systems. His expertise in optimization and concurrent programming allows him to create efficient solutions.'
    }
  ] 

export default team;