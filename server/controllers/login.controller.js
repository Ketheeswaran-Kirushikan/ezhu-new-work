const jwt = require("jsonwebtoken");
const AdminModel = require("../models/admin.model");
const SkilledWorkerModel = require("../models/skillperson.model");
const InvestorModel = require("../models/investors.model");
require("dotenv").config();
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = null;
    let userType = null;
    const admin = await AdminModel.findOne({ email });
    if (admin) {
      if (admin.password === password) {
        user = admin;
        userType = "admin";
      }
    }
    if (!user) {
      const skilledWorker = await SkilledWorkerModel.findOne({ email });
      if (skilledWorker && skilledWorker.password === password) {
        user = skilledWorker;
        userType = "skilledperson";
      }
    }
    if (!user) {
      const investor = await InvestorModel.findOne({ email });
      if (investor && investor.password === password) {
        user = investor;
        userType = "investor";
      }
    }
    if (user) {
      const token = jwt.sign(
        { _id: user._id, userType },
        process.env.JSON_SECRET_KEY,
        { expiresIn: "15d" }
      );
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 24 * 60 * 60 * 1000,
      });
      return res
        .status(200)
        .json({ userType, message: "Login successful", user, token });
    } else {
      return res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ error: "Server error" });
  }
};
const logout = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).send({ message: "Logged out successfully" });
};
module.exports = {
  login,
  logout,
};
