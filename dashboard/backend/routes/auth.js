// routes/auth.js
const express = require("express");
const User = require("../models/User");
const LoginHistory = require("../models/LoginHistory");
const verifyFirebaseToken = require("../middleware/firebaseAuth");

const router = express.Router();

// Save user in MongoDB after Firebase signup
router.post("/firebase-register", verifyFirebaseToken, async (req, res) => {
  try {
    const { name } = req.body;
    const { uid, email } = req.firebaseUser;

    let user = await User.findOne({ firebaseUid: uid });
    if (!user) {
      user = new User({ firebaseUid: uid, email, name });
      await user.save();
    }

    res.json({ msg: "User saved to MongoDB", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Track user login
router.post("/track-login", verifyFirebaseToken, async (req, res) => {
  try {
    const { loginMethod } = req.body;
    const { uid, email, name } = req.firebaseUser;
    
    // Get client information
    const ipAddress = req.ip || req.connection.remoteAddress || req.socket.remoteAddress || 
                     (req.connection.socket ? req.connection.socket.remoteAddress : null);
    const userAgent = req.get('User-Agent') || '';
    
    // Parse user agent for device info (basic parsing)
    const deviceInfo = parseUserAgent(userAgent);
    
    // Create login history record
    const loginRecord = new LoginHistory({
      firebaseUid: uid,
      email: email,
      name: name || '',
      loginTime: new Date(),
      loginMethod: loginMethod || 'email',
      ipAddress: ipAddress,
      userAgent: userAgent,
      deviceInfo: deviceInfo
    });
    
    await loginRecord.save();
    
    res.json({ 
      success: true, 
      message: "Login tracked successfully",
      loginTime: loginRecord.loginTime
    });
  } catch (err) {
    console.error("Login tracking error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Failed to track login" 
    });
  }
});

// Get user's login history
router.get("/login-history", verifyFirebaseToken, async (req, res) => {
  try {
    const { uid } = req.firebaseUser;
    const { limit = 50, page = 1 } = req.query;
    
    const loginHistory = await LoginHistory.find({ firebaseUid: uid })
      .sort({ loginTime: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
    
    const totalCount = await LoginHistory.countDocuments({ firebaseUid: uid });
    
    res.json({
      success: true,
      loginHistory: loginHistory,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalCount / parseInt(limit)),
        totalCount: totalCount,
        hasNext: parseInt(page) * parseInt(limit) < totalCount,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (err) {
    console.error("Get login history error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Failed to get login history" 
    });
  }
});

// Helper function to parse user agent
function parseUserAgent(userAgent) {
  const deviceInfo = {
    browser: 'Unknown',
    os: 'Unknown',
    device: 'Unknown'
  };
  
  if (!userAgent) return deviceInfo;
  
  // Browser detection
  if (userAgent.includes('Chrome')) deviceInfo.browser = 'Chrome';
  else if (userAgent.includes('Firefox')) deviceInfo.browser = 'Firefox';
  else if (userAgent.includes('Safari')) deviceInfo.browser = 'Safari';
  else if (userAgent.includes('Edge')) deviceInfo.browser = 'Edge';
  else if (userAgent.includes('Opera')) deviceInfo.browser = 'Opera';
  
  // OS detection
  if (userAgent.includes('Windows')) deviceInfo.os = 'Windows';
  else if (userAgent.includes('Mac OS')) deviceInfo.os = 'macOS';
  else if (userAgent.includes('Linux')) deviceInfo.os = 'Linux';
  else if (userAgent.includes('Android')) deviceInfo.os = 'Android';
  else if (userAgent.includes('iOS')) deviceInfo.os = 'iOS';
  
  // Device detection
  if (userAgent.includes('Mobile')) deviceInfo.device = 'Mobile';
  else if (userAgent.includes('Tablet')) deviceInfo.device = 'Tablet';
  else deviceInfo.device = 'Desktop';
  
  return deviceInfo;
}

module.exports = router;
