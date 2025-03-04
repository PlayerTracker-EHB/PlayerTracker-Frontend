import { getBaseUrl } from "../utils";

interface Stats {
  matchStats: GameStats;
}

export interface GameStats {
  statId: number;
  gameId: number;
  videoName: string;
  possessionTeamA: number;
  possessionTeamB: number;
  heatmapTeamA: string;
  heatmapTeamB: string;
}

export interface GamePosessionTrend{
  gameId: number | string;
  date: string;
  ourScore: number;
  opponentScore: number;
  opponent: string;
  isHome: boolean;
  possession: number;
}

const fetchGameStats = async (gameId: number): Promise<GameStats> => {
  console.info(`Fetching stats for game ID: ${gameId}...`);

  const baseGameURL = getBaseUrl(`/stats/${gameId}`);

  try {
    const response = await fetch(baseGameURL, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch stats for game ID: ${gameId}`);
    }

    const data: Stats = await response.json();
    return data.matchStats;
  } catch (error) {
    console.error('Error fetching game stats:', error);
    throw error;
  }
};


const fetchPossessionTrend = async (teamId: number): Promise<GamePosessionTrend[]> => {
  if (!teamId) {
    throw new Error("fetchPossessionTrend: teamId is required but was not provided.");
  }

  console.info(`Fetching possession trend for team ID: ${teamId}...`);

  const baseURL = getBaseUrl(`/teams/${teamId}/possession-trend`);

  try {
    const response = await fetch(baseURL, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch possession trend for team ID: ${teamId}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching possession trend:", error);
    throw error;
  }
};

export const getPossessionTrend = (teamId?: number) => ({
  queryKey: ["PossessionTrend", teamId],
  queryFn: async () => {
    if (!teamId) {
      throw new Error("getPossessionTrend: teamId is required but was not provided.");
    }
    return fetchPossessionTrend(teamId);
  },
});


export const getStats = (gameId: number) => ({
  queryKey: ['GameStats', gameId],
  queryFn: () => fetchGameStats(gameId),
});
