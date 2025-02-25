import { create } from 'zustand';

export interface Team {
  teamId: number;
  coachName: string | null;
  clubName: string;
  teamLogoUrl: string | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface User {
  id: number;
  fullName: string | null;
  email: string;
  isAdmin: boolean;
  teamId: number | null;
  createdAt: string;
  updatedAt: string | null;
  team: Team;
}

export interface AuthState {
  user: User | null;
  isError: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

// Utility function to get the base URL based on the environment
const getBaseUrl = (path: string): string => {
  const host = process.env.NODE_ENV === 'production' ? process.env.PROD_BASE_URL : process.env.DEV_BASE_URL;
  const port = ':3333'; // Only add port for development
  return `${host}${port}${path}`;
};

// Base fetch function to handle requests
const baseFetch = async (path: string, options: RequestInit = {}): Promise<Response> => {
  return await fetch(getBaseUrl(path), {
    ...options,
    credentials: 'include', // Ensure cookies are sent with the request
  });
};

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isError: false,

  login: async (email, password) => {
    try {
      const response = await baseFetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        set({ user: data.user, isError: false });
      } else {
        alert(data.message);
        set({ isError: true });
      }
    } catch (error) {
      console.error(error);
      set({ isError: true });
    }
  },

  register: async (email, password, fullName) => {
    try {
      const response = await baseFetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, fullName }),
      });

      const data = await response.json();
      if (response.ok) {
        set({ user: data.user, isError: false });
      } else {
        alert(data.message);
        set({ isError: true });
      }
    } catch (error) {
      console.error(error);
      set({ isError: true });
    }
  },

  logout: async () => {
    await baseFetch('/logout', {
      method: 'POST',
    });
    set({ user: null, isError: false });
  },

  fetchUser: async () => {
    try {
      const response = await baseFetch('/me');

      const data = await response.json();
      if (response.ok) {
        set({ user: data.user, isError: false });
      } else {
        set({ isError: true });
      }
    } catch (error) {
      console.error(error);
      set({ isError: true });
    }
  },
}));

export default useAuthStore;

