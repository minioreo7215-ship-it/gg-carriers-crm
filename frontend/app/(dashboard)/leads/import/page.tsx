'use client'

import { useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Upload, AlertCircle, CheckCircle, FileText } from 'lucide-react'
import { toast } from 'react-toastify'

interface ImportResult {
  success: boolean
  totalRecords: number
  successCount: number
  failureCount: number
  duplicateCount: number
  errors?: string[]
}

export default function ImportLeadsPage() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ImportResult | null>(null)
  const [preview, setPreview] = useState<any[]>([])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    setFile(selectedFile)
    
    // Preview file
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: 'array' })
        const sheet = workbook.Sheets[workbook.SheetNames[0]]
        const jsonData = XLSX.utils.sheet_to_json(sheet)
        setPreview(jsonData.slice(0, 5))
      } catch (error) {
        toast.error('Failed to preview file')
      }
    }
    reader.readAsArrayBuffer(selectedFile)
  }

  const handleImport = async () => {
    if (!file) {
      toast.error('Please select a file')
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const token = localStorage.getItem('token')
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/leads/import`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      setResult(response.data)
      toast.success('Import completed!')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Import failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-2xl">
      <h1 className="text-3xl font-bold">Import Leads</h1>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Excel or CSV File</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg p-8 text-center">
            <Upload className="mx-auto text-gray-400 mb-4" size={32} />
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Drag and drop your Excel or CSV file here, or click to select
            </p>
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer text-blue-600 hover:underline">
              {file ? file.name : 'Choose File'}
            </label>
          </div>

          {preview.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold">Preview (First 5 rows)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border">
                  <thead className="bg-gray-100 dark:bg-slate-700">
                    <tr>
                      {Object.keys(preview[0]).map((key) => (
                        <th key={key} className="px-4 py-2 text-left">
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {preview.map((row, idx) => (
                      <tr key={idx} className="border-b">
                        {Object.values(row).map((val: any, idx) => (
                          <td key={idx} className="px-4 py-2">
                            {val?.toString() || 'N/A'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <button
            onClick={handleImport}
            disabled={!file || loading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 font-medium"
          >
            {loading ? 'Importing...' : 'Import Leads'}
          </button>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {result.success ? (
                <>
                  <CheckCircle size={24} className="text-green-600" />
                  Import Successful
                </>
              ) : (
                <>
                  <AlertCircle size={24} className="text-red-600" />
                  Import Failed
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded">
                <p className="text-sm text-gray-600 dark:text-gray-300">Total Records</p>
                <p className="text-2xl font-bold text-blue-600">{result.totalRecords}</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900 p-4 rounded">
                <p className="text-sm text-gray-600 dark:text-gray-300">Success</p>
                <p className="text-2xl font-bold text-green-600">{result.successCount}</p>
              </div>
              <div className="bg-red-50 dark:bg-red-900 p-4 rounded">
                <p className="text-sm text-gray-600 dark:text-gray-300">Failed</p>
                <p className="text-2xl font-bold text-red-600">{result.failureCount}</p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded">
                <p className="text-sm text-gray-600 dark:text-gray-300">Duplicates</p>
                <p className="text-2xl font-bold text-yellow-600">{result.duplicateCount}</p>
              </div>
            </div>

            {result.errors && result.errors.length > 0 && (
              <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded p-4">
                <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">Errors:</h4>
                <ul className="text-sm text-red-800 dark:text-red-200 space-y-1">
                  {result.errors.map((error, idx) => (
                    <li key={idx}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </motion.div>
  )
}
