import * as XLSX from 'xlsx'

export interface ParsedLead {
  companyName: string
  contactName: string
  designation: string
  mobile: string
  email: string
  city: string
  state: string
  industry: string
  notes?: string
}

export const parseExcelFile = async (file: File): Promise<ParsedLead[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: 'array' })
        const sheet = workbook.Sheets[workbook.SheetNames[0]]
        const jsonData = XLSX.utils.sheet_to_json(sheet)
        resolve(jsonData as ParsedLead[])
      } catch (error) {
        reject(error)
      }
    }
    reader.readAsArrayBuffer(file)
  })
}

export const exportToExcel = (data: any[], fileName: string) => {
  const workbook = XLSX.utils.book_new()
  const worksheet = XLSX.utils.json_to_sheet(data)
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data')
  XLSX.writeFile(workbook, `${fileName}.xlsx`)
}

export const validateLeadData = (lead: ParsedLead): string[] => {
  const errors: string[] = []
  
  if (!lead.companyName?.trim()) errors.push('Company name is required')
  if (!lead.contactName?.trim()) errors.push('Contact name is required')
  if (!lead.email?.trim()) errors.push('Email is required')
  if (!lead.mobile?.trim()) errors.push('Mobile is required')
  if (!lead.city?.trim()) errors.push('City is required')
  
  return errors
}
