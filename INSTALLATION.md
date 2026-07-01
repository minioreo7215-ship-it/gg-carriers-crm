# GG Carriers CRM - Installation & Setup Guide

## System Requirements

- **OS**: macOS, Linux, or Windows
- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher
- **PostgreSQL**: 14.0 or higher
- **RAM**: Minimum 4GB (8GB recommended)
- **Storage**: 2GB free space

## Step-by-Step Installation

### Step 1: Clone Repository

```bash
git clone https://github.com/minioreo7215-ship-it/gg-carriers-crm.git
cd gg-carriers-crm
```

### Step 2: Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your settings
nano .env

# Setup database
npx prisma migrate dev --name init

# Seed sample data
npx prisma db seed

# Start backend server
npm run dev
```

**Backend runs on**: http://localhost:5000

### Step 3: Setup Frontend (New Terminal)

```bash
cd frontend

# Install dependencies
npm install

# Copy environment template
cp .env.local.example .env.local

# Edit .env.local if needed
nano .env.local

# Start frontend development server
npm run dev
```

**Frontend runs on**: http://localhost:3000

### Step 4: Login

Open browser and go to: **http://localhost:3000**

**Demo Credentials**:
- Email: `admin@ggcarriers.com`
- Password: `Password123`

## Using Docker (Recommended)

### Prerequisites
- Docker
- Docker Compose

### Start Application

```bash
# From project root
docker-compose up -d

# Wait for services to start (30-60 seconds)

# Check logs
docker-compose logs -f
```

**Access Application**:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Database: localhost:5432

### Stop Application

```bash
docker-compose down
```

## Troubleshooting

### Port Already in Use

```bash
# Find process using port 5000
lsof -i :5000

# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Database Connection Error

```bash
# Test PostgreSQL connection
psql -U postgres -h localhost

# Create database if not exists
createdb gg_carriers_crm
```

### Dependencies Issue

```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Production Build

### Backend

```bash
cd backend
npm run build
npm start
```

### Frontend

```bash
cd frontend
npm run build
npm start
```

## Database Management

### View Database UI

```bash
cd backend
npx prisma studio
```

Opens at: http://localhost:5555

### Run Migrations

```bash
cd backend

# Create migration
npx prisma migrate dev --name migration_name

# Deploy to production
npx prisma migrate deploy
```

### Reset Database

```bash
cd backend

# Warning: This deletes all data
npx prisma migrate reset
```

## Testing

### Backend API Test

```bash
# Health check
curl http://localhost:5000/health

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@ggcarriers.com", "password": "Password123"}'
```

## Common Commands

### Frontend

```bash
cd frontend

# Development
npm run dev

# Build
npm run build

# Production
npm start

# Lint
npm run lint

# Type check
npm run type-check
```

### Backend

```bash
cd backend

# Development
npm run dev

# Build
npm run build

# Production
npm start

# Prisma commands
npx prisma generate
npx prisma migrate dev
npx prisma db seed
npx prisma studio
```

## Support & Help

- **Documentation**: See `/docs` folder
- **API Docs**: See `docs/API.md`
- **Database Schema**: See `docs/DATABASE.md`
- **Deployment**: See `docs/DEPLOYMENT.md`
- **Email**: support@ggcarriers.com

## Next Steps

1. ✅ Application is running
2. 📚 Read the Quick Start guide
3. 👥 Create additional users
4. 📊 Import sample leads
5. 🚀 Customize for your business

---

**You're all set! Start managing your leads efficiently with GG Carriers CRM. 🚀**
