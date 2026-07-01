export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">GG Carriers CRM</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">Enterprise-Grade CRM + Field Management System</p>
        <a href="/auth/login" className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Sign In
        </a>
      </div>
    </main>
  )
}
