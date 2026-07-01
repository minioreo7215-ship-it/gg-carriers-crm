# For Windows Users - Run this in PowerShell

Write-Host "🚀 GG Carriers CRM - Quick Setup" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green
Write-Host ""

# Check Node.js
$nodeVersion = node --version 2>&1
if ($?) {
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js not found. Please install Node.js 18+" -ForegroundColor Red
    exit 1
}

$npmVersion = npm --version 2>&1
if ($?) {
    Write-Host "✅ npm version: $npmVersion" -ForegroundColor Green
} else {
    Write-Host "❌ npm not found" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Setup Backend
Write-Host "📦 Setting up Backend..." -ForegroundColor Blue
cd backend
Write-Host "Installing dependencies..."
npm install

Write-Host "Copying environment file..."
Copy-Item .env.example .env -Force

Write-Host ""
Write-Host "⚠️  Please update backend/.env with your configuration" -ForegroundColor Yellow
Write-Host ""

# Setup Frontend
Write-Host "📦 Setting up Frontend..." -ForegroundColor Blue
cd ../frontend
Write-Host "Installing dependencies..."
npm install

Write-Host "Copying environment file..."
Copy-Item .env.local.example .env.local -Force

Write-Host ""
Write-Host "⚠️  Please update frontend/.env.local with your API URL" -ForegroundColor Yellow
Write-Host ""

# Summary
Write-Host "✅ Setup completed!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Update backend/.env with your database URL and API keys"
Write-Host "2. Update frontend/.env.local with your API URL"
Write-Host "3. Run: cd backend && npm run dev"
Write-Host "4. In another terminal: cd frontend && npm run dev"
Write-Host "5. Open http://localhost:3000 in your browser"
Write-Host ""
Write-Host "Demo login:" -ForegroundColor Cyan
Write-Host "Email: admin@ggcarriers.com"
Write-Host "Password: Password123"
Write-Host ""
Write-Host "Happy coding! 🎉" -ForegroundColor Green
