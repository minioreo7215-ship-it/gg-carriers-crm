'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/components/theme-provider'
import { Moon, Sun, Bell, Settings, User } from 'lucide-react'

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  return (
    <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold">Welcome back, {user?.name}!</h2>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition">
          <Settings size={20} />
        </button>

        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
          <User size={20} />
        </div>
      </div>
    </nav>
  )
}
