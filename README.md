# MERN Email Application

A full-stack email scheduling application built with the MERN stack (MongoDB, Express.js, React, Node.js) with TypeScript support. This project was created as a technical test assignment demonstrating CRUD operations, authentication, email scheduling, and calendar functionality.

## 🚀 Quick Start

Get the application running in 3 simple steps:

```bash
# Terminal 1 - Start Backend
cd backend
npm run dev

# Terminal 2 - Start Frontend (in new terminal)
cd frontend
npm run dev

# Terminal 3 - Seed Test User (in new terminal)
curl http://localhost:5000/api/auth/seed
```

Then open http://localhost:5173 and login with:
- **Email**: test@example.com
- **Password**: password123

## 🌐 Live Demo

**Deployed Application:**
- **Frontend**: https://fe-mern-email-app.vercel.app
- **Backend API**: https://be-mern-email-app.vercel.app

**Test Credentials:**
- Email: `test@example.com`
- Password: `password123`

### 📧 Email Testing with Mailtrap

This application uses [Mailtrap](https://mailtrap.io) for safe email testing. When you send an email through the app, it gets captured in the Mailtrap inbox rather than sent to real email addresses.

**How to verify email sending:**
1. Login to the deployed app
2. Create or select an email schedule
3. Click "Send Now"
4. Check the Mailtrap inbox screenshot below:

![Mailtrap Inbox Screenshot](docs/mailtrap-inbox.png)

*The screenshot shows the "Hi Salam kenal" email template successfully delivered to the Mailtrap testing inbox.*

## ✨ Features

- **User Authentication**: Login/logout functionality with timestamps recorded in the database
- **Email Scheduling**: CRUD operations for email schedules with date, recipient email, and description
- **Calendar View**: Display emails in a calendar layout with click-to-create functionality
- **Email List View**: Table view of all email schedules with status tracking
- **Email Sending**: Send emails using customizable templates ("Hi Salam kenal")
- **TypeScript**: Fully typed backend and frontend

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, TypeScript, MongoDB (Mongoose), JWT Authentication, Nodemailer
- **Frontend**: React, TypeScript, Vite, react-big-calendar, react-router-dom, Axios
- **Database**: MongoDB Atlas (Cloud)
- **Authentication**: JWT (JSON Web Tokens)
- **Email Service**: Nodemailer with Mailtrap/Ethereal for testing

## 📁 Project Structure

```
mern-email-app/
├── backend/                 # Node.js + Express API
│   ├── src/
│   │   ├── controllers/     # Route controllers (auth, email)
│   │   ├── middleware/      # Authentication middleware
│   │   ├── models/          # MongoDB models (User, EmailSchedule)
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Utilities (DB connection, email service)
│   │   └── server.ts        # Main server file
│   ├── .env                 # Environment variables (not in git)
│   ├── .env.example         # Environment variables template
│   └── package.json
├── frontend/                # React application
│   ├── src/
│   │   ├── components/      # React components (Navbar, EmailModal)
│   │   ├── contexts/        # Auth context
│   │   ├── pages/           # Page components (Login, Calendar, EmailList)
│   │   ├── services/        # API services (axios)
│   │   ├── types/           # TypeScript interfaces
│   │   └── ...
│   ├── .env                 # Environment variables (not in git)
│   ├── .env.example         # Environment variables template
│   └── package.json
├── .gitignore               # Git ignore rules
└── README.md                # This file
```

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (cloud database)
- npm or yarn package manager
- Git

## 🎯 How to Run the Backend and Frontend

### Backend Setup

#### Step 1: Install Dependencies
```bash
cd backend
npm install
```

#### Step 2: Configure Environment Variables
Create a `.env` file in the `backend` directory. See `.env.example` for template:

```bash
cp .env.example .env
```

Required environment variables:
- `MONGODB_URI` - Your MongoDB Atlas connection string
- `JWT_SECRET` - Random secret key for JWT
- `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS` - Mailtrap credentials

#### Step 3: Run the Backend

**Development mode (with auto-reload using nodemon):**
```bash
npm run dev
```

**Production mode:**
```bash
npm run build
npm start
```

The server will start on `http://localhost:5000`

#### Step 4: Seed the Test User
After starting the server, create the dummy test user:
```bash
# Using curl
curl http://localhost:5000/api/auth/seed

# Or open in browser
http://localhost:5000/api/auth/seed
```

### Frontend Setup

#### Step 1: Install Dependencies
```bash
cd frontend
npm install
```

#### Step 2: Configure Environment Variables
Create a `.env` file in the `frontend` directory:

```bash
cp .env.example .env
```

#### Step 3: Run the Frontend

**Development mode:**
```bash
npm run dev
```

The React app will start on `http://localhost:5173`

**Production build:**
```bash
npm run build
```

## 🔐 Required Environment Files (.env.example)

### Backend Environment Variables

Create `backend/.env`:

```env
# MongoDB Connection (MongoDB Atlas)
# Format: mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
# Get this from MongoDB Atlas dashboard > Database > Connect > Drivers > Node.js
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/mern-email-app?retryWrites=true&w=majority

# JWT Secret (generate a random string, min 32 characters)
# Used to sign JWT tokens for authentication
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production

# Server Configuration
PORT=5000

# Email Configuration (Mailtrap for testing)
# 1. Go to https://mailtrap.io and create free account
# 2. Create an inbox
# 3. Go to SMTP Settings and copy credentials
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=your_mailtrap_username_here
EMAIL_PASS=your_mailtrap_password_here
EMAIL_FROM="MERN Email App" <noreply@example.com>

# Alternative: Ethereal Email (for testing)
# Uncomment and use if you prefer Ethereal
# EMAIL_HOST=smtp.ethereal.email
# EMAIL_PORT=587
# EMAIL_USER=your_ethereal_username
# EMAIL_PASS=your_ethereal_password
```

### Frontend Environment Variables

Create `frontend/.env`:

```env
# API URL for backend connection
# For local development:
VITE_API_URL=http://localhost:5000/api

# For production (after deployment):
# VITE_API_URL=https://your-backend-url.vercel.app/api
```

## 🗄️ How to Set Up a MongoDB Connection

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/atlas
2. Sign up for a free account
3. Create a new cluster (free tier available)

### Step 2: Get Connection String
1. In MongoDB Atlas dashboard, click "Database"
2. Click "Connect" on your cluster
3. Select "Drivers"
4. Select "Node.js"
5. Copy the connection string

### Step 3: Configure Database Access
1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create username and password
5. Set privileges to "Read and write to any database"

### Step 4: Configure Network Access
1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. For development, click "Allow Access from Anywhere" (0.0.0.0/0)
4. For production, add your specific server IP

### Step 5: Update .env
Replace the connection string in `backend/.env`:
```env
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/mern-email-app?retryWrites=true&w=majority
```

## 📧 How to Test the Email Sending Feature

### Using Mailtrap (Recommended for Testing)

Mailtrap catches all emails in a virtual inbox without sending to real addresses.

**Setup:**
1. Go to https://mailtrap.io
2. Sign up with GitHub or email
3. Click "Create Inbox"
4. Name it "MERN Email Testing"
5. Click on your inbox
6. Go to "SMTP Settings" tab
7. Copy the credentials (Host, Port, Username, Password)
8. Update `backend/.env` with these credentials
9. Restart backend server

**Testing:**
1. Login to the app
2. Create a new email schedule
3. Click "Send Now" on the email
4. Check your Mailtrap inbox - the email will appear there

### Using Ethereal Email (Alternative)

Ethereal generates fake email accounts for testing.

**Setup:**
1. Go to https://ethereal.email
2. Click "Create Ethereal Account"
3. Copy the SMTP credentials shown
4. Update `backend/.env`:
```env
EMAIL_HOST=smtp.ethereal.email
EMAIL_PORT=587
EMAIL_USER=your_ethereal_username
EMAIL_PASS=your_ethereal_password
```
5. Restart backend

**Testing:**
1. Send an email through the app
2. Go to Ethereal dashboard
3. View the "fake" email that was generated

### Using Gmail SMTP (For Real Emails)

To send to actual email addresses:

**Setup:**
1. Go to Google Account settings
2. Enable 2-Factor Authentication
3. Generate "App Password" (not your regular password)
4. Update `backend/.env`:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_FROM="MERN Email App" <your_gmail@gmail.com>
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - Login user (returns JWT token)
- `POST /api/auth/logout` - Logout user (requires auth)
- `GET /api/auth/me` - Get current user (requires auth)
- `GET /api/auth/seed` - Create test user

### Email Schedules
- `GET /api/emails` - Get all email schedules (requires auth)
- `GET /api/emails/:id` - Get single email schedule (requires auth)
- `POST /api/emails` - Create new email schedule (requires auth)
- `PUT /api/emails/:id` - Update email schedule (requires auth)
- `DELETE /api/emails/:id` - Delete email schedule (requires auth)
- `POST /api/emails/:id/send` - Send email immediately (requires auth)

## 🐛 Troubleshooting

### MongoDB Connection Issues
```
Error: connect ETIMEDOUT
```
**Solution:** Check IP whitelist in MongoDB Atlas Network Access

### Email Not Sending
```
Error: connect ECONNREFUSED
```
**Solution:** Check email credentials in `.env`, restart backend

### Frontend Can't Connect to Backend
```
Network Error
```
**Solution:** Ensure `VITE_API_URL` in frontend `.env` matches backend URL

## 📚 Additional Documentation

- See `backend/README.md` for backend-specific details
- See `frontend/README.md` for frontend-specific details

## 📝 License

This project is created for a technical test assignment.

