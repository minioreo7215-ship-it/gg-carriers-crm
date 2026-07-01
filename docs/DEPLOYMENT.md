# Deployment Guide

## Prerequisites
- Node.js 18+
- PostgreSQL 15+
- Git
- npm or yarn

## Local Development

### 1. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Update .env with your values
npx prisma migrate dev --name init
npm run dev
```

### 2. Setup Frontend
```bash
cd ../frontend
npm install
cp .env.local.example .env.local
# Update .env.local with API URL
npm run dev
```

### 3. Access Application
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Login: admin@ggcarriers.com / Password123

## Production Deployment

### Option 1: Vercel + Railway + Supabase

#### Deploy Frontend (Vercel)
```bash
npm install -g vercel
vercel login
cd frontend
vercel
```

#### Deploy Backend (Railway)
```bash
npm install -g @railway/cli
railway login
cd backend
railway init
railway up
```

#### Deploy Database (Supabase)
1. Create account at supabase.com
2. Create new project
3. Copy DATABASE_URL
4. Add to backend environment variables

### Option 2: Docker Compose

```bash
docker-compose up -d
```

This starts:
- PostgreSQL on port 5432
- Backend API on port 5000
- Frontend on port 3000

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=your_secret_key
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://yourdomain.com
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

## Database Migration

```bash
cd backend
npx prisma migrate deploy
npx prisma db seed
```

## Performance Optimization

1. **Enable Caching**
   - Redis for session management
   - CDN for static assets

2. **Database Indexing**
   - Indexes on frequently queried columns
   - Full-text search indexes

3. **API Rate Limiting**
   - Configure in Express middleware

4. **Monitoring**
   - Use Sentry for error tracking
   - Set up uptime monitoring

## Scaling

For 1M+ leads:
1. Use database read replicas
2. Implement API caching
3. Use message queues for heavy operations
4. Horizontal scaling of backend servers

## Support

For issues or questions, contact: support@ggcarriers.com
