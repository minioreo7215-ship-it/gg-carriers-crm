# Environment Variables Setup

## Backend Configuration

### Database
```
DATABASE_URL=postgresql://username:password@localhost:5432/gg_carriers_crm
```

### Authentication
```
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters
JWT_EXPIRY=7d
GOOGLE_CLIENT_ID=your_google_client_id_from_console
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Email Service (Gmail)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_specific_password
SMTP_FROM=noreply@ggcarriers.com
```

### SMS Service (Twilio)
```
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890
```

### Application
```
NODE_ENV=production
PORT=5000
API_URL=https://api.yourdomain.com
FRONTEND_URL=https://yourdomain.com
```

### File Storage (AWS S3)
```
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=ap-south-1
AWS_BUCKET_NAME=gg-carriers-crm-bucket
```

## Frontend Configuration

```
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_APP_NAME=GG Carriers CRM
```

## Obtaining Credentials

### Google OAuth
1. Go to https://console.cloud.google.com/
2. Create new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs

### Twilio
1. Sign up at https://www.twilio.com/
2. Get Account SID and Auth Token
3. Purchase phone number

### AWS S3
1. Create IAM user with S3 permissions
2. Generate access keys
3. Create S3 bucket

## Database Setup

### PostgreSQL Local
```bash
# Install PostgreSQL
# macOS:
brew install postgresql

# Linux:
sudo apt-get install postgresql postgresql-contrib

# Windows:
# Download from https://www.postgresql.org/download/windows/

# Create database
createdb gg_carriers_crm

# Create user
createuser gg_user -P
# Password: your_password

# Grant privileges
psql -d gg_carriers_crm
GRANT ALL PRIVILEGES ON DATABASE gg_carriers_crm TO gg_user;
```

### Supabase (Recommended for Production)
1. Create account at https://supabase.com/
2. Create new project
3. Copy connection string
4. Set as DATABASE_URL

## Verification

Test configuration:
```bash
cd backend
npm run dev

# In another terminal
curl http://localhost:5000/health
```

Should return: `{"status": "Server is running"}`
