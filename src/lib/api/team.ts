import { User } from "@/store/authStore";
import { getBaseUrl } from "../utils";

export class NotFoundError extends Error { }

export type Team = {
  teamId: number,
  coachName: string,
  clubName: string,

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

const getUsersByTeamIdQuery = async (teamId: number): Promise<User[]> => {
  console.info(`Fetching users by team id ...`, teamId);
  const response = await baseFetch(`${teamId}`, {
    method: 'GET',
  });

  if (!response.ok) {
    console.error("Error fetching users by team id:", await response.text());
  }

  return await response.json();
}

const createUserQuery = async (fullName: string, email: string, password: string, teamId: number) => {
  console.log("New user:", fullName);
  const response = await baseFetch("user", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fullName: fullName,
      email: email,
      password: password,
      teamId: teamId,
    }),
  })

  if (!response.ok) {
    console.error("Error creating user:", await response.text());
  }
}

const deleteUserQuery = async (userId: number) => {

  const response = await baseFetch("user/" + userId, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    console.error("Error deleting user:", await response.text());
  }

}


export const updateTeam = {
  mutationKey: 'updateTeam',
  mutationFn: (updatedTeamData: Partial<Team>) => updateTeamQuery(updatedTeamData),
};

export const getUsersByTeamId = (teamId: number) => ({
  queryKey: ['users', { teamId }],
  queryFn: () => getUsersByTeamIdQuery(teamId),
});

export const createUser = {
  mutationKey: 'createUser',
  mutationFn: (newUser: { fullName: string, email: string, password: string, teamId: number }) => createUserQuery(newUser.fullName, newUser.email, newUser.password, newUser.teamId),
};

export const deleteUser = {
  mutationKey: 'deleteUser',
  mutationFn: (userId: number) => deleteUserQuery(userId),
}
