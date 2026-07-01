# Database Schema Documentation

## Tables

### Users
- Authentication & Role Management
- Fields: id, email, name, password, role, isActive, lastLogin
- Roles: SUPER_ADMIN, ADMIN, SALES_MANAGER, SALES_EXECUTIVE, TELECALLER, DATA_ENTRY_OPERATOR

### Companies
- Company Master Data
- Fields: name, gst, industry, city, state, website, aiScore, verificationStatus
- Relations: contacts, leads, meetings, quotations

### Contacts
- Decision Makers & Contact Information
- Fields: name, designation, mobile, email, linkedinUrl, decisionMaker
- Relations: company, leads, meetings

### Leads
- Lead Management & Pipeline
- Fields: status, temperature, aiScore, predictedConversion, requirements
- Status: NEW_LEAD → VERIFIED → ... → CONVERTED
- Temperature: HOT, WARM, COLD

### Meetings
- Meeting Scheduling & Tracking
- Fields: title, type, location, notes, status, outcome
- Relations: lead, company, contact, createdBy

### Tasks
- Task Assignment & Tracking
- Fields: title, description, priority, status, dueDate
- Priority: LOW, MEDIUM, HIGH, URGENT

### Quotations
- Quote Management
- Fields: quotationNumber, subtotal, tax, total, status
- Status: DRAFT → SENT → VIEWED → ACCEPTED

### Activities
- Call Logs & Interactions
- Fields: type, duration, outcome, notes, recordingUrl
- Type: CALL, EMAIL, SMS, WHATSAPP, MEETING

### Documents
- File Storage Metadata
- Fields: fileName, fileUrl, documentType, fileSize
- Types: GST, PAN, AGREEMENT, etc.

### Reminders
- Notification Scheduling
- Fields: reminderTime, isCompleted, channels
- Channels: BROWSER, EMAIL, SMS, WHATSAPP

### FieldSalesGPS
- GPS Tracking for Sales Team
- Fields: userId, checkInTime, checkInLat, checkInLng

### AuditLogs
- System Activity Tracking
- Fields: userId, action, entityType, changes, timestamp

## Relationships

```
User (1) ──┬── (N) Lead
          ├── (N) Meeting
          ├── (N) Task
          └── (N) Activity

Company (1) ──┬── (N) Contact
             ├── (N) Lead
             ├── (N) Meeting
             └── (N) Quotation

Lead (1) ──┬── (N) Meeting
          ├── (N) Task
          ├── (N) Activity
          └── (N) Quotation
```
