'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Search, MapPin } from 'lucide-react'

interface Company {
  id: string
  name: string
  city: string
  state: string
  industry: string
  verificationStatus: string
  aiScore: number
}

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchCompanies()
  }, [search])

  const fetchCompanies = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/companies?search=${search}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setCompanies(response.data.companies)
    } catch (error) {
      console.error('Failed to fetch companies:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold">Companies Master</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
          <Plus size={18} /> Add Company
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search by company name, city, state..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : companies.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">No companies found</div>
        ) : (
          companies.map((company) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="hover:shadow-lg transition cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">{company.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin size={16} className="text-gray-500" />
                    <span>{company.city}, {company.state}</span>
                  </div>
                  <div className="text-sm text-gray-600">{company.industry}</div>
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-xs font-medium">AI Score</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 dark:bg-slate-600 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${company.aiScore}%` }}></div>
                      </div>
                      <span className="text-xs font-medium">{Math.round(company.aiScore)}%</span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      company.verificationStatus === 'VERIFIED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {company.verificationStatus}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  )
}
