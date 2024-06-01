const SkilledPerson = require("../models/skillperson.model");
const SkilledPersonRequest = require("../models/skillperson.request.model");
const { uploadSkilled } = require("../utils/multer");
const cors = require("cors");
const express = require("express");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SEND_GRID_MAIL_API_SECRET_KEY);

const app = express();
app.use(cors);

const verifyUser = async (req, res) => {
  const { _id } = req.params;
  try {
    const userRequest = await SkilledPersonRequest.findById(_id);
    if (!userRequest) {
      return res
        .status(404)
        .json({ error: "User registration request not found" });
    }

    const username = `${userRequest.first_name.toLowerCase()}${userRequest.last_name.toLowerCase()}${Math.floor(
      Math.random() * 100
    )}`;
    const randomPassword = Math.random().toString(36).slice(-8);

    const newUser = new SkilledPerson({
      first_name: userRequest.first_name,
      last_name: userRequest.last_name,
      email: userRequest.email,
      number: userRequest.number,
      gender: userRequest.gender,
      birthDate: userRequest.birthDate,
      skill: userRequest.skill,
      nationalid: userRequest.nationalid,
      district: userRequest.district,
      images: userRequest.images,
      referenceNumbers: userRequest.referenceNumbers,
      user_name: username,
      password: randomPassword,
    });
    await newUser.save();
    await SkilledPersonRequest.findByIdAndDelete(_id);

    const msg = {
      to: userRequest.email,
      from: "kirushikanketheeswaran@gmail.com",
      subject: "Welcome to Ezhu",
      text: `Hello ${userRequest.first_name},\n\nYour payment has been successfully completed.\n\nClick on the following link to proceed with your account setup: https://ezhu-grow-together.vercel.app/login\n\nYour email: ${userRequest.email}\nPassword: ${userRequest.password}\n\nThank you!`,
      html: `<h3>Hello ${userRequest.first_name},</h3><p>Your payment has been successfully completed.</p><p><a href="https://ezhu-grow-together.vercel.app/login">Click here</a> to proceed with your account setup.</p><br><p>Your email: ${userRequest.email}<br>Password: ${newUser.password}<br><p>Thank you!</p>`,
    };

    await sgMail.send(msg);

    res.status(200).json({
      message: "User verified and moved to skilled person model successfully",
      user: newUser,
    });
  } catch (error) {
    console.error(
      "Error verifying user and moving to skilled person model:",
      error
    );
    res.status(500).json({ error: "Verification and move process failed" });
  }
};
const getUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await SkilledPerson.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const match = password === user.password;
    if (match) {
      const data = {
        userId: user._id,
        email: user.email,
        role: user.role,
      };
      return res.status(200).json(data);
    } else {
      return res.status(401).send("Password incorrect");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

const findUser = async (req, res) => {
  try {
    const allSkilledWorkers = await SkilledPerson.find();
    if (allSkilledWorkers.length > 0) {
      res.json(allSkilledWorkers);
    } else {
      res.status(404).json({ error: "No skilled workers found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { _id } = req.params;
    console.log("Deleting user with ID:", _id);
    const deletedData = await SkilledPerson.findByIdAndDelete(_id);
    if (!deletedData) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log("Deleted data:", deletedData);
    res.json({
      message: "User deleted successfully",
      deletedUser: deletedData,
    });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({ error: "An error occurred during deletion" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { _id } = req.params;
    // console.log("Getted ID", _id);
    const detailUser = req.body;
    const user = await SkilledPerson.findByIdAndUpdate(_id, detailUser, {
      new: true,
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const createUser = async (req, res) => {
  try {
    uploadSkilled.fields([
      { name: "images", maxCount: 4 },
      { name: "certificates", maxCount: 4 },
    ])(req, res, async function (err) {
      if (err) {
        console.error("Error uploading files:", err);
        return res.status(500).json({ error: "File upload failed" });
      }
      if (
        req.files["images"] &&
        req.files["images"][0].mimetype === "application/pdf"
      ) {
      }
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
      const newUser = new SkilledPerson({
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
      res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "User failed to create" });
  }
};

module.exports = {
  verifyUser,
  getUser,
  findUser,
  deleteUser,
  updateUser,
  createUser,
};
