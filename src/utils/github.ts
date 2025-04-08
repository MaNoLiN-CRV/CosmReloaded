const GITHUB_API = 'https://api.github.com';

export async function fetchGithubData(endpoint: string) {
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
  };

  const response = await fetch(`${GITHUB_API}/${endpoint}`, { headers });

  if (!response.ok) {
    // Manejar límite de rate específicamente
    if (response.status === 403) {
      throw new Error('GitHub API rate limit exceeded. Please try again later.');
    }
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`GitHub API Error: ${response.status} ${response.statusText} - ${errorData.message || ''}`);
  }

  return response.json();
}
