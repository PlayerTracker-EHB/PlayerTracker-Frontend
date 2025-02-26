import { getBaseUrl } from "../utils";

export class NotFoundError extends Error { }

export type Team = {
    teamId: number,
    coachName: string,
    clubName: string,
    teamLogoUrl: string
  
};


const baseUrl = getBaseUrl("/admin/team/")

const baseFetch = async (path: string, options: RequestInit = {}): Promise<Response> => {
    return await fetch(baseUrl + path, {
      ...options,
      credentials: 'include', // Ensure cookies are sent with the request
    });
  };


  const updateTeamQuery = async (updatedTeamData: Partial<Team>): Promise<Team> => {
    console.info(`Updating team with id ...`, updatedTeamData);
  
    const response = await baseFetch("", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTeamData),
    });
  
    if (!response.ok) {
      console.error("Error updating team:", await response.text());
      throw new Error('Failed to update team');
    }
  
    return await response.json();
  };


  export const updateTeam = {
    mutationKey: 'updateTeam',
    mutationFn: (updatedTeamData: Partial<Team>) => updateTeamQuery(updatedTeamData),
  };
  