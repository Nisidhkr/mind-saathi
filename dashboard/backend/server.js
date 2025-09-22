const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const admin = require("firebase-admin");

// Import routes
const userRoutes = require("./routes/userRoutes");
const counsellorRoutes = require("./routes/counsellorRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const chatRoutes = require("./routes/chatRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");

dotenv.config();
const app = express();
const server = http.createServer(app);

// ✅ Middleware
app.use(cors({ 
  origin: ["http://localhost:3000", "http://localhost:5173"],
  credentials: true 
}));
app.use(express.json());

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", require("./routes/auth"));
app.use("/api/counsellors", counsellorRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/chatbot", chatbotRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "✅ Dashboard Backend is running", timestamp: new Date().toISOString() });
});

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

// Init Firebase Admin
const serviceAccount = require("./config/firebase-service-account.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Socket.IO setup for real-time chat
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
  },
});

// Socket.IO chat handling
io.on("connection", (socket) => {
  console.log(`✅ User connected: ${socket.id}`);

  // Join a specific room for student-counsellor chat
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room: ${roomId}`);
  });

  // Leave a room
  socket.on("leaveRoom", (roomId) => {
    socket.leave(roomId);
    console.log(`User ${socket.id} left room: ${roomId}`);
  });

  // Handle chat messages
  socket.on("chat message", async (data) => {
    try {
      // Save message to database
      const Chat = require("./models/Chat");
      const chatMessage = new Chat(data);
      await chatMessage.save();

      // Emit to specific room if roomId exists, otherwise broadcast to all
      if (data.roomId) {
        socket.to(data.roomId).emit("chat message", data);
      } else {
        socket.broadcast.emit("chat message", data);
      }
      
      console.log(`Message sent in room ${data.roomId || 'general'}: ${data.message}`);
    } catch (error) {
      console.error("Error handling chat message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Dashboard Backend running on http://localhost:${PORT}`);
  console.log(`🔌 Socket.IO enabled for real-time chat`);
});
