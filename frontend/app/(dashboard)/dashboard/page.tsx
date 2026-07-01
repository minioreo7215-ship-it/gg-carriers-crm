'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface DashboardStats {
  stats: {
    totalLeads: number
    convertedLeads: number
    conversionRate: string
    hotLeads: number
    warmLeads: number
    coldLeads: number
    totalCompanies: number
    todaysMeetings: number
    pendingFollowUps: number
    totalQuotations: number
  }
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats['stats'] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/analytics/dashboard`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        setStats(response.data.stats)
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (!stats) {
    return <div className="flex items-center justify-center h-screen">Failed to load dashboard</div>
  }

  const temperatureData = [
    { name: 'Hot', value: stats.hotLeads },
    { name: 'Warm', value: stats.warmLeads },
    { name: 'Cold', value: stats.coldLeads },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalLeads}</div>
              <p className="text-xs text-gray-500 mt-1">All time</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Converted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.convertedLeads}</div>
              <p className="text-xs text-gray-500 mt-1">Conversion: {stats.conversionRate}%</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Today's Meetings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{stats.todaysMeetings}</div>
              <p className="text-xs text-gray-500 mt-1">Scheduled</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending Follow-ups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">{stats.pendingFollowUps}</div>
              <p className="text-xs text-gray-500 mt-1">Action needed</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Lead Temperature Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={temperatureData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={80} fill="#8884d8" dataKey="value">
                  {temperatureData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Companies</span>
                <span className="font-bold">{stats.totalCompanies}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pending Quotations</span>
                <span className="font-bold">{stats.totalQuotations}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Hot Leads</span>
                <span className="font-bold text-red-600">{stats.hotLeads}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Warm Leads</span>
                <span className="font-bold text-yellow-600">{stats.warmLeads}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cold Leads</span>
                <span className="font-bold text-blue-600">{stats.coldLeads}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
