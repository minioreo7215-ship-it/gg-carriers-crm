'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Search, Filter, Download, Upload } from 'lucide-react'

interface Lead {
  id: string
  company: { name: string }
  contact: { name: string; email: string } | null
  status: string
  temperature: string
  aiScore: number
  assignedTo: { name: string } | null
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchLeads()
  }, [search, filter])

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/leads?search=${search}&temperature=${filter}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setLeads(response.data.leads)
    } catch (error) {
      console.error('Failed to fetch leads:', error)
    } finally {
      setLoading(false)
    }
  }

  const getTemperatureColor = (temp: string) => {
    switch (temp) {
      case 'HOT':
        return 'bg-red-100 text-red-800'
      case 'WARM':
        return 'bg-yellow-100 text-yellow-800'
      case 'COLD':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    if (status === 'CONVERTED') return 'text-green-600'
    if (status === 'LOST') return 'text-red-600'
    if (status === 'FOLLOW_UP') return 'text-orange-600'
    return 'text-gray-600'
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold">Leads Management</h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <Upload size={18} /> Import Leads
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            <Plus size={18} /> New Lead
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by company, contact, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Temperatures</option>
          <option value="HOT">Hot</option>
          <option value="WARM">Warm</option>
          <option value="COLD">Cold</option>
        </select>
      </div>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Leads ({leads.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold">Company</th>
                    <th className="text-left py-3 px-4 font-semibold">Contact</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                    <th className="text-left py-3 px-4 font-semibold">Temperature</th>
                    <th className="text-left py-3 px-4 font-semibold">AI Score</th>
                    <th className="text-left py-3 px-4 font-semibold">Assigned To</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-b hover:bg-gray-50 dark:hover:bg-slate-700 transition">
                      <td className="py-3 px-4">
                        <a href={`/leads/${lead.id}`} className="text-blue-600 hover:underline">
                          {lead.company.name}
                        </a>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          {lead.contact?.name || 'N/A'}
                          {lead.contact?.email && <div className="text-xs text-gray-500">{lead.contact.email}</div>}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`font-medium ${getStatusColor(lead.status)}`}>
                          {lead.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTemperatureColor(lead.temperature)}`}>
                          {lead.temperature}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${lead.aiScore}%` }}></div>
                          </div>
                          <span className="text-xs font-medium">{Math.round(lead.aiScore)}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">{lead.assignedTo?.name || 'Unassigned'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
