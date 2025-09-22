const User = require("../models/User");
const generateNickname = require("./nicknameGenerator");

/**
 * Get or create a permanent nickname for a user based on their email
 * @param {string} email - User's email address
 * @returns {Promise<string>} - The user's permanent nickname
 */
async function getOrCreateUserNickname(email) {
  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    
    if (user) {
      // Update last active time
      user.lastActive = new Date();
      await user.save();
      return user.nickname;
    }
    
    // User doesn't exist, create new user with unique nickname
    let nickname;
    let isUnique = false;
    let attempts = 0;
    const maxAttempts = 10;
    
    while (!isUnique && attempts < maxAttempts) {
      nickname = generateNickname();
      const existingUser = await User.findOne({ nickname });
      if (!existingUser) {
        isUnique = true;
      }
      attempts++;
    }
    
    if (!isUnique) {
      // Fallback: use email prefix + random number
      const emailPrefix = email.split('@')[0];
      const randomNum = Math.floor(Math.random() * 9999);
      nickname = `${emailPrefix}${randomNum}`;
    }
    
    // Create new user
    user = new User({
      email,
      nickname,
      lastActive: new Date()
    });
    
    await user.save();
    console.log(`✅ Created permanent nickname for ${email}: ${nickname}`);
    return nickname;
    
  } catch (error) {
    console.error("Error getting/creating user nickname:", error);
    // Fallback to temporary nickname if database fails
    return generateNickname();
  }
}

module.exports = { getOrCreateUserNickname };
