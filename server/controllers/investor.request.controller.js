const express = require("express");
const mongoose = require("mongoose");
const investors = require("../models/investor.request.model");
const { uploadInvestor } = require("../utils/multer");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SEND_GRID_MAIL_API_SECRET_KEY);

const app = express();
app.use(express.json()); // Body parser middleware
app.use(cors()); // CORS middleware
app.use("/uploads", express.static("uploads")); // Serve uploaded files statically

const createUser = async (req, res) => {
  try {
    uploadInvestor.fields([
      { name: "images", maxCount: 4 },
      { name: "certificates", maxCount: 4 },
    ])(req, res, async function (err) {
      if (err) {
        console.error("Error uploading files:", err);
        return res.status(500).json({ error: "File upload failed" });
      }

      // File upload handling code...
      const {
        first_name,
        last_name,
        email,
        number,
        gender,
        birthDate,
        skill,
        nationalid,
        district,
        companyName,
        registrationNumber,
      } = req.body;

      const images = req.files["images"] ? req.files["images"][0].path : null;

      const newUser = new investors({
        first_name,
        last_name,
        email,
        number,
        gender,
        birthDate,
        skill,
        nationalid,
        district,
        images,
        companyName,
        registrationNumber,
      });

      await newUser.save();

      if (newUser._id) {
        console.log("investor created successfully");
      } else {
        console.error("Invalid user ID:", newUser._id);
      }

      res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "User failed to create" });
  }
};

const sendWelcomeEmail = async (req, res) => {
  const { _id } = req.params;
  try {
    const user = await investors.findById(_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const msg = {
      to: user.email,
      from: "kirushikanketheeswaran@gmail.com",
      subject: "Welcome to Ezhu",
      text: `Hello ${user.first_name},\n\nYour account has been successfully created.\nPlease click on the following link to proceed with your account setup: https://ezhu-grow-together.vercel.app/cardForm/${user._id}`,
      html: `<p>Hello ${user.first_name},</p><p>Your account has been successfully created.</p><p><a href="https://ezhu-grow-together.vercel.app/cardForm/${user._id}">Click here</a> to proceed with your account setup.</p>`,
    };

    await sgMail.send(msg);
    console.log("Welcome email sent to:", user.email);
    return res.status(200).json({ message: "Welcome email sent successfully" });
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return res.status(500).json({ error: "Error sending welcome email" });
  }
};


const deleteUser = async (req, res) => {
  try {
    const value = req.params.value;
    const deletedData = await investors.findOneAndDelete({
      user_id: value,
    });
    if (deletedData) {
      res.json(deletedData);
      console.log("User has been deleted");
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    console.error("Error deleting user", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const findUser = async (req, res) => {
  try {
    const allInvestors = await investors.find();
    if (allInvestors.length > 0) {
      res.json(allInvestors);
    } else {
      res.status(404).json({ error: "No Investor found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createUser, findUser, deleteUser, sendWelcomeEmail };
