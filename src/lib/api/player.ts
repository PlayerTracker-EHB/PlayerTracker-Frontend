export class NotFoundError extends Error { }

export type PlayerType = {
  playerId: number;
  firstName: string;
  lastName: string;
  teamId: number;
  createdAt: string;
  updatedAt: string;
};

const baseURL = "http://10.2.160.40:3333/admin/players/";

const baseFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
  return await fetch(baseURL + url, {
    ...options,
    credentials: 'include', // Ensure cookies are sent with the request
  });
};

const fetchPlayersQuery = async (): Promise<PlayerType[]> => {
  console.info('Fetching players...');

  const response = await baseFetch("", {
    method: 'GET',
  });

  if (!response.ok) {
    console.log("Error: ", response.body);
    throw new Error('Failed to fetch players');
  }

  const data = await response.json();
  return data;
};

const fetchPlayerQuery = async (playerId: number): Promise<PlayerType> => {
  console.info(`Fetching player with id ${playerId}...`);

  const response = await baseFetch(`${playerId}`, {
    method: 'GET',
  });

  if (!response.ok) {
    console.log("Error: ", response.body);
    throw new NotFoundError(`Player with id "${playerId}" not found!`);
  }

  return await response.json();
};

const createPlayerQuery = async (newPlayer: Partial<PlayerType>): Promise<PlayerType> => {
  console.info('Creating new player...', newPlayer);

  const response = await baseFetch("", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPlayer),
  });

  if (!response.ok) {
    console.log("Error: ", response.body);
    throw new Error('Failed to create player');
  }

  return await response.json();
};

const updatePlayerQuery = async (playerId: number, updatedPlayerData: Partial<PlayerType>): Promise<PlayerType> => {
  console.info(`Updating player with id ${playerId}...`, updatedPlayerData);

  const response = await baseFetch(`${playerId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedPlayerData),
  });

  if (!response.ok) {
    console.log("Error: ", response.body);
    throw new Error('Failed to update player');
  }

  return await response.json();
};

const deletePlayerQuery = async (playerId: number): Promise<void> => {
  console.info(`Deleting player with id ${playerId}...`);

  const response = await baseFetch(`${playerId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    console.log("Error: ", response.body);
    throw new Error('Failed to delete player');
  }
};

// Query and Mutation Configurations
export const getPlayerById = (playerId: number) => ({
  queryKey: ['players', { playerId }],
  queryFn: () => fetchPlayerQuery(playerId),
});

export const getPlayers = {
  queryKey: ['players'],
  queryFn: fetchPlayersQuery,
};

export const createPlayer = {
  mutationKey: 'createPlayer',
  mutationFn: (newPlayer: Partial<PlayerType>) => createPlayerQuery(newPlayer),
};

export const updatePlayer = {
  mutationKey: 'updatePlayer',
  mutationFn: (playerId: number, updatedPlayerData: Partial<PlayerType>) => updatePlayerQuery(playerId, updatedPlayerData),
};

export const deletePlayer = {
  mutationKey: 'deletePlayer',
  mutationFn: (playerId: number) => deletePlayerQuery(playerId),
};

