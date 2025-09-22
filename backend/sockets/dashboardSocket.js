const Chat = require("../models/dashboard/Chat");

function dashboardSocket(io) {
  io.on("connection", (socket) => {
    console.log(`✅ Dashboard User connected: ${socket.id}`);

    // Join a specific room for student-counsellor chat
    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`Dashboard User ${socket.id} joined room: ${roomId}`);
    });

    // Leave a room
    socket.on("leaveRoom", (roomId) => {
      socket.leave(roomId);
      console.log(`Dashboard User ${socket.id} left room: ${roomId}`);
    });

    // Handle chat messages
    socket.on("chat message", async (data) => {
      try {
        // Save message to database
        const chatMessage = new Chat(data);
        await chatMessage.save();

        // Emit to specific room if roomId exists, otherwise broadcast to all
        if (data.roomId) {
          socket.to(data.roomId).emit("chat message", data);
        } else {
          socket.broadcast.emit("chat message", data);
        }
        
        console.log(`Dashboard message sent in room ${data.roomId || 'general'}: ${data.message}`);
      } catch (error) {
        console.error("Error handling dashboard chat message:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log(`❌ Dashboard User disconnected: ${socket.id}`);
    });
  });
}

module.exports = dashboardSocket;
