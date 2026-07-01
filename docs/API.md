# GG Carriers CRM - Backend API Documentation

## Overview
Enterprise-grade REST API for CRM & Field Management System

## Base URL
```
http://localhost:5000/api
```

## Authentication
All endpoints (except `/auth/login` and `/auth/register`) require JWT token in header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Login
```
POST /auth/login

Request:
{
  "email": "admin@ggcarriers.com",
  "password": "Password123"
}

Response:
{
  "token": "eyJhbGc...",
  "user": {
    "id": "user_id",
    "email": "admin@ggcarriers.com",
    "name": "Admin",
    "role": "SUPER_ADMIN"
  }
}
```

#### Register
```
POST /auth/register

Request:
{
  "email": "user@example.com",
  "name": "User Name",
  "password": "password123",
  "phone": "+919876543210"
}
```

#### Verify Token
```
POST /auth/verify
Headers: Authorization: Bearer <token>

Response:
{
  "user": { ... }
}
```

### Leads

#### Get Leads
```
GET /leads?skip=0&take=20&status=NEW_LEAD&temperature=HOT&search=TCS
```

#### Get Single Lead
```
GET /leads/:id
```

#### Create Lead
```
POST /leads

Request:
{
  "companyId": "company_id",
  "contactId": "contact_id",
  "assignedToId": "user_id",
  "status": "NEW_LEAD",
  "temperature": "HOT"
}
```

#### Update Lead
```
PUT /leads/:id
```

#### Delete Lead
```
DELETE /leads/:id
```

### Companies

#### Get Companies
```
GET /companies?skip=0&take=20&search=TCS
```

#### Create Company
```
POST /companies

Request:
{
  "name": "Company Name",
  "gst": "GST_NUMBER",
  "industry": "Technology",
  "city": "Mumbai",
  "state": "Maharashtra",
  "website": "https://example.com"
}
```

### Contacts

#### Get Contacts
```
GET /contacts?skip=0&take=20&companyId=company_id
```

#### Create Contact
```
POST /contacts

Request:
{
  "companyId": "company_id",
  "name": "Contact Name",
  "designation": "Manager",
  "mobileNumber": "+919876543210",
  "email": "contact@example.com"
}
```

### Analytics

#### Dashboard Stats
```
GET /analytics/dashboard

Response:
{
  "stats": {
    "totalLeads": 100,
    "convertedLeads": 25,
    "conversionRate": "25.00",
    "hotLeads": 30,
    "warmLeads": 40,
    "coldLeads": 30,
    "totalCompanies": 50,
    "todaysMeetings": 5,
    "pendingFollowUps": 15,
    "totalQuotations": 10
  }
}
```

## Status Codes
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

## Error Response
```json
{
  "message": "Error description",
  "error": "Error details (development only)"
}
```
