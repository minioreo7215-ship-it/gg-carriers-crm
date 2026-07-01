#!/bin/bash

echo "🚀 GG Carriers CRM - Quick Setup"
echo "================================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install npm"
    exit 1
fi

echo "✅ npm version: $(npm --version)"
echo ""

# Setup Backend
echo "📦 Setting up Backend..."
cd backend
echo "Installing dependencies..."
npm install

echo "Copying environment file..."
cp .env.example .env

echo ""
echo "⚠️  Please update backend/.env with your configuration"
echo ""

# Setup Frontend
echo "📦 Setting up Frontend..."
cd ../frontend
echo "Installing dependencies..."
npm install

echo "Copying environment file..."
cp .env.local.example .env.local

echo ""
echo "⚠️  Please update frontend/.env.local with your API URL"
echo ""

# Summary
echo "✅ Setup completed!"
echo ""
echo "Next steps:"
echo "1. Update backend/.env with your database URL and API keys"
echo "2. Update frontend/.env.local with your API URL"
echo "3. Run: cd backend && npm run dev"
echo "4. In another terminal: cd frontend && npm run dev"
echo "5. Open http://localhost:3000 in your browser"
echo ""
echo "Demo login:"
echo "Email: admin@ggcarriers.com"
echo "Password: Password123"
echo ""
echo "Happy coding! 🎉"
