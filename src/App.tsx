import { useState, useEffect } from 'react'
import './App.css'
import { fetchGithubData } from './utils/github'

// Import components
import Layout from './components/layout/Layout'
import Home from './components/pages/Home'
import WhatWeDo from './components/pages/WhatWeDo'
import Team from './components/pages/Team'
import Technologies from './components/pages/Technologies'
import Contact from './components/pages/Contact'
import DevProfile from './components/pages/DevProfile'

// Data
const team = [
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
    bio: 'Félix is an embedded systems specialist with a passion for highly optimized code and concurrent programming paradigms. He focuses on pushing the boundaries of what\'s possible with hardware-software integration.'
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
    bio: 'Manuel specializes in cybersecurity with extensive experience building secure and robust systems. His expertise in optimization and concurrent programming allows him to create efficient solutions.'
  }
] 

const languages = [
  {
    name: 'Rust',
    icon: '/icons/rust-original.svg',
    color: '#e34f26'
  },
  {
    name: 'Java',
    icon: '/icons/java-original.svg',
    color: '#f7df1e'
  },
  {
    name: 'TypeScript',
    icon: '/icons/typescript-original.svg',
    color: '#1572b6'
  },
  {
    name: 'C',
    icon: '/icons/c-original.svg',
    color: '#3949AB'
  },
  {
    name: 'Dart',
    icon: '/icons/dart-original.svg',
    color: '#0175c2'
  },
  {
    name: 'Python',
    icon: '/icons/python-original.svg',
    color: '#306998'
  }
]

const frameworks = [
  {
    name: 'React Native',
    icon: '/icons/react-original.svg',
    color: '#61DAFB'
  },
  {
    name: 'React',
    icon: '/icons/react-original.svg',
    color: '#61DAFB'
  },
  {
    name: 'Express',
    icon: '/icons/express-original.svg',
    color: '#646CFF'
  },
  {
    name: 'NestJS',
    icon: '/icons/nestjs-original.svg', 
    color: '#E0234E' 
  },
  {
    name: 'Flutter',
    icon: '/icons/flutter-original.svg',
    color: '#0175C2'
  },
  {
    name: 'Angular',
    icon: '/icons/angular-original.svg',
    color: '#DD0031'
  }
]

const services = [
  {
    title: "High-Performance Backend",
    icon: "server",
    description: "We architect efficient backend systems engineered for optimal performance. Our solutions implement sophisticated caching mechanisms, data compression, and robust authentication frameworks that maximize speed, security, and overall system efficiency.",
    features: [
      { text: "Advanced load balancing and performance optimization", icon: "gauge" },
      { text: "Intelligent caching strategies for reduced latency", icon: "database" },
      { text: "Secure authentication and authorization frameworks", icon: "shield" },
    ],
    color: 'var(--accent-honey)'
  },
  {
    title: "Seamless System Integration",
    icon: "link",
    description: "We specialize in connecting disparate systems into cohesive, efficient ecosystems. Our integration solutions enable flawless communication between platforms, creating unified workflows that enhance productivity and data consistency across your entire technology stack.",
    features: [
      { text: "Automated data synchronization and transformation", icon: "zap" },
      { text: "API development and integration with third-party services", icon: "link" },
      { text: "Microservices architecture and orchestration", icon: "server" },
    ],
    color: 'var(--accent-ember)'
  },
  {
    title: "Optimized Web Solutions",
    icon: "globe",
    description: "We craft web applications that deliver exceptional user experiences without compromising on performance. Through advanced optimization techniques, asset management, and cutting-edge rendering strategies, we build web platforms that load instantly and perform flawlessly.",
    features: [
      { text: "Next-generation performance optimization techniques", icon: "zap" },
      { text: "Responsive, accessible, and standards-compliant interfaces", icon: "globe" },
      { text: "Advanced code splitting and resource management", icon: "gauge" },
    ],
    color: 'var(--accent-blush)'
  },
  {
    title: "Mobile Application Development",
    icon: "smartphone",
    description: "We develop high-performance mobile applications that provide seamless experiences across all devices. Our mobile solutions combine elegant, intuitive interfaces with sophisticated backend integration to create powerful yet lightweight applications that users love.",
    features: [
      { text: "Cross-platform and native application development", icon: "smartphone" },
      { text: "Battery-efficient code and optimized resource consumption", icon: "zap" },
      { text: "Secure local storage and offline functionality", icon: "shield" },
    ],
    color: 'var(--ac-primary)'
  }
];

// Define featuredServices based on services
const featuredServices = [
  {
    ...services[0], // High-Performance Backend
    description: "Building scalable and efficient backend systems." // Shorter description for expertise card
  },
  {
    ...services[1], // Seamless System Integration
    description: "Connecting disparate systems for unified workflows." // Shorter description
  },
  {
    ...services[2], // Optimized Web Solutions
    description: "Crafting fast, responsive, and accessible web apps." // Shorter description
  },
  {
    ...services[3], // Mobile Application Development
    description: "Developing high-performance cross-platform mobile apps." // Shorter description
  }
];

interface GithubProfile {
  name: string;
  login: string;
  avatar_url: string;
  bio: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string | null;
  blog: string | null;
  twitter_username: string | null;
  company: string | null;
  created_at: string;
}

interface GithubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [githubUsername, setGithubUsername] = useState<string | null>(null);
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Load GitHub profile when username changes
  useEffect(() => {
    async function loadGithubData() {
      if (!githubUsername) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const [profileData, reposData] = await Promise.all([
          fetchGithubData(`users/${githubUsername}`),
          fetchGithubData(`users/${githubUsername}/repos?sort=updated&per_page=10`)
        ]);
        setProfile(profileData);
        setRepos(reposData);
        setActiveTab('dev-profile');
      } catch (err) {
        console.error('Error fetching GitHub data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load GitHub data');
      } finally {
        setLoading(false);
      }
    }
    
    loadGithubData();
  }, [githubUsername]);

  // Handle clicking a team member's GitHub profile
  const handleProfileView = (username: string) => {
    setGithubUsername(null); // Reset first to force effect
    setTimeout(() => setGithubUsername(username), 0);
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {/* Render the appropriate component based on the active tab */}
      {activeTab === 'home' && (
        <Home featuredServices={featuredServices} />
      )}
      
      {activeTab === 'what-we-do' && (
        <WhatWeDo />
      )}
      
      {activeTab === 'team' && (
        <Team team={team} onProfileView={handleProfileView} />
      )}
      
      {activeTab === 'tech' && (
        <Technologies languages={languages} frameworks={frameworks} />
      )}
      
      {activeTab === 'contact' && (
        <Contact />
      )}
      
      {activeTab === 'dev-profile' && (
        <DevProfile 
          profile={profile} 
          repos={repos} 
          loading={loading} 
          error={error} 
          onBack={() => setActiveTab('team')} 
        />
      )}
    </Layout>
  )
}

export default App