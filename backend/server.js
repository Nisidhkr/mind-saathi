const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

// Load environment variables
dotenv.config();

console.log("🚀 Starting unified backend server (debug mode)...");

const app = express();
const server = http.createServer(app);

// ✅ Middleware
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',')
  : [
      "http://localhost:3000", 
      "http://localhost:5173", 
      "http://localhost:3001",
      "http://localhost:3003",
      /^http:\/\/127\.0\.0\.1:\d+$/,  // Allow any port on 127.0.0.1 for browser previews
      /^http:\/\/localhost:\d+$/     // Allow any port on localhost
    ];

app.use(cors({ 
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));
app.use(express.json());

// ✅ Health Check Route
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "✅ Unified Backend is running", 
    timestamp: new Date().toISOString(),
    services: ["chat", "dashboard", "mindfulness"]
  });
});

console.log("✅ Basic setup complete, loading routes...");

// ✅ Load routes with error handling
try {
  console.log("Loading chat routes...");
  const chatGroupRoutes = require("./routes/chat/groupRoutes");
  const chatMessageRoutes = require("./routes/chat/messageRoutes");
  const chatPostRoutes = require("./routes/chat/postRoutes");
  const chatUserRoutes = require("./routes/chat/userRoutes");

  app.use("/api/chat/groups", chatGroupRoutes);
  app.use("/api/chat/messages", chatMessageRoutes);
  app.use("/api/chat/posts", chatPostRoutes);
  app.use("/api/chat/users", chatUserRoutes);
  console.log("✅ Chat routes loaded");
} catch (error) {
  console.error("❌ Error loading chat routes:", error.message);
}

try {
  console.log("Loading dashboard routes...");
  const dashboardUserRoutes = require("./routes/dashboard/userRoutes");
  const counsellorRoutes = require("./routes/dashboard/counsellorRoutes");
  const bookingRoutes = require("./routes/dashboard/bookingRoutes");
  const appointmentRoutes = require("./routes/dashboard/appointmentRoutes");
  const dashboardChatRoutes = require("./routes/dashboard/chatRoutes");
  const authRoutes = require("./routes/dashboard/auth");
  const chatbotRoutes = require("./routes/dashboard/chatbotRoutes");

  app.use("/api/dashboard/users", dashboardUserRoutes);
  app.use("/api/users", dashboardUserRoutes); // Alias for backward compatibility
  app.use("/api/dashboard/auth", authRoutes);
  app.use("/api/auth", authRoutes); // Alias for backward compatibility
  app.use("/api/dashboard/counsellors", counsellorRoutes);
  app.use("/api/counsellors", counsellorRoutes); // Alias for backward compatibility
  app.use("/api/dashboard/bookings", bookingRoutes);
  app.use("/api/bookings", bookingRoutes); // Alias for backward compatibility
  app.use("/api/dashboard/appointments", appointmentRoutes);
  app.use("/api/appointments", appointmentRoutes); // Alias for backward compatibility
  app.use("/api/dashboard/chat", dashboardChatRoutes);
  app.use("/api/chatbot", chatbotRoutes); // Chatbot routes
  console.log("✅ Dashboard routes loaded");
} catch (error) {
  console.error("❌ Error loading dashboard routes:", error.message);
}

try {
  console.log("Loading mindfulness routes...");
  const moodRoutes = require("./routes/mindfulness/moodRoutes");
  const periodRoutes = require("./routes/mindfulness/periodRoutes");

  app.use("/api/mindfulness/mood", moodRoutes);
  app.use("/api/mindfulness/periods", periodRoutes);
  console.log("✅ Mindfulness routes loaded");
} catch (error) {
  console.error("❌ Error loading mindfulness routes:", error.message);
}

// ✅ MongoDB Connection with fallback
const connectDB = async () => {
  const connectionStrings = [
    // Primary: Original database with your data
    process.env.MONGO_URI,
    // Fallback 1: Dashboard database
    process.env.MONGO_URI_DASHBOARD,
    // Fallback 2: Chat database (working)
    process.env.MONGO_URI_CHAT,
    // Fallback 3: Auth database
    process.env.MONGO_URI_AUTH
  ];

  for (let i = 0; i < connectionStrings.length; i++) {
    const mongoUri = connectionStrings[i];
    if (!mongoUri) continue;
    
    try {
      console.log(`Attempting connection ${i + 1}/4...`);
      console.log("Using MongoDB URI:", mongoUri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'));
      
      await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // 5 second timeout
      });
      
      console.log("✅ MongoDB connected successfully");
      console.log(`📊 Database: ${mongoose.connection.name}`);
      
      if (i > 0) {
        console.log("⚠️ Note: Connected to fallback database. Your original data may be in 'unified-mind-app' database.");
      }
      
      return true;
    } catch (error) {
      console.error(`❌ Connection attempt ${i + 1} failed:`, error.message);
      if (i === connectionStrings.length - 1) {
        console.log("⚠️ All connection attempts failed. Server will continue without database connection");
        return false;
      }
    }
  }
  
  return false;
};

// ✅ Initialize Firebase Admin (for dashboard service)
const initFirebase = () => {
  try {
    console.log("Initializing Firebase...");
    const admin = require("firebase-admin");
    const serviceAccount = require("./config/firebase-service-account.json");
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("✅ Firebase Admin initialized");
  } catch (error) {
    console.log("⚠️ Firebase Admin not initialized:", error.message);
  }
};

// ✅ Socket.IO Setup
console.log("Setting up Socket.IO...");
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000", 
      "http://localhost:5173", 
      "http://localhost:3001",
      "http://localhost:3003",
      /^http:\/\/127\.0\.0\.1:\d+$/,  // Allow any port on 127.0.0.1 for browser previews
      /^http:\/\/localhost:\d+$/     // Allow any port on localhost
    ],
    methods: ["GET", "POST"],
    credentials: true
  },
});

// ✅ Socket Handlers
try {
  console.log("Loading socket handlers...");
  const chatSocket = require("./sockets/chatSocket");
  const dashboardSocket = require("./sockets/dashboardSocket");

  chatSocket(io);
  dashboardSocket(io);
  console.log("✅ Socket handlers loaded");
} catch (error) {
  console.error("❌ Error loading socket handlers:", error.message);
}

// ✅ Start Server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    console.log("Starting server initialization...");
    
    // Connect to database (non-blocking)
    const dbConnected = await connectDB();
    
    // Initialize Firebase
    initFirebase();
    
    // Start the server
    server.listen(PORT, () => {
      console.log(`🚀 Unified Backend running on http://localhost:${PORT}`);
      console.log(`🔌 Socket.IO enabled for real-time features`);
      console.log(`📱 Services: Chat App, Dashboard, Mindfulness`);
      console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
      if (!dbConnected) {
        console.log("⚠️ Note: Some features may not work without database connection");
      }
    });
  } catch (error) {
    console.error("❌ Server startup error:", error);
    // Don't exit, try to start server anyway
    server.listen(PORT, () => {
      console.log(`🚀 Unified Backend running on http://localhost:${PORT} (limited functionality)`);
    });
  }
};

startServer();
