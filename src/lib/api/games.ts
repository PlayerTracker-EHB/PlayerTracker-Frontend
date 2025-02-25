export interface Game {
  gameId: number;
  teamId: number;
  atHome: boolean;
  adversaryName: string;
  videoPath: string | null;
  createdAt: string;
}

// Utility function to get the base URL based on the environment
const getBaseUrl = (path: string): string => {
  const host = process.env.NODE_ENV === 'production' ? process.env.PROD_BASE_URL : process.env.DEV_BASE_URL;
  const port = ':3333'
  return `${host}${port}${path}`;
};

// Use the utility function to define the game URL
const baseGameURL = getBaseUrl('/games/');

const fetchGamesQuery = async (): Promise<Game[]> => {
  console.info('Fetching games...');

  try {
    const response = await fetch(baseGameURL, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch games');
    }

    const data: Game[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
};

export const getGames = {
  queryKey: ['games'],
  queryFn: fetchGamesQuery,
};

