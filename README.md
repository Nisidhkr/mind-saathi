# 🧠 Unified Mind App

A comprehensive mental health and wellness platform with chat functionality, counsellor booking, and mindfulness tracking.

## 🏗️ Architecture

This project has been **unified** from multiple separate services into:

### Backend (Port 5000)
- **Single unified Node.js/Express server**
- **MongoDB database** with service-specific collections
- **Socket.IO** for real-time chat and notifications
- **Firebase Authentication** for user management

### Frontend Applications
- **Dashboard** (Port 5173) - Main user interface with counsellor booking
- **Chat App** (Port 3000) - Group chat and community posts  
- **Mindfulness Client** (Port 3001) - Mood and period tracking

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **Git** for cloning the repository

### Step 1: Setup Unified Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment (update MONGO_URI in .env)
# Default: mongodb://localhost:27017/unified-mind-app

# Start the unified backend
npm start
```

✅ **Backend will run on http://localhost:5000**

### Step 2: Setup Dashboard Frontend

```bash
# Open new terminal and navigate to dashboard
cd dashboard

# Install dependencies  
npm install

# Start dashboard frontend
npm run dev
```

✅ **Dashboard will run on http://localhost:5173**

### Step 3: Setup Chat App Frontend

```bash
# Open new terminal and navigate to chat app
cd "chat app FINAL/frontend"

# Install dependencies
npm install

# Start chat frontend
npm run dev
```

✅ **Chat App will run on http://localhost:3000**

### Step 4: Setup Mindfulness Client (Optional)

```bash
# Open new terminal and navigate to mindfulness client
cd mindfulness-client

# Install dependencies
npm install

# Start mindfulness frontend
npm start
```

✅ **Mindfulness Client will run on http://localhost:3001**

## 🌐 Application URLs

After starting all services:

| Service | URL | Description |
|---------|-----|-------------|
| **Unified Backend** | http://localhost:5000 | API server for all services |
| **Main Dashboard** | http://localhost:5173 | Primary user interface |
| **Chat & Community** | http://localhost:3000 | Group chat and posts |
| **Mindfulness Tracker** | http://localhost:3001 | Mood and period tracking |

## 🔗 API Endpoints (Unified Backend)

### Health Check
- `GET /api/health` - Check server status

### Chat Service
- `GET /api/chat/groups` - Get chat groups
- `GET /api/chat/messages/:groupId` - Get group messages
- `GET /api/chat/posts` - Get community posts
- `POST /api/chat/posts` - Create new post

### Dashboard Service  
- `POST /api/dashboard/auth/firebase-register` - User registration
- `GET /api/dashboard/counsellors` - Get counsellors
- `POST /api/dashboard/bookings/book` - Book appointment

### Mindfulness Service
- `POST /api/mindfulness/mood` - Save mood entry
- `GET /api/mindfulness/periods` - Get period data
- `GET /api/mindfulness/periods/stats` - Period statistics

## 🗄️ Database Configuration

### MongoDB Setup

**Option 1: Local MongoDB**
```bash
# Install MongoDB locally
# Start MongoDB service
mongod

# Database will be created automatically as: unified-mind-app
```

**Option 2: MongoDB Atlas (Cloud)**
```bash
# Update backend/.env with your Atlas connection string:
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/unified-mind-app
```

### Collections Created Automatically
- `chatgroups` - Chat groups
- `chatmessages` - Group messages  
- `chatposts` - Community posts
- `dashboardusers` - Registered users
- `dashboardcounsellors` - Counsellor profiles
- `mindfulnessmoods` - Mood entries
- `mindfulnessperiods` - Period tracking

## 🔧 Development Workflow

### Starting Development Environment
```bash
# Terminal 1: Start unified backend
cd backend && npm run dev

# Terminal 2: Start dashboard
cd dashboard && npm run dev  

# Terminal 3: Start chat app
cd "chat app FINAL/frontend" && npm run dev

# Terminal 4: Start mindfulness (optional)
cd mindfulness-client && npm start
```

### Making Changes
- **Backend changes**: Modify files in `backend/` directory
- **Frontend changes**: Modify respective frontend directories
- **API changes**: Update routes in `backend/routes/`
- **Database changes**: Update models in `backend/models/`

## 🌟 Key Features

### 💬 Chat & Community
- Real-time group messaging
- Community posts with reactions
- Anonymous posting options
- Content filtering for safety

### 🩺 Counsellor Booking
- Browse available counsellors
- Book appointment slots
- Real-time chat with counsellors
- Appointment management

### 🧘 Mindfulness Tracking
- Daily mood tracking
- Period cycle monitoring
- Statistics and predictions
- Personal wellness insights

### 🔐 Authentication & Security
- Firebase Authentication
- JWT token validation
- User session tracking
- Content moderation

## 🛠️ Troubleshooting

### Common Issues

**Backend won't start:**
- Check if MongoDB is running
- Verify MONGO_URI in backend/.env
- Ensure port 5000 is available

**Frontend connection errors:**
- Ensure backend is running on port 5000
- Check browser console for CORS errors
- Verify API endpoints are correct

**Database connection failed:**
- Check MongoDB service status
- Verify connection string format
- Ensure database permissions

**Socket.IO not connecting:**
- Check if backend Socket.IO is running
- Verify frontend socket configuration
- Check browser network tab for WebSocket errors

### Getting Help
1. Check the console logs in both backend and frontend
2. Verify all services are running on correct ports
3. Ensure MongoDB connection is established
4. Check Firebase configuration if authentication fails

## 📁 Project Structure

```
unified-mind-app/
├── backend/                 # Unified Node.js backend (Port 5000)
│   ├── server.js           # Main server file
│   ├── routes/             # API routes by service
│   ├── models/             # Database models  
│   ├── sockets/            # Socket.IO handlers
│   └── config/             # Configuration files
├── dashboard/              # React dashboard (Port 5173)
├── chat app FINAL/         # React chat app (Port 3000)
│   └── frontend/
├── mindfulness-client/     # React mindfulness (Port 3001)
└── README.md              # This file
```

## 🎯 Next Steps

1. **Start all services** following the Quick Start Guide
2. **Access the dashboard** at http://localhost:5173
3. **Create a user account** using Firebase Auth
4. **Explore the chat features** at http://localhost:3000
5. **Track your wellness** at http://localhost:3001

The unified backend ensures all services work together seamlessly while maintaining their individual functionalities.

---

**🚀 Happy coding and stay mindful! 🧘‍♀️**
