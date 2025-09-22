// middlewares/dashboard/firebaseAuth.js
const admin = require("firebase-admin");

const verifyFirebaseToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token provided" });

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.firebaseUser = decoded; // uid, email etc
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};

module.exports = verifyFirebaseToken;
