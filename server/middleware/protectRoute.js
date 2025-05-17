const jwt = require("jsonwebtoken");
const AdminModel = require("../models/admin.model");
const SkilledWorkerModel = require("../models/skillperson.model");
const InvestorModel = require("../models/investors.model");
const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Unauthorized, token missing or invalid" });
    }
    const token = authHeader.split(" ")[1]; // Extract token from header
    const decoded = jwt.verify(token, process.env.JSON_SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized, invalid token" });
    }
    let user;
    if (decoded.userType === "admin") {
      user = await AdminModel.findById(decoded._id);
    } else if (decoded.userType === "skilledperson") {
      user = await SkilledWorkerModel.findById(decoded._id);
    } else if (decoded.userType === "investor") {
      user = await InvestorModel.findById(decoded._id);
    }
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    req.user = { ...user.toObject(), userType: decoded.userType }; // Convert Mongoose document to plain object
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Unauthorized, invalid token" });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Unauthorized, token expired" });
    } else if (error.code === "ECONNRESET") {
      console.error("Network connection reset error:", error.message);
      return res.status(502).json({ error: "Bad Gateway, connection reset" });
    } else {
      console.error("Error in protectRoute middleware:", error.message);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};
module.exports = protectRoute;
