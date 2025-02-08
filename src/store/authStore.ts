import { create } from 'zustand'

interface User {
  id: number
  email: string
}

interface AuthState {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, fullName: string) => Promise<void>
  logout: () => Promise<void>
  fetchUser: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  login: async (email, password) => {
    const response = await fetch('http://localhost:3333/login', {
      method: 'POST',
      credentials: 'include', // Important for sessions
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()
    if (response.ok) set({ user: data.user })
    else alert(data.message)
  },

  register: async (email, password, fullName) => {
    const response = await fetch('http://localhost:3333/register', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, fullName }),
    })

    const data = await response.json()
    if (response.ok) set({ user: data.user })
    else alert(data.message)
  },

  logout: async () => {
    await fetch('http://localhost:3333/logout', {
      method: 'POST',
      credentials: 'include',
    })
    set({ user: null })
  },

  fetchUser: async () => {
    const response = await fetch('http://localhost:3333/me', {
      credentials: 'include',
    })

    const data = await response.json()
    if (response.ok) set({ user: data.user })
  },
}))

