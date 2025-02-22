export interface Game {
  gameId: number;
  teamId: number;
  atHome: boolean;
  adversaryName: string;
  videoPath: string | null;
  createdAt: string;
}

const baseGameURL = "http://10.2.160.40:3333/games/";

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
