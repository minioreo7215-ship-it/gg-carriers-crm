export const aiValidateCompany = async (companyName: string, city: string) => {
  // Mock AI validation
  // In production, call actual AI service
  return {
    isValid: true,
    correctedName: companyName,
    confidence: 0.95,
    industry: 'Manufacturing',
    website: 'https://example.com',
  }
}

export const detectDuplicates = (leads: any[]) => {
  const seen = new Set()
  const duplicates: any[] = []
  
  leads.forEach((lead) => {
    const key = `${lead.companyName}-${lead.city}`.toLowerCase()
    if (seen.has(key)) {
      duplicates.push(lead)
    }
    seen.add(key)
  })
  
  return duplicates
}

export const calculateLeadScore = (lead: any): number => {
  let score = 0
  
  // Company validation (30 points)
  if (lead.aiValidated) score += 30
  
  // Contact info completeness (20 points)
  if (lead.email && lead.phone) score += 20
  
  // Company size (20 points)
  if (lead.employeeSize && lead.employeeSize > 100) score += 20
  
  // Industry relevance (30 points)
  const relevantIndustries = ['Manufacturing', 'Logistics', 'Technology', 'Retail']
  if (relevantIndustries.includes(lead.industry)) score += 30
  
  return Math.min(score, 100)
}

export const suggestFollowUp = (lastContact: Date, temperature: string): Date => {
  const today = new Date()
  const daysToAdd = temperature === 'HOT' ? 3 : temperature === 'WARM' ? 7 : 14
  return new Date(today.getTime() + daysToAdd * 24 * 60 * 60 * 1000)
}
