export interface Person {
  name: string;
  primaryRole?: string;
  secondaryRole?: string;
  role?: string; 
  expertise?: string | string[];
  image?: string;
  github?: string;
  bio?: string;
  linkedin?: string;
  projectsContributions?: Record<string, string>;
}