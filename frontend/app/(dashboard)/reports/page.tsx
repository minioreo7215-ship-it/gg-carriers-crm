'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

export default function ReportsPage() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

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

  if (loading) return <div className="flex justify-center py-8">Loading...</div>
  if (!stats) return <div className="flex justify-center py-8">Failed to load reports</div>

  const temperatureData = [
    { name: 'Hot', value: stats.hotLeads, color: '#EF4444' },
    { name: 'Warm', value: stats.warmLeads, color: '#F59E0B' },
    { name: 'Cold', value: stats.coldLeads, color: '#3B82F6' },
  ]

  const conversionData = [
    { name: 'Converted', value: stats.convertedLeads },
    { name: 'Not Converted', value: stats.totalLeads - stats.convertedLeads },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h1 className="text-3xl font-bold">Reports & Analytics</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-blue-600">{stats.totalLeads}</div>
            <p className="text-sm text-gray-600 mt-1">Total Leads</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-green-600">{stats.convertedLeads}</div>
            <p className="text-sm text-gray-600 mt-1">Converted</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-orange-600">{stats.conversionRate}%</div>
            <p className="text-sm text-gray-600 mt-1">Conversion Rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-purple-600">{stats.totalCompanies}</div>
            <p className="text-sm text-gray-600 mt-1">Companies</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Lead Temperature</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={temperatureData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={100} fill="#8884d8" dataKey="value">
                  {temperatureData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span>Today's Meetings</span>
              <span className="font-bold">{stats.todaysMeetings}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span>Pending Follow-ups</span>
              <span className="font-bold">{stats.pendingFollowUps}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Quotations</span>
              <span className="font-bold">{stats.totalQuotations}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
