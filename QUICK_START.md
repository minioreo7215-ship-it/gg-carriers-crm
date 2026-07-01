# QUICK START GUIDE

## 🚀 Getting Started in 5 Minutes

### Installation

```bash
# Clone the repository
git clone https://github.com/minioreo7215-ship-it/gg-carriers-crm.git
cd gg-carriers-crm

# Setup Backend
cd backend
npm install
cp .env.example .env
npx prisma migrate dev
npm run dev

# In another terminal, Setup Frontend
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

### Access Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Prisma Studio**: `cd backend && npx prisma studio`

### Default Login Credentials

**Super Admin**
- Email: `admin@ggcarriers.com`
- Password: `Password123`

**Other Demo Users**
- Manager: `manager@ggcarriers.com`
- Exec 1: `executive1@ggcarriers.com`
- Exec 2: `executive2@ggcarriers.com`
- Telecaller: `telecaller@ggcarriers.com`
- Data Entry: `dataentry@ggcarriers.com`

All have password: `Password123`

## 📁 Project Structure

```
├── frontend/           # Next.js React application
│   ├── app/           # Pages and layouts
│   ├── components/    # Reusable components
│   └── styles/        # Tailwind CSS
│
├── backend/           # Express.js API
│   ├── src/           # Source code
│   ├── prisma/        # Database schema
│   └── package.json
│
├── database/          # Database files
├── docs/              # Documentation
└── docker-compose.yml # Docker setup
```

## 🎯 Key Features

✅ Lead Management with AI Scoring  
✅ Company & Contact Master  
✅ Sales Pipeline Kanban  
✅ Meeting & Task Management  
✅ Quotation Generation  
✅ Analytics Dashboard  
✅ Role-Based Access Control  
✅ Excel Import with Validation  
✅ Field Sales GPS Tracking  
✅ Mobile Responsive Design  

## 📊 Dashboard Overview

The dashboard shows:
- Total leads, companies, contacts
- Conversion metrics
- Lead temperature distribution (Hot/Warm/Cold)
- Team performance
- Today's meetings and follow-ups
- Pending quotations

## 🔌 API Endpoints

### Auth
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - Create account
- `POST /api/auth/verify` - Verify token

### Leads
- `GET /api/leads` - List leads
- `GET /api/leads/:id` - Get lead details
- `POST /api/leads` - Create lead
- `PUT /api/leads/:id` - Update lead
- `DELETE /api/leads/:id` - Delete lead

### Companies
- `GET /api/companies` - List companies
- `POST /api/companies` - Create company
- `GET /api/companies/:id` - Get company

### Analytics
- `GET /api/analytics/dashboard` - Dashboard stats

## 🛠️ Technology Stack

**Frontend**
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Recharts

**Backend**
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT Auth

## 🐳 Docker Setup

```bash
docker-compose up -d
```

This starts all services:
- PostgreSQL database
- Backend API
- Frontend application

## 📝 Available Scripts

### Backend
```bash
npm run dev              # Development
npm run build            # Build
npm start                # Production
npx prisma studio       # Database UI
npx prisma migrate dev   # Migration
```

### Frontend
```bash
npm run dev              # Development
npm run build            # Build
npm start                # Production
npm run lint             # Linting
```

## 🔒 Security Features

✅ JWT Authentication  
✅ Password Hashing (bcrypt)  
✅ Role-Based Access Control  
✅ CORS Protection  
✅ Rate Limiting  
✅ SQL Injection Prevention  
✅ XSS Protection  
✅ CSRF Tokens  

## 📱 Responsive Design

Works perfectly on:
- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)

## 🎨 Dark Mode

Toggle dark mode using the moon icon in navbar.
Preference is saved to localStorage.

## 📞 Support

For help:
- Check documentation in `/docs`
- Review API docs at `/docs/API.md`
- Contact: support@ggcarriers.com

## 📄 License

Proprietary software for GG Carriers Inc.

---

**Happy Selling! 🚀**
