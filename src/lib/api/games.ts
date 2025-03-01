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
const baseGameURL = getBaseUrl("");

const fetchGamesQuery = async (): Promise<Game[]> => {
  console.info("Fetching games...");

  try {
    const response = await fetch(baseGameURL + "/games/", {
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
    const response = await fetch(`${baseGameURL}/stats/${gameId}/status`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch games");
    }

    const data: String = await response.json();
    console.info(`Game status for gameId: ${gameId} is: ${data}`);
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
});

