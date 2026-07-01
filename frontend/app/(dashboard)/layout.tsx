import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard - GG Carriers CRM',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
