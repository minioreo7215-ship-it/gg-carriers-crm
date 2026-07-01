import { create } from 'zustand'

interface User {
  id: string
  email: string
  name: string
  role: string
}

interface AuthStore {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (token: string, user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  login: (token, user) => {
    set({ token, user, isAuthenticated: true })
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
  },
  logout: () => {
    set({ token: null, user: null, isAuthenticated: false })
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },
}))
