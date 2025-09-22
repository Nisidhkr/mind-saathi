# Unified Mind App Backend

This is the unified backend for the Mind App project, combining three previously separate services:
- **Chat App** (Groups, Messages, Posts, Users) - `/api/chat/*`
- **Dashboard** (Auth, Counsellors, Bookings, Appointments) - `/api/dashboard/*`  
- **Mindfulness** (Mood tracking, Period tracking) - `/api/mindfulness/*`

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Firebase project (for authentication)

### Installation & Setup

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Configuration**
   Update the `.env` file with your MongoDB connection string:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/unified-mind-app
   # OR for MongoDB Atlas:
   # MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/unified-mind-app
   ```

3. **Firebase Configuration**
   The Firebase service account key is already configured in `config/firebase-service-account.json`

4. **Start the Server**
   ```bash
   npm start
   # OR for development with auto-reload:
   npm run dev
   ```

The unified backend will start on **http://localhost:5000**

## 📡 API Endpoints

### Health Check
- `GET /api/health` - Server status

### Chat Service (`/api/chat/`)
- `GET /api/chat/groups` - Get all chat groups
- `GET /api/chat/messages/:groupId` - Get messages for a group
- `GET /api/chat/posts` - Get all posts
- `POST /api/chat/posts` - Create new post
- `POST /api/chat/users/nickname` - Get/create user nickname

### Dashboard Service (`/api/dashboard/`)
- `POST /api/dashboard/auth/firebase-register` - Register user
- `POST /api/dashboard/auth/track-login` - Track user login
- `GET /api/dashboard/counsellors` - Get all counsellors
- `POST /api/dashboard/bookings/book` - Book counsellor slot
- `GET /api/dashboard/appointments` - Get appointments

### Mindfulness Service (`/api/mindfulness/`)
- `POST /api/mindfulness/mood` - Save mood entry
- `GET /api/mindfulness/mood/user/:email` - Get user mood history
- `GET /api/mindfulness/periods` - Get period entries
- `POST /api/mindfulness/periods` - Create period entry
- `GET /api/mindfulness/periods/stats` - Get period statistics

## 🔌 Socket.IO Events

The server supports real-time communication for both chat and dashboard services:

### Chat Events
- `joinGroup(groupId)` - Join a chat group
- `sendMessage(data)` - Send message to group
- `typing(groupId)` - Show typing indicator

### Dashboard Events  
- `joinRoom(roomId)` - Join counsellor-student chat room
- `chat message(data)` - Send chat message
- `leaveRoom(roomId)` - Leave chat room

## 🗄️ Database Models

### Chat Service
- `ChatGroup` - Chat groups
- `ChatMessage` - Group messages  
- `ChatPost` - Community posts
- `ChatUser` - Chat users with nicknames

### Dashboard Service
- `DashboardUser` - Registered users
- `DashboardCounsellor` - Counsellor profiles
- `DashboardAppointment` - Booking appointments
- `DashboardChat` - Counsellor-student messages
- `DashboardLoginHistory` - User login tracking

### Mindfulness Service
- `MindfulnessMood` - Mood tracking entries
- `MindfulnessPeriod` - Period tracking entries

## 🛠️ Development

### Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Project Structure
```
backend/
├── server.js                 # Main server file
├── package.json             # Dependencies
├── .env                     # Environment variables
├── config/
│   ├── db.js               # Database connection
│   └── firebase-service-account.json
├── routes/
│   ├── chat/               # Chat service routes
│   ├── dashboard/          # Dashboard service routes
│   └── mindfulness/        # Mindfulness service routes
├── models/
│   ├── chat/               # Chat service models
│   ├── dashboard/          # Dashboard service models
│   └── mindfulness/        # Mindfulness service models
├── controllers/
│   ├── chat/               # Chat service controllers
│   └── mindfulness/        # Mindfulness service controllers
├── middlewares/
│   └── dashboard/          # Dashboard middlewares
├── sockets/
│   ├── chatSocket.js       # Chat Socket.IO handlers
│   └── dashboardSocket.js  # Dashboard Socket.IO handlers
└── utils/
    └── chat/               # Chat utility functions
```

## 🔧 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check MONGO_URI in .env file
   - For Atlas, ensure IP whitelist is configured

2. **Firebase Authentication Error**
   - Verify firebase-service-account.json exists
   - Check Firebase project configuration

3. **Port Already in Use**
   - Change PORT in .env file
   - Kill existing processes on port 5000

### Logs
The server provides detailed logging for:
- Database connections
- Socket.IO connections
- API requests
- Error handling

## 📝 Migration Notes

This unified backend replaces:
- Chat App Backend (previously port 5000/5002)
- Dashboard Backend (previously port 5000)  
- Mindfulness Backend (previously port 5001)

All frontend applications have been updated to use the new unified endpoints.
