# Backend - MERN Email Application

Node.js + Express + TypeScript backend for the MERN Email Application.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Run in development mode
npm run dev

# Or build and run production
npm run build
npm start
```

Server starts on `http://localhost:5000`

## 📋 Available Scripts

- `npm run dev` - Run with nodemon (auto-reload on file changes)
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run compiled JavaScript (production)

## 🗂️ Project Structure

```
src/
├── controllers/
│   ├── authController.ts    # Login, logout, user management
│   └── emailController.ts   # Email CRUD and sending
├── middleware/
│   └── auth.ts              # JWT authentication middleware
├── models/
│   ├── User.ts              # User schema with timestamps
│   └── EmailSchedule.ts     # Email schedule schema
├── routes/
│   ├── authRoutes.ts        # Auth API routes
│   └── emailRoutes.ts       # Email API routes
├── utils/
│   ├── db.ts                # MongoDB connection
│   └── emailService.ts      # Nodemailer configuration
└── server.ts                # Express app entry point
```

## 🔧 Environment Variables

Create `.env` file in this directory:

```env
# MongoDB Connection (Required)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# JWT Secret (Required - min 32 characters)
JWT_SECRET=your_super_secret_jwt_key_here

# Server Port (Optional - default: 5000)
PORT=5000

# Email Configuration (Required for email sending)
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=your_mailtrap_username
EMAIL_PASS=your_mailtrap_password
EMAIL_FROM="MERN Email App" <noreply@example.com>
```

## 🌐 API Routes

### Authentication (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/login` | Login user | No |
| POST | `/logout` | Logout user (records timestamp) | Yes |
| GET | `/me` | Get current user info | Yes |
| GET | `/seed` | Create test user | No |

**Login Request:**
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

**Login Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "email": "test@example.com",
    "name": "Test User"
  }
}
```

### Email Schedules (`/api/emails`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all user's emails | Yes |
| GET | `/:id` | Get specific email | Yes |
| POST | `/` | Create new email | Yes |
| PUT | `/:id` | Update email | Yes |
| DELETE | `/:id` | Delete email | Yes |
| POST | `/:id/send` | Send email now | Yes |

**Create Email Request:**
```json
{
  "email": "recipient@example.com",
  "date": "2026-02-15",
  "description": "Meeting reminder"
}
```

## 🧩 Models

### User Model
- `email` (String, unique) - User email address
- `password` (String, hashed) - bcrypt hashed password
- `name` (String) - User's name
- `loginTimestamps` (Array of Dates) - All login times
- `logoutTimestamps` (Array of Dates) - All logout times
- `createdAt` (Date) - Account creation time
- `updatedAt` (Date) - Last update time

### EmailSchedule Model
- `email` (String) - Recipient email address
- `date` (Date) - Scheduled date
- `description` (String) - Email content/description
- `userId` (ObjectId) - Reference to User model
- `status` (String: pending/sent/failed) - Email status
- `sentAt` (Date) - When email was sent
- `createdAt` (Date) - When schedule was created
- `updatedAt` (Date) - Last update time

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. Login to get a token
2. Include token in header: `Authorization: Bearer <token>`
3. Token expires in 24 hours

Protected routes will return `401 Unauthorized` if token is missing or invalid.

## 📧 Email Service

Emails are sent using Nodemailer with the following template:

**Subject:** "Hi Salam kenal"

**Body:**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #333;">Hi Salam kenal</h2>
  <p style="font-size: 16px; line-height: 1.6; color: #555;">
    {description from form}
  </p>
</div>
```

## 🐛 Debugging

### Common Issues

**TypeScript compilation errors:**
```bash
npm run build
```
Check for type errors in the output.

**MongoDB connection fails:**
- Check IP whitelist in MongoDB Atlas
- Verify connection string format
- Ensure password is URL-encoded if it has special characters

**Email not sending:**
- Check email service credentials in `.env`
- Verify EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS
- Restart server after changing `.env`

### Logs

Server logs to console:
- MongoDB connection status
- Server startup message
- Email sending confirmations
- Error messages

## 📦 Dependencies

**Production:**
- express - Web framework
- mongoose - MongoDB ODM
- bcryptjs - Password hashing
- jsonwebtoken - JWT authentication
- cors - Cross-origin requests
- dotenv - Environment variables
- nodemailer - Email sending

**Development:**
- typescript - TypeScript compiler
- ts-node - Run TypeScript directly
- nodemon - Auto-reload on changes
- @types/* - Type definitions
