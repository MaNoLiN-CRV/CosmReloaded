import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchGithubData } from '../../utils/github';

interface GithubProfile {
  name: string;
  login: string;
  avatar_url: string;
  bio: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string;
  blog: string;
  twitter_username: string;
  company: string;
  created_at: string;
}

interface GithubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

export default function DevProfile() {
  const { username } = useParams();
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!username) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const [profileData, reposData] = await Promise.all([
          fetchGithubData(`users/${username}`),
          fetchGithubData(`users/${username}/repos?sort=updated&per_page=10`)
        ]);
        setProfile(profileData);
        setRepos(reposData);
      } catch (err) {
        console.error('Error fetching GitHub data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load GitHub data');
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[var(--accent-ember)]"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2b292e] via-[#3a353c] to-[#50424d] p-8">
        <Link to="/" className="glass-button inline-flex items-center mb-8">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
        
        <div className="glass-card p-8 text-center">
          <h2 className="text-2xl text-[var(--accent-ember)] mb-4">
            {error || `Could not find GitHub user "${username}"`}
          </h2>
          <p className="text-[var(--mist)]">
            Please check the username and try again
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2b292e] via-[#3a353c] to-[#50424d] p-8">
      <Link to="/" className="glass-button inline-flex items-center mb-8">
        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </Link>

      {/* Profile Header */}
      <div className="glass-card mb-8 p-8">
        <div className="flex flex-col md:flex-row gap-6">
          <img 
            src={profile.avatar_url} 
            alt={profile.name || profile.login} 
            className="w-32 h-32 rounded-full border-4 border-[var(--accent-ember)]"
          />
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-[var(--ac-primary)]">{profile.name || profile.login}</h1>
                <a 
                  href={profile.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent-blush)] hover:underline"
                >
                  @{profile.login}
                </a>
              </div>
              <div className="flex gap-4 mt-3 md:mt-0">
                <div className="text-center">
                  <div className="text-xl font-bold text-[var(--accent-honey)]">{profile.public_repos}</div>
                  <div className="text-sm text-[var(--mist)]">Repos</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-[var(--accent-honey)]">{profile.followers}</div>
                  <div className="text-sm text-[var(--mist)]">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-[var(--accent-honey)]">{profile.following}</div>
                  <div className="text-sm text-[var(--mist)]">Following</div>
                </div>
              </div>
            </div>
            
            {profile.bio && (
              <p className="text-[var(--mist)] mb-4">{profile.bio}</p>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {profile.location && (
                <div className="flex items-center text-[var(--mist)]">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                  </svg>
                  {profile.location}
                </div>
              )}
              {profile.blog && (
                <div className="flex items-center text-[var(--mist)]">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
                    <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
                  </svg>
                  <a 
                    href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--accent-blush)] hover:underline truncate"
                  >
                    {profile.blog}
                  </a>
                </div>
              )}
              {profile.twitter_username && (
                <div className="flex items-center text-[var(--mist)]">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                  </svg>
                  <a 
                    href={`https://twitter.com/${profile.twitter_username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--accent-blush)] hover:underline"
                  >
                    @{profile.twitter_username}
                  </a>
                </div>
              )}
              {profile.company && (
                <div className="flex items-center text-[var(--mist)]">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                  </svg>
                  {profile.company}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Repositories Grid */}
      <h2 className="text-2xl font-bold text-[var(--ac-primary)] mb-4">Latest Repositories</h2>
      {repos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map(repo => (
            <a 
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-item group hover:scale-105 transition-all p-6"
            >
              <h3 className="text-xl font-semibold text-[var(--accent-honey)] mb-2">
                {repo.name}
              </h3>
              <p className="text-[var(--mist)] mb-4 line-clamp-2">
                {repo.description || 'No description available'}
              </p>
              <div className="flex items-center gap-4">
                {repo.language && (
                  <span className="text-sm text-[var(--accent-blush)]">
                    {repo.language}
                  </span>
                )}
                <span className="flex items-center text-sm text-[var(--mist)]">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z"/>
                  </svg>
                  {repo.stargazers_count}
                </span>
                <span className="flex items-center text-sm text-[var(--mist)]">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
                  </svg>
                  {repo.forks_count}
                </span>
              </div>
              <div className="text-xs text-[var(--mist)] mt-3">
                Updated: {new Date(repo.updated_at).toLocaleDateString()}
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="glass-card p-6 text-center">
          <p className="text-[var(--mist)]">No repositories found</p>
        </div>
      )}
    </div>
  );
}
