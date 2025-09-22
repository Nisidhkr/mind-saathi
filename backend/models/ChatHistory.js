const mongoose = require("mongoose");

const chatHistorySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true, // Index for faster queries
  },
  sessionId: {
    type: String,
    required: true,
  },
  messages: [{
    id: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      enum: ["user", "bot"],
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    dialogflowResponse: {
      type: Object, // Store full Dialogflow response for analytics
      default: null,
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt
});

// Index for efficient querying by user and date
chatHistorySchema.index({ userId: 1, createdAt: -1 });

// Pre-save middleware to update the updatedAt field
chatHistorySchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Static method to get user's chat history
chatHistorySchema.statics.getUserChatHistory = async function(userId, limit = 100) {
  try {
    const chatHistory = await this.findOne({ userId })
      .sort({ updatedAt: -1 })
      .limit(1);
    
    if (!chatHistory) {
      return { messages: [] };
    }
    
    // Return last 'limit' messages
    const messages = chatHistory.messages.slice(-limit);
    return { messages };
  } catch (error) {
    throw new Error(`Error fetching chat history: ${error.message}`);
  }
};

// Static method to add message to user's chat history
chatHistorySchema.statics.addMessage = async function(userId, messageData) {
  try {
    let chatHistory = await this.findOne({ userId });
    
    if (!chatHistory) {
      // Create new chat history for user
      chatHistory = new this({
        userId,
        sessionId: `session_${userId}_${Date.now()}`,
        messages: [messageData],
      });
    } else {
      // Add message to existing history
      chatHistory.messages.push(messageData);
      
      // Keep only last 1000 messages to prevent unlimited growth
      if (chatHistory.messages.length > 1000) {
        chatHistory.messages = chatHistory.messages.slice(-1000);
      }
    }
    
    await chatHistory.save();
    return chatHistory;
  } catch (error) {
    throw new Error(`Error adding message: ${error.message}`);
  }
};

// Static method to clear user's chat history
chatHistorySchema.statics.clearUserHistory = async function(userId) {
  try {
    await this.deleteMany({ userId });
    return { success: true, message: "Chat history cleared successfully" };
  } catch (error) {
    throw new Error(`Error clearing chat history: ${error.message}`);
  }
};

// Static method to get chat analytics for a user
chatHistorySchema.statics.getUserChatAnalytics = async function(userId) {
  try {
    const chatHistory = await this.findOne({ userId });
    
    if (!chatHistory) {
      return {
        totalMessages: 0,
        userMessages: 0,
        botMessages: 0,
        firstChatDate: null,
        lastChatDate: null,
      };
    }
    
    const userMessages = chatHistory.messages.filter(msg => msg.sender === "user").length;
    const botMessages = chatHistory.messages.filter(msg => msg.sender === "bot").length;
    
    return {
      totalMessages: chatHistory.messages.length,
      userMessages,
      botMessages,
      firstChatDate: chatHistory.createdAt,
      lastChatDate: chatHistory.updatedAt,
    };
  } catch (error) {
    throw new Error(`Error fetching chat analytics: ${error.message}`);
  }
};

module.exports = mongoose.model("ChatHistory", chatHistorySchema);
