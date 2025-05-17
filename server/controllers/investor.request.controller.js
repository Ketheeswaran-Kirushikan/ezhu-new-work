const investors = require("../models/investor.request.model");
const { uploadInvestor } = require("../utils/multer");
const sgMail = require("@sendgrid/mail");

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
        console.log("Investor created successfully");
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
  const { id } = req.params; // Correctly extract _id from req.params
  console.log(id); // Check if _id is being logged correctly

  try {
    const user = await investors.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const msg = {
      to: user.email,
      from: "kirushikanketheeswaran@gmail.com",
      subject: "Welcome to Ezhu",
      text: `Hello ${user.first_name},\n\nYour account has been successfully created.\nPlease click on the following link to proceed with your account setup: https://ezhu-new-work.vercel.app/cardForm/${user._id}/${user.role}`,
      html: `<p>Hello ${user.first_name},</p><p>Your account has been successfully created.</p><p><a href="https://ezhu-new-work.vercel.app/cardForm/${user._id}/${user.role}">Click here</a> to proceed with your account setup.</p>`,
    };

    console.log("Sending email to:", user.email);
    const response = await sgMail.send(msg);
    console.log("Email sent:", response);

    return res.status(200).json({ message: "Welcome email sent successfully" });
  } catch (error) {
    console.log(
      "Error sending welcome email:",
      error.response ? error.response.body : error
    );
    return res.status(500).json({ error: "Error sending welcome email" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const value = req.params.value;
    const deletedData = await investors.findOneAndDelete({ user_id: value });
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
