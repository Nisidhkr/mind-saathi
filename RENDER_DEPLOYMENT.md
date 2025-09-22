# 🚀 Render Deployment Guide - Unified Mind App

## 📋 Pre-Deployment Setup

### ✅ **1. Push to GitHub**
```bash
# Initialize git repository (if not already done)
git init
git add .
git commit -m "Initial commit - Ready for Render deployment"

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/unified-mind-app.git
git branch -M main
git push -u origin main
```

### ✅ **2. MongoDB Atlas Setup**
1. **Create MongoDB Atlas Account**: https://www.mongodb.com/atlas
2. **Create Cluster**: Choose free tier
3. **Create Database User**: 
   - Username: `unified_mind_user`
   - Password: Generate strong password
4. **Whitelist IP**: Add `0.0.0.0/0` (all IPs) for Render
5. **Get Connection String**: 
   ```
   mongodb+srv://unified_mind_user:<password>@cluster0.xxxxx.mongodb.net/unified_mind_app
   ```

## 🌐 Render Deployment Steps

### **Method 1: Using render.yaml (Recommended)**

1. **Connect Repository to Render**:
   - Go to https://render.com
   - Sign up/Login with GitHub
   - Click "New" → "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect `render.yaml`

2. **Configure Environment Variables**:
   The following will be set automatically, but you need to provide:
   
   **Backend Service Environment Variables**:
   ```
   MONGO_URI=mongodb+srv://unified_mind_user:<password>@cluster0.xxxxx.mongodb.net/unified_mind_app
   FIREBASE_PROJECT_ID=sihproject-bb92f
   FIREBASE_PRIVATE_KEY=<your-firebase-private-key>
   FIREBASE_CLIENT_EMAIL=<your-firebase-client-email>
   ```

3. **Deploy**: Click "Apply" and Render will deploy all services

### **Method 2: Manual Deployment**

#### **Step 1: Deploy Backend**
1. **New Web Service**:
   - Repository: Your GitHub repo
   - Branch: `main`
   - Root Directory: `backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`

2. **Environment Variables**:
   ```
   NODE_ENV=production
   PORT=10000
   MONGO_URI=mongodb+srv://unified_mind_user:<password>@cluster0.xxxxx.mongodb.net/unified_mind_app
   JWT_SECRET=unified-mind-super-secret-jwt-key-2024
   FIREBASE_PROJECT_ID=sihproject-bb92f
   FIREBASE_PRIVATE_KEY=<your-firebase-private-key>
   FIREBASE_CLIENT_EMAIL=<your-firebase-client-email>
   ALLOWED_ORIGINS=https://unified-mind-dashboard.onrender.com,https://unified-mind-chat.onrender.com,https://unified-mind-mindfulness.onrender.com,https://unified-mind-resources.onrender.com
   ```

#### **Step 2: Deploy Dashboard Frontend**
1. **New Static Site**:
   - Repository: Your GitHub repo
   - Branch: `main`
   - Build Command: `npm run build:dashboard`
   - Publish Directory: `dashboard/dist`

#### **Step 3: Deploy Chat Frontend**
1. **New Static Site**:
   - Repository: Your GitHub repo
   - Branch: `main`
   - Build Command: `npm run build:chat`
   - Publish Directory: `chat app FINAL/frontend/dist`

#### **Step 4: Deploy Mindfulness Frontend**
1. **New Static Site**:
   - Repository: Your GitHub repo
   - Branch: `main`
   - Build Command: `npm run build:mindfulness`
   - Publish Directory: `mindfulness-client/build`

#### **Step 5: Deploy Resources Frontend**
1. **New Static Site**:
   - Repository: Your GitHub repo
   - Branch: `main`
   - Build Command: `npm run build:resource`
   - Publish Directory: `resource/build`

## 🔧 Post-Deployment Configuration

### **1. Update Frontend API URLs**
After backend deployment, update the API URLs in frontend environment variables:

**Dashboard (.env)**:
```
VITE_API_BASE_URL=https://your-backend-service.onrender.com/api
VITE_SOCKET_URL=https://your-backend-service.onrender.com
```

### **2. Update CORS Origins**
Update backend environment variable:
```
ALLOWED_ORIGINS=https://your-dashboard.onrender.com,https://your-chat.onrender.com,https://your-mindfulness.onrender.com,https://your-resources.onrender.com
```

### **3. Firebase Configuration**
1. **Add Authorized Domains** in Firebase Console:
   - `your-dashboard.onrender.com`
   - `your-chat.onrender.com`
   - `your-mindfulness.onrender.com`
   - `your-resources.onrender.com`

## 🌍 Expected URLs

After deployment, your services will be available at:

- **Backend API**: `https://unified-mind-backend.onrender.com`
- **Dashboard**: `https://unified-mind-dashboard.onrender.com`
- **Chat App**: `https://unified-mind-chat.onrender.com`
- **Mindfulness**: `https://unified-mind-mindfulness.onrender.com`
- **Resources**: `https://unified-mind-resources.onrender.com`

## ✅ Testing Deployment

### **1. Backend Health Check**
```bash
curl https://unified-mind-backend.onrender.com/api/health
```

### **2. Frontend Accessibility**
- Visit each frontend URL
- Test user registration/login
- Verify API connectivity
- Test real-time features (chat, notifications)

## 🚨 Troubleshooting

### **Common Issues**

**Build Failures**:
- Check build logs in Render dashboard
- Verify all dependencies are in package.json
- Ensure build commands are correct

**Environment Variable Issues**:
- Verify all required variables are set
- Check for typos in variable names
- Ensure Firebase keys are properly formatted

**CORS Errors**:
- Update ALLOWED_ORIGINS in backend
- Verify frontend API URLs
- Check Firebase authorized domains

**Database Connection**:
- Verify MongoDB Atlas connection string
- Check IP whitelist (0.0.0.0/0)
- Ensure database user has proper permissions

### **Render-Specific Notes**

1. **Free Tier Limitations**:
   - Services sleep after 15 minutes of inactivity
   - 750 hours/month limit
   - Cold start delays

2. **Build Time**:
   - Initial builds may take 5-10 minutes
   - Subsequent builds are faster with caching

3. **Environment Variables**:
   - Set in Render dashboard under service settings
   - Changes require service restart

## 🎯 Success Checklist

- ✅ All services deployed successfully
- ✅ Backend health check returns 200
- ✅ All frontends load without errors
- ✅ User authentication works
- ✅ API calls succeed
- ✅ Real-time features functional
- ✅ Database operations work

---

**🚀 Your Unified Mind App is now live on Render!**

## 📞 Support

If you encounter issues:
1. Check Render service logs
2. Verify environment variables
3. Test API endpoints individually
4. Check Firebase console for auth issues
