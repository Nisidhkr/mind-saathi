# 🚀 Deployment Guide - Unified Mind App

## 📋 Pre-Deployment Checklist

### ✅ **Environment Setup**
1. **Backend Environment Variables**:
   ```bash
   cp backend/.env.example backend/.env
   # Fill in your actual values in backend/.env
   ```

2. **Dashboard Environment Variables**:
   ```bash
   cp dashboard/.env.example dashboard/.env
   # Fill in your actual values in dashboard/.env
   ```

### ✅ **Build All Components**
```bash
# Install all dependencies
npm run install:all

# Build all frontend components
npm run build:all
```

## 🌐 Deployment Options

### **Option 1: Netlify (Recommended for Frontend)**

#### **Deploy Dashboard (Main App)**
1. **Connect Repository to Netlify**
2. **Build Settings**:
   - Build command: `npm run build:all`
   - Publish directory: `dashboard/dist`
   - Node version: `18`

3. **Environment Variables in Netlify**:
   ```
   VITE_API_BASE_URL=https://your-backend-url.com/api
   VITE_SOCKET_URL=https://your-backend-url.com
   VITE_FIREBASE_API_KEY=your-firebase-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
   ```

#### **Deploy Other Frontend Apps**
- **Chat App**: Deploy `chat app FINAL/frontend/dist` to separate Netlify site
- **Mindfulness**: Deploy `mindfulness-client/build` to separate Netlify site  
- **Resource**: Deploy `resource/build` to separate Netlify site

### **Option 2: Railway/Render (Backend)**

#### **Deploy Backend**
1. **Connect Repository**
2. **Environment Variables**:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/unified-mind-app
   PORT=5000
   NODE_ENV=production
   JWT_SECRET=your-super-secret-jwt-key
   FIREBASE_PROJECT_ID=your-firebase-project-id
   FIREBASE_PRIVATE_KEY=your-firebase-private-key
   FIREBASE_CLIENT_EMAIL=your-firebase-client-email
   ALLOWED_ORIGINS=https://dashboard.netlify.app,https://chat.netlify.app,https://mindfulness.netlify.app
   ```

3. **Build Settings**:
   - Build command: `cd backend && npm install`
   - Start command: `cd backend && npm start`

### **Option 3: Vercel (Alternative)**

#### **Deploy Dashboard**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from dashboard directory
cd dashboard
vercel --prod
```

## 🔧 Local Production Testing

### **Test Built Applications**
```bash
# Build all components
npm run build:all

# Serve dashboard
npm run serve:dashboard

# Serve chat app
npm run serve:chat

# Serve mindfulness app
npm run serve:mindfulness

# Serve resource app
npm run serve:resource
```

### **Test Backend**
```bash
cd backend
npm start
```

## 🗄️ Database Setup

### **MongoDB Atlas (Recommended)**
1. Create MongoDB Atlas account
2. Create cluster and database: `unified-mind-app`
3. Get connection string
4. Update `MONGO_URI` in backend environment variables

### **Collections Created Automatically**
- `chatgroups` - Chat groups
- `chatmessages` - Group messages
- `chatposts` - Community posts
- `dashboardusers` - Registered users
- `dashboardcounsellors` - Counsellor profiles
- `mindfulnessmoods` - Mood entries
- `mindfulnessperiods` - Period tracking

## 🔐 Security Checklist

### **Environment Variables**
- ✅ Never commit `.env` files
- ✅ Use different Firebase projects for dev/prod
- ✅ Generate strong JWT secrets
- ✅ Configure CORS for production domains

### **Firebase Security**
- ✅ Set up Firebase security rules
- ✅ Enable authentication methods
- ✅ Configure authorized domains

## 🌍 Domain Configuration

### **Recommended Structure**
- **Main Dashboard**: `https://yourdomain.com`
- **Chat App**: `https://chat.yourdomain.com`
- **Mindfulness**: `https://mindfulness.yourdomain.com`
- **Resource**: `https://resources.yourdomain.com`
- **Backend API**: `https://api.yourdomain.com`

### **Update API URLs**
After deployment, update the API base URLs in each frontend:
- Dashboard: `dashboard/.env`
- Chat: Update API calls in source code
- Mindfulness: Update API calls in source code
- Resource: Update API calls in source code

## 🚨 Troubleshooting

### **Build Failures**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear individual app node_modules
rm -rf dashboard/node_modules
rm -rf "chat app FINAL/frontend/node_modules"
rm -rf mindfulness-client/node_modules
rm -rf resource/node_modules

# Reinstall all
npm run install:all
```

### **Environment Variable Issues**
- Check variable names (VITE_ prefix for frontend)
- Verify values are properly quoted
- Restart development servers after changes

### **CORS Issues**
- Update `ALLOWED_ORIGINS` in backend
- Check frontend API base URLs
- Verify domain configurations

## ✅ Post-Deployment Verification

### **Test All Features**
1. **Authentication**: Firebase login/signup
2. **Dashboard**: Counsellor booking, user management
3. **Chat**: Real-time messaging, community posts
4. **Mindfulness**: Mood tracking, period tracking
5. **Resource**: Wellness content access

### **Monitor Performance**
- Check application load times
- Monitor API response times
- Verify database connections
- Test real-time features (Socket.IO)

---

**🎉 Your Unified Mind App is now ready for production deployment!**
