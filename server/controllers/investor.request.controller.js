const investors = require("../models/investor.request.model");
const { uploadInvestor } = require("../utils/multer");
const sgMail = require("@sendgrid/mail");

// Validate and set SendGrid API key
const apiKey = process.env.SEND_GRID_MAIL_API_SECRET_KEY;
if (!apiKey || !apiKey.startsWith("SG.")) {
  console.error("Invalid or missing SendGrid API key");
  process.exit(1); // Exit if key is invalid
}
sgMail.setApiKey(apiKey.trim()); // Trim to remove whitespace

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
        role: "investor", // Explicitly set role
      });

      await newUser.save();
      console.log("Investor created successfully, ID:", newUser._id);

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
  let { id, role } = req.params;
  role = role.replace(/\s+/g, "").toLowerCase(); // Normalize role
  if (role !== "investor") role = "investor"; // Ensure correct role

  try {
    const user = await investors.findById(id);
    console.log("User data:", user);

    if (!user) {
      console.error(`User not found for ID: ${id}`);
      return res.status(404).json({ error: "User not found" });
    }

    const msg = {
      to: user.email,
      from: "kirushikanketheeswaran@gmail.com",
      subject: "Welcome to Ezhu",
      text: `Hello ${user.first_name},\n\nYour account has been successfully created.\nPlease click on the following link to proceed with your account setup: https://ezhu-new-work.vercel.app/cardForm/${user._id}/${role}`,
      html: `<p>Hello ${user.first_name},</p><p>Your account has been successfully created.</p><p><a href="https://ezhu-new-work.vercel.app/cardForm/${user._id}/${role}">Click here</a> to proceed with your account setup.</p>`,
    };

    console.log(`Sending email to: ${user.email} with role: ${role}`);
    const response = await sgMail.send(msg);
    console.log("Email sent:", response);
    return res.status(200).json({ message: "Welcome email sent successfully" });
  } catch (error) {
    console.error(
      "Error sending welcome email:",
      error.response ? error.response.body : error
    );
    return res.status(500).json({ error: "Error sending welcome email" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { value } = req.params;
    const deletedData = await investors.findOneAndDelete({ _id: value }); // Use _id
    if (deletedData) {
      console.log("User has been deleted");
      return res.json(deletedData);
    } else {
      console.error(`User not found for ID: ${value}`);
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const findUser = async (req, res) => {
  try {
    const allInvestors = await investors.find();
    if (allInvestors.length > 0) {
      return res.json(allInvestors);
    } else {
      console.error("No investors found");
      return res.status(404).json({ error: "No investors found" });
    }
  } catch (error) {
    console.error("Error finding investors:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createUser, findUser, deleteUser, sendWelcomeEmail };