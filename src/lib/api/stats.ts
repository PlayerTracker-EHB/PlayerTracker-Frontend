import { getBaseUrl } from "../utils";

export interface GameStats {
    statId: number;
    gameId: number;
    videoName: string;
    possessionTeamA: number;
    possessionTeamB: number;
    heatmapTeamA: string;
    heatmapTeamB: string;
}

const fetchGameStats = async (gameId: number): Promise<GameStats[]> => {
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

        const data: GameStats[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching game stats:', error);
        throw error;
    }
};

export const getStats = (gameId: number) => ({
    queryKey: ['GameStats', gameId],
    queryFn: () => fetchGameStats(gameId),
});
