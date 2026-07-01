'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Home,
  Users,
  Building2,
  Phone,
  Calendar,
  CheckSquare,
  FileText,
  Map,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react'

const menuItems = [
  { label: 'Dashboard', href: '/dashboard', icon: Home },
  { label: 'Leads', href: '/leads', icon: Users },
  { label: 'Companies', href: '/companies', icon: Building2 },
  { label: 'Contacts', href: '/contacts', icon: Phone },
  { label: 'Meetings', href: '/meetings', icon: Calendar },
  { label: 'Tasks', href: '/tasks', icon: CheckSquare },
  { label: 'Quotations', href: '/quotations', icon: FileText },
  { label: 'Field Sales', href: '/field-sales', icon: Map },
  { label: 'Reports', href: '/reports', icon: BarChart3 },
  { label: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/auth/login'
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 rounded-lg bg-white dark:bg-slate-800 shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -256 }}
        animate={{ x: isOpen ? 0 : -256 }}
        className="fixed lg:relative lg:translate-x-0 w-64 h-screen bg-slate-900 text-white p-4 overflow-y-auto z-30 lg:z-0"
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-blue-400">GG Carriers</h1>
          <p className="text-xs text-gray-400">CRM & FMS</p>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-slate-800'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-slate-800 rounded-lg transition"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
