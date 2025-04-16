// Define interfaces for GitHub data
export interface GithubProfile {
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

export interface GithubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}
