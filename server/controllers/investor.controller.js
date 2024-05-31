const Investors = require("../models/investors.model");
const InvestorPersonRequest = require("../models/investor.request.model");
const { uploadInvestor } = require("../utils/multer");
const cors = require("cors");
const express = require("express");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SEND_GRID_MAIL_API_SECRET_KEY);

const app = express();
app.use(cors);
const verifyUser = async (_id, res) => {
  try {
    const userRequest = await InvestorPersonRequest.findById(_id);
    if (!userRequest) {
      return res
        .status(404)
        .json({ error: "User registration request not found" });
    }

    const username = `${userRequest.first_name.toLowerCase()}${userRequest.last_name.toLowerCase()}${Math.floor(
      Math.random() * 100
    )}`;
    const randomPassword = Math.random().toString(36).slice(-8);

    const newUser = new Investors({
      first_name: userRequest.first_name,
      last_name: userRequest.last_name,
      email: userRequest.email,
      number: userRequest.number,
      birthDate: userRequest.birthDate,
      nationalid: userRequest.nationalid,
      district: userRequest.district,
      companyName: userRequest.companyName,
      registrationNumber: userRequest.registrationNumber,
      images: userRequest.images,
      createdAt: userRequest.createdAt,
      user_name: username,
      password: randomPassword, // Save the random password
    });

    await newUser.save();
    await InvestorPersonRequest.findByIdAndDelete(_id);

    const msg = {
      to: userRequest.email,
      from: "kirushikanketheeswaran@gmail.com",
      subject: "Welcome to Ezhu",
      text: `Hello ${userRequest.first_name},\n\nYour payment has been successfully completed.\n\nClick on the following link to proceed with your account setup: https://ezhu-grow-together.vercel.app/login\n\nYour email: ${userRequest.email}\nPassword: ${randomPassword}\n\nThank you!`,
      html: `<h3>Hello ${userRequest.first_name},</h3><p>Your payment has been successfully completed.</p><p><a href="https://ezhu-grow-together.vercel.app/login">Click here</a> to proceed with your account setup.</p><br><p>Your email: ${userRequest.email}<br>Password: ${randomPassword}<br><p>Thank you!</p>`,
    };

    await sgMail.send(msg);

    res.status(200).json({
      message: "User verified and moved to investors model successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error verifying user and moving to investors model:", error);
    res.status(500).json({ error: "Verification and move process failed" });
  }
};

const getUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Investors.findOne({ email });
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
    const allInvestors = await Investors.find();
    if (allInvestors.length > 0) {
      res.json(allInvestors);
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
    const deletedData = await Investors.findByIdAndDelete(_id);
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
    const user = await Investors.findByIdAndUpdate(_id, detailUser, {
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
    uploadInvestor.fields([
      { name: "images", maxCount: 4 },
      { name: "certificates", maxCount: 4 },
    ])(req, res, async function (err) {
      if (err) {
        console.error("Error uploading files:", err);
        return res.status(500).json({ error: "File upload failed" });
      }

      const {
        first_name,
        last_name,
        email,
        number,
        birthDate,
        nationalid,
        district,
        companyName,
        registrationNumber,
      } = req.body;

      const images = req.files["images"] ? req.files["images"][0].path : null;
      const newUser = new Investors({
        first_name,
        last_name,
        email,
        number,
        birthDate,
        nationalid,
        district,
        companyName,
        registrationNumber,
        images,
        createdAt: new Date(),
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
