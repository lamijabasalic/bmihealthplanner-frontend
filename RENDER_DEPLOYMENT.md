# 🚀 Render Deployment Guide

## Quick Deploy to Render

### Prerequisites
- GitHub repository connected to Render
- Aiven MySQL database credentials
- SendGrid API key

## Backend Deployment

### 1. Create Backend Service
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repo: `lamijabasalic/bmihealthplanner`
4. Configure:
   - **Name**: `health-planner-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Docker`
   - **Dockerfile Path**: `Dockerfile.optimized`

### 2. Set Environment Variables
In Render dashboard → Environment tab:
```
AIVEN_DB_PASSWORD=your-actual-aiven-password
SENDGRID_API_KEY=your-sendgrid-api-key-here
SENDGRID_FROM_EMAIL=your-verified-email@domain.com
FRONTEND_URL=https://health-planner-frontend.onrender.com
```

### 3. Deploy Backend
- Click "Create Web Service"
- Wait for build to complete
- Your backend URL: `https://health-planner-backend.onrender.com`

## Frontend Deployment

### 1. Create Frontend Service
1. Click "New +" → "Static Site"
2. Connect your GitHub repo: `lamijabasalic/bmihealthplanner`
3. Configure:
   - **Name**: `health-planner-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

### 2. Set Environment Variables
In Render dashboard → Environment tab:
```
VITE_API_URL=https://health-planner-backend.onrender.com
```

### 3. Deploy Frontend
- Click "Create Static Site"
- Wait for build to complete
- Your frontend URL: `https://health-planner-frontend.onrender.com`

## Testing Your Deployment

1. **Backend Test**: Visit `https://health-planner-backend.onrender.com/swagger`
2. **Frontend Test**: Visit `https://health-planner-frontend.onrender.com`
3. **API Test**: Try creating a health plan

## Troubleshooting

### Common Issues:
- **Build Failures**: Check build logs in Render dashboard
- **Database Connection**: Verify Aiven credentials
- **CORS Errors**: Ensure FRONTEND_URL is set correctly
- **Email Issues**: Verify SendGrid API key

### Logs:
- View logs in Render dashboard → Logs tab
- Check for specific error messages

## Environment Variables Summary

### Backend (.env)
```
AIVEN_DB_PASSWORD=your-aiven-password
SENDGRID_API_KEY=your-sendgrid-api-key-here
SENDGRID_FROM_EMAIL=your-verified-email@domain.com
FRONTEND_URL=https://health-planner-frontend.onrender.com
```

### Frontend (.env.production)
```
VITE_API_URL=https://health-planner-backend.onrender.com
```

## URLs After Deployment
- **Frontend**: `https://health-planner-frontend.onrender.com`
- **Backend API**: `https://health-planner-backend.onrender.com`
- **Swagger Docs**: `https://health-planner-backend.onrender.com/swagger`
