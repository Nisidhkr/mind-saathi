const connectDB = require("./config/db");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middlewares
app.use(cors({
  origin: ["http://localhost:3003", "http://localhost:3000", "http://localhost:5173", "http://localhost:3001"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// test route
app.get("/api/health", (req, res) => {
  res.send("✅ Backend is running...");
});

// routes
const groupRoutes = require("./routes/groupRoutes");
const messageRoutes = require("./routes/messageRoutes");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
app.use("/api/groups", groupRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

// create server
const server = http.createServer(app);

// socket.io setup
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3003", "http://localhost:3000", "http://localhost:5173", "http://localhost:3001"],
    methods: ["GET", "POST"],
    credentials: true
  },
});

// sockets
const chatSocket = require("./sockets/chatSocket");
chatSocket(io); // 👈 nickname + messages dono isi file me handle karenge

// connect db
connectDB();

// start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
