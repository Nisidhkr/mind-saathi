const express = require("express");
const dialogflow = require("@google-cloud/dialogflow");
const { v4: uuid } = require("uuid");
const ChatHistory = require("../models/ChatHistory");
const { authenticateUser } = require("../middleware/auth");
const path = require("path");

const router = express.Router();

// Dialogflow configuration
const projectId = "mindsathi-cb9b"; // Your Dialogflow project ID
const keyFilename = path.join(__dirname, "../config/mindsathi-cb9b-40195bbd39b2.json");

// Initialize Dialogflow session client
const sessionClient = new dialogflow.SessionsClient({
  keyFilename: keyFilename,
});

// POST /api/chatbot/chat - Send message to chatbot
router.post("/chat", authenticateUser, async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user.uid;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    console.log(`📩 User ${userId}: ${message}`);

    // Create unique session for this user
    const sessionId = `user_${userId}_${Date.now()}`;
    const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

    // Prepare Dialogflow request
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: message,
          languageCode: "en", // Change to "hi" if using Hindi
        },
      },
    };

    // Send request to Dialogflow
    const [response] = await sessionClient.detectIntent(request);
    const botReply = response.queryResult.fulfillmentText || "Sorry, I couldn't understand that. 😅";

    console.log(`🤖 Bot reply to ${userId}: ${botReply}`);

    // Save user message to database
    const userMessageData = {
      id: `user_${Date.now()}`,
      text: message,
      sender: "user",
      timestamp: new Date(),
    };

    await ChatHistory.addMessage(userId, userMessageData);

    // Save bot response to database
    const botMessageData = {
      id: `bot_${Date.now()}`,
      text: botReply,
      sender: "bot",
      timestamp: new Date(),
      dialogflowResponse: {
        intent: response.queryResult.intent?.displayName || null,
        confidence: response.queryResult.intentDetectionConfidence || 0,
        parameters: response.queryResult.parameters || {},
      },
    };

    await ChatHistory.addMessage(userId, botMessageData);

    res.json({ 
      reply: botReply,
      intent: response.queryResult.intent?.displayName,
      confidence: response.queryResult.intentDetectionConfidence,
    });

  } catch (error) {
    console.error("❌ Chatbot Error:", error.message);
    res.status(500).json({ 
      error: "Chatbot request failed", 
      details: error.message 
    });
  }
});

// GET /api/chatbot/history - Get user's chat history
router.get("/history", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.uid;
    const limit = parseInt(req.query.limit) || 100;

    const chatHistory = await ChatHistory.getUserChatHistory(userId, limit);
    
    res.json(chatHistory);
  } catch (error) {
    console.error("❌ Error fetching chat history:", error.message);
    res.status(500).json({ 
      error: "Failed to fetch chat history", 
      details: error.message 
    });
  }
});

// DELETE /api/chatbot/clear - Clear user's chat history
router.delete("/clear", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.uid;

    const result = await ChatHistory.clearUserHistory(userId);
    
    console.log(`🗑️ Cleared chat history for user: ${userId}`);
    res.json(result);
  } catch (error) {
    console.error("❌ Error clearing chat history:", error.message);
    res.status(500).json({ 
      error: "Failed to clear chat history", 
      details: error.message 
    });
  }
});

// GET /api/chatbot/analytics - Get user's chat analytics
router.get("/analytics", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.uid;

    const analytics = await ChatHistory.getUserChatAnalytics(userId);
    
    res.json(analytics);
  } catch (error) {
    console.error("❌ Error fetching chat analytics:", error.message);
    res.status(500).json({ 
      error: "Failed to fetch chat analytics", 
      details: error.message 
    });
  }
});

// POST /api/chatbot/feedback - Save user feedback on bot responses
router.post("/feedback", authenticateUser, async (req, res) => {
  try {
    const { messageId, rating, feedback } = req.body;
    const userId = req.user.uid;

    // Here you could implement feedback storage logic
    // For now, just log it
    console.log(`📝 Feedback from ${userId} for message ${messageId}: ${rating}/5 - ${feedback}`);

    res.json({ success: true, message: "Feedback saved successfully" });
  } catch (error) {
    console.error("❌ Error saving feedback:", error.message);
    res.status(500).json({ 
      error: "Failed to save feedback", 
      details: error.message 
    });
  }
});

module.exports = router;
