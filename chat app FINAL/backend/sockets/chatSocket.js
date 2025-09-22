const Message = require("../models/Message");
const generateNickname = require("../utils/nicknameGenerator");
const { validateContent } = require("../utils/keywordFilter");
const { getOrCreateUserNickname } = require("../utils/userManager");

function chatSocket(io) {
  io.on("connection", (socket) => {
    let nickname = generateNickname(); // Default fallback nickname
    socket.emit("nickname", nickname);
    console.log(`⚡ User connected: ${socket.id} as ${nickname}`);

    // Handle user authentication with email
    socket.on("authenticateUser", async (email) => {
      try {
        if (email) {
          nickname = await getOrCreateUserNickname(email);
          socket.emit("nickname", nickname);
          console.log(`✅ User authenticated: ${socket.id} as ${nickname} (${email})`);
        }
      } catch (error) {
        console.error("Error authenticating user:", error);
        // Keep using the fallback nickname
      }
    });

    // join group
    socket.on("joinGroup", (groupId) => {
      socket.join(groupId);
      console.log(`User ${socket.id} joined group ${groupId}`);
    });

    // typing indicator
    socket.on("typing", (groupId) => {
      socket.to(groupId).emit("userTyping", nickname);
    });

    socket.on("stopTyping", (groupId) => {
      socket.to(groupId).emit("userStopTyping", nickname);
    });

    // send + save message with keyword filtering
    socket.on("sendMessage", async ({ tempId, text, groupId, anonUsername }) => {
      try {
        // Check for flagged keywords using the utility
        const validation = validateContent(text);
        if (!validation.isValid) {
          // Block the message and notify sender
          socket.emit("messageBlocked", { 
            tempId, 
            reason: validation.reason 
          });
          console.log(`🚫 Message blocked for user ${socket.id}: "${text}"`);
          return;
        }

        // Message passed filtering - save and broadcast
        const message = await Message.create({ 
          groupId, 
          nickname: anonUsername || nickname, 
          text 
        });
        
        // Notify sender that message was sent successfully
        socket.emit("messageSent", { tempId, saved: message });
        
        // Broadcast to all users in the group (including sender for consistency)
        io.to(groupId).emit("newMessage", message);
        
        console.log(`✅ Message sent by ${anonUsername || nickname}: "${text}"`);
      } catch (err) {
        console.error("Error processing message:", err);
        socket.emit("messageBlocked", { 
          tempId, 
          reason: "Server error occurred while processing your message." 
        });
      }
    });

    socket.on("disconnect", () => {
      console.log(`❌ User disconnected: ${socket.id}`);
    });
  });
}

module.exports = chatSocket;
