const express = require("express");
const mongoose = require("mongoose");
const skilledPerson = require("../models/skillperson.request.model");
const { uploadSkilled } = require("../utils/multer");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SEND_GRID_MAIL_API_SECRET_KEY);

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON bodies

const createUser = async (req, res) => {
  uploadSkilled.fields([
    { name: "images", maxCount: 4 },
    { name: "certificates", maxCount: 4 },
  ])(req, res, async function (err) {
    if (err) {
      console.error("Error uploading files:", err);
      return res.status(500).json({ error: "File upload failed" });
    }
    try {
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
        referenceNumbers,
      } = req.body;
      const images = req.files["images"] ? req.files["images"][0].path : null;
      const newUser = new skilledPerson({
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
        referenceNumbers,
      });
      await newUser.save();

      const msg = {
        to: newUser.email,
        from: "kirushikanketheeswaran@gmail.com",
        subject: "Welcome to Ezhu",
        text: `Hello ${newUser.first_name},\n\nYour account has been successfully created.\nPlease click on the following link to proceed with your account setup: http://localhost:3000/cardForm/${newUser._id}`,
        html: `<p>Hello ${newUser.first_name},</p><p>Your account has been successfully created.</p><p><a href="http://localhost:3000/cardForm/${newUser._id}">Click here</a> to proceed with your account setup.</p>`,
      };

      if (newUser._id) {
        await sgMail.send(msg);
      } else {
        console.error("Invalid user ID:", newUser._id);
      }

      res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "User failed to create" });
    }
  });
};
const deleteUser = async (req, res) => {
  try {
    const value = req.params.value;
    const deletedData = await skilledPerson.findOneAndDelete({
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
    const allSkilledWorker = await skilledPerson.find();
    if (allSkilledWorker.length > 0) {
      res.json(allSkilledWorker);
    } else {
      res.status(404).json({ error: "No skilledPerson found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createUser, findUser, deleteUser };
