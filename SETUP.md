# 🚀 Setup Guide - Health Planner

## 🔐 Environment Variables Setup

### **Step 1: Create Environment File**

Create a `.env` file in the `backend/` directory:

```bash
# backend/.env
SENDGRID_API_KEY=your-sendgrid-api-key-here
SENDGRID_FROM_EMAIL=your-verified-email@domain.com
```

### **Step 2: Get Your SendGrid API Key**

1. Go to [SendGrid Dashboard](https://app.sendgrid.com/)
2. Navigate to Settings → API Keys
3. Create a new API Key with "Mail Send" permissions
4. Copy the API key to your `.env` file

### **Step 3: Verify Your Email**

1. In SendGrid Dashboard, go to Settings → Sender Authentication
2. Verify your email address
3. Add the verified email to your `.env` file

### **Step 4: Run the Application**

```bash
# Backend
cd backend
mvn spring-boot:run

# Frontend (in another terminal)
cd frontend
npm install
npm run dev
```

## 📁 File Structure

```
bmihealthplanner/
├── backend/
│   ├── .env                    # Your API keys (not pushed to GitHub)
│   └── src/main/resources/
│       └── application.yml     # Uses environment variables
├── frontend/
├── application-template.yml    # Template for setup
└── SETUP.md                   # This file
```

## 🔒 Security Notes

- ✅ `.env` file is in `.gitignore` (not pushed to GitHub)
- ✅ API keys are loaded from environment variables
- ✅ Template files are safe to share
- ✅ Your API keys stay private

## 🚀 Deployment

For production deployment, set environment variables on your hosting platform:

**Heroku:**
```bash
heroku config:set SENDGRID_API_KEY=your-api-key
heroku config:set SENDGRID_FROM_EMAIL=your-email
```

**Vercel:**
- Go to Project Settings → Environment Variables
- Add `SENDGRID_API_KEY` and `SENDGRID_FROM_EMAIL`

---

**Your API keys are now completely secure! 🔐**
