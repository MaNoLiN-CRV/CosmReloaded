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

import team from './components/data/team'
import languages from './components/data/langs'
import frameworks from './components/data/frameworks'
import services from './components/data/services'


// Define featuredServices based on services
const featuredServices = [
  {
    ...services[0], // High-Performance Backend
    description: "Building scalable and efficient backend systems." // Shorter description for expertise card
  },
  {
    ...services[1], // Seamless System Integration
    description: "Design and develop robust embedded systems with custom kernels" // Shorter description
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
        <Home featuredServices={featuredServices} setActiveTab={setActiveTab} />
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