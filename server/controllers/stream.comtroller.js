const streamClient = require("../utils/stream"); // Import the stream client

const generateToken = async (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const token = streamClient.createToken(userId);
    res.json({ token });
  } catch (error) {
    console.error("Error generating token:", error);
    res.status(500).json({ error: "Failed to generate token" });
  }
};

module.exports = { generateToken };
