# Vercel Deployment Guide

This guide will walk you through deploying the MERN Email App to Vercel (Backend + Frontend).

## Overview

- **Backend**: Deployed to Vercel as Serverless Functions
- **Frontend**: Deployed to Vercel as Static Site
- **Database**: MongoDB Atlas (already cloud-based, no changes needed)
- **Order**: Deploy Backend first, then Frontend

---

## Prerequisites

1. [Vercel Account](https://vercel.com/signup) (free tier works fine)
2. [GitHub Account](https://github.com) (to push your code)
3. Git installed locally

---

## Step 1: Push Code to GitHub

First, commit and push your code to GitHub:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Prepare for Vercel deployment"

# Create GitHub repo and push
git remote add origin https://github.com/YOUR_USERNAME/mern-email-app.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy Backend to Vercel

### 2.1 Go to Vercel Dashboard

1. Login to [Vercel](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository

### 2.2 Configure Backend Deployment

**Root Directory**: `backend`

**Build & Development Settings**:
```
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### 2.3 Environment Variables

Add these environment variables in Vercel Dashboard (Project Settings > Environment Variables):

```
MONGODB_URI=mongodb+srv://melvin:2rw3EFGqeK3Svici@cluster0.0p0301u.mongodb.net/mern-email-app?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
PORT=5000
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=b4f25aa1591748
EMAIL_PASS=5f5fd58cc1398b
EMAIL_FROM="MERN Email App" <noreply@example.com>
NODE_ENV=production
```

**IMPORTANT**: 
- Change `JWT_SECRET` to a secure random string for production
- Consider using a real email service (SendGrid, AWS SES) for production instead of Mailtrap

### 2.4 Deploy Backend

Click "Deploy" and wait for the build to complete.

### 2.5 Get Backend URL

Once deployed, Vercel will give you a URL like:
```
https://mern-email-app-backend.vercel.app
```

**Note this URL** - you'll need it for the frontend.

### 2.6 Update MongoDB Atlas IP Whitelist

In MongoDB Atlas Dashboard:
1. Go to Network Access
2. Click "Add IP Address"
3. Select "Allow Access from Anywhere" (0.0.0.0/0)
   - This is needed for Vercel's serverless functions (dynamic IPs)
4. Click "Confirm"

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Create New Project

1. In Vercel Dashboard, click "Add New Project" again
2. Import the same GitHub repository

### 3.2 Configure Frontend Deployment

**Root Directory**: `frontend`

**Build & Development Settings**:
```
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### 3.3 Environment Variables

Add this environment variable:

```
VITE_API_URL=https://YOUR_BACKEND_URL.vercel.app/api
```

**Replace** `YOUR_BACKEND_URL` with the actual backend URL from Step 2.

**Example**:
```
VITE_API_URL=https://mern-email-app-backend.vercel.app/api
```

### 3.4 Deploy Frontend

Click "Deploy" and wait for the build.

---

## Step 4: Verify Deployment

### 4.1 Test Backend

Visit your backend URL + `/api/health`:
```
https://YOUR_BACKEND_URL.vercel.app/api/health
```

Should return:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

### 4.2 Seed Test User (Optional)

You can seed the test user by visiting:
```
https://YOUR_BACKEND_URL.vercel.app/api/auth/seed
```

### 4.3 Test Frontend

Visit your frontend URL and try logging in:
- **Email**: test@example.com
- **Password**: password123

---

## Common Issues & Solutions

### Issue 1: CORS Errors

If you see CORS errors in the browser console:

1. Go to Backend Vercel Project > Settings > Environment Variables
2. Add:
```
CORS_ORIGIN=https://YOUR_FRONTEND_URL.vercel.app
```

3. Redeploy backend

### Issue 2: MongoDB Connection Failed

1. Check that MongoDB Atlas IP whitelist includes `0.0.0.0/0`
2. Verify `MONGODB_URI` is correct in Vercel environment variables
3. Check Vercel logs (Project > Deployments > Click deployment > Functions tab)

### Issue 3: JWT Secret Not Working

Make sure `JWT_SECRET` is set and is at least 32 characters long for security.

---

## Production Checklist

Before using in production:

- [ ] Change `JWT_SECRET` to a secure random string
- [ ] Replace Mailtrap with real email service (SendGrid, AWS SES, etc.)
- [ ] Update `EMAIL_FROM` to your actual domain
- [ ] Add rate limiting to API endpoints
- [ ] Enable HTTPS (automatic on Vercel)
- [ ] Add input validation/sanitization
- [ ] Set up monitoring/logging

---

## URLs After Deployment

**Backend**: `https://mern-email-app-backend.vercel.app`
**Frontend**: `https://mern-email-app-frontend.vercel.app`

Both will be automatically deployed when you push to GitHub (CI/CD).

---

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check MongoDB Atlas connection logs
3. Verify all environment variables are set
4. Test API endpoints using Postman or browser
