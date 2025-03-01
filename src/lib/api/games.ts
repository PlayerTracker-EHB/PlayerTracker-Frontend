import { getBaseUrl } from "../utils";

export interface Game {
  possession: number;
  passAccuracy: number;
  gameId: number;
  teamId: number;
  atHome: boolean;
  adversaryName: string;
  gameDate: Date;
  homeTeamScore: number;
  awayTeamScore: number;
  startsLeft: boolean;
  gameStatus: string;
  createdAt: string;
}

// Use the utility function to define the game URL
const baseGameURL = getBaseUrl("/games/");

const fetchGamesQuery = async (): Promise<Game[]> => {
  console.info("Fetching games...");

  try {
    const response = await fetch(baseGameURL, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch games");
    }

    const data: Game[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
};


const pollGameStatusQuery = async (gameId: number): Promise<String> => {
  console.info(`Polling game status for gameId: ${gameId}`);
  try {
    const response = await fetch(`${baseGameURL}status/${gameId}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch games");
    }

    const data: String = await response.text()
    return data;
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
};

export const getGames = {
  queryKey: ["games"],
  queryFn: fetchGamesQuery,
};


export const getGameStatus = (gameId: number) => ({
  queryKey: ["gameStatus", gameId],
  queryFn: () => pollGameStatusQuery(gameId),
  refetchInterval: 5000,
});
