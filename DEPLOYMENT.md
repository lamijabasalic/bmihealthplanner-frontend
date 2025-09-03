# 🚀 Deployment Guide - Health Planner

## 🔐 Handling API Keys Securely

### **Local Development**
Your API keys are stored locally and won't be pushed to GitHub.

### **Production Deployment Options**

#### **Option 1: Environment Variables (Recommended)**

**For Heroku:**
```bash
heroku config:set SENDGRID_API_KEY=your-api-key-here
heroku config:set SENDGRID_FROM_EMAIL=your-email@domain.com
```

**For Vercel:**
1. Go to Project Settings → Environment Variables
2. Add:
   - `SENDGRID_API_KEY`
   - `SENDGRID_FROM_EMAIL`

**For AWS:**
```bash
aws secretsmanager create-secret --name "health-planner-sendgrid" --secret-string '{"api-key":"your-api-key","email":"your-email"}'
```

#### **Option 2: GitHub Secrets (For GitHub Actions)**

1. Go to your repository → Settings → Secrets and variables → Actions
2. Add repository secrets:
   - `SENDGRID_API_KEY`
   - `SENDGRID_FROM_EMAIL`

#### **Option 3: Docker Deployment**

Create a `docker-compose.yml`:
```yaml
version: '3.8'
services:
  health-planner-backend:
    build: ./backend
    environment:
      - SENDGRID_API_KEY=${SENDGRID_API_KEY}
      - SENDGRID_FROM_EMAIL=${SENDGRID_FROM_EMAIL}
    ports:
      - "8080:8080"
```

### **Configuration Files**

- **`application.yml`** - Contains your actual API key (local only)
- **`application-template.yml`** - Template for deployment (safe to push)
- **`.env`** - Local environment variables (not pushed)

### **Security Checklist**

- ✅ API keys are not in GitHub
- ✅ Environment variables used in production
- ✅ Template files provided for setup
- ✅ `.gitignore` protects sensitive files

### **Quick Setup for New Developers**

1. Clone the repository
2. Copy `application-template.yml` to `application.yml`
3. Replace placeholder values with your API keys
4. Run the application

---

**Remember: Never commit API keys to version control!**
