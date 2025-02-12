// src/authstore.ts
import { create } from 'zustand';

export interface User {
  id: number;
  fullName: string;
  email: string;
  isAdmin: boolean;
}

export interface AuthState {
  user: User | null;
  isError: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isError: false,

  login: async (email, password) => {
    try {
      const response = await fetch('http://localhost:3333/login', {
        method: 'POST',
        credentials: 'include',
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
      const response = await fetch('http://localhost:3333/register', {
        method: 'POST',
        credentials: 'include',
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
    await fetch('http://localhost:3333/logout', {
      method: 'POST',
      credentials: 'include',
    });
    set({ user: null, isError: false });
  },

  fetchUser: async () => {
    try {
      const response = await fetch('http://localhost:3333/me', {
        credentials: 'include',
      });

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

