// Simple test script to verify Dialogflow integration
const dialogflow = require("@google-cloud/dialogflow");
const path = require("path");

async function testDialogflow() {
  try {
    console.log("🧪 Testing Dialogflow integration...");
    
    const projectId = "mindsathi-cb9b";
    const keyFilename = path.join(__dirname, "config/mindsathi-cb9b-40195bbd39b2.json");
    
    console.log("📁 Using key file:", keyFilename);
    
    const sessionClient = new dialogflow.SessionsClient({
      keyFilename: keyFilename,
    });
    
    const sessionId = "test-session-123";
    const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
    
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: "Hello, how are you?",
          languageCode: "en",
        },
      },
    };
    
    console.log("🚀 Sending test message to Dialogflow...");
    const [response] = await sessionClient.detectIntent(request);
    
    console.log("✅ Dialogflow Response:");
    console.log("- Intent:", response.queryResult.intent?.displayName || "None");
    console.log("- Response:", response.queryResult.fulfillmentText);
    console.log("- Confidence:", response.queryResult.intentDetectionConfidence);
    
    console.log("\n🎉 Dialogflow integration test successful!");
    
  } catch (error) {
    console.error("❌ Dialogflow test failed:", error.message);
    console.error("Full error:", error);
  }
}

// Run the test
testDialogflow();
