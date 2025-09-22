
import express from "express";
import dialogflow from "@google-cloud/dialogflow";
import { v4 as uuid } from "uuid";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Static serve optional (agar React build serve karna ho future me)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// app.use(express.static(path.join(__dirname, "build"))); // React build folder

// Apka Dialogflow project ID
const projectId = "mindsathi-cb9b";

// Dialogflow session client
const sessionClient = new dialogflow.SessionsClient({
  keyFilename: "mindsathi-cb9b-40195bbd39b2.json", // apni JSON key ka naam sahi rakho
});

// Chat endpoint
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    console.log("📩 User:", userMessage);

    const sessionId = uuid();
    const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: userMessage,
          languageCode: "en", // agar Hindi agent banaya hai to "hi"
        },
      },
    };

    const [response] = await sessionClient.detectIntent(request);

    const botReply =
      response.queryResult.fulfillmentText || "Sorry, mujhe samajh nahi aaya 😅";
    console.log("🤖 Bot:", botReply);

    res.json({ reply: botReply });
  } catch (err) {
    console.error("❌ Dialogflow Error:", err.message);
    res.status(500).json({ error: "Dialogflow request failed", details: err.message });
  }
});

// ✅ Ek hi listener rakho
const PORT = 5000; // frontend alag port pe chalega (3000/5173)
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📱 Mobile access (LAN): http://<Your-PC-IP>:${PORT}`);
});
