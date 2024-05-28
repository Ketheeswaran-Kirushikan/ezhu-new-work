const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // Import cookie-parser
const bodyParser = require("body-parser");
const userRoutes = require("../routes/skillperson.route");
const adminRoutes = require("../routes/admin.route");
const loginRoutes = require("../routes/login.route");
const requestSkillPersonRoutes = require("../routes/skillperson.request.route");
const requestInvestorRoutes = require("../routes/investor.request.route");
const investorRoutes = require("../routes/investor.route");
const postRoutes = require("../routes/post.route");
const messageRoutes = require("../routes/message.route"); // Corrected route name here
const databaseConnect = require("../DB/database");
const paymentRoutes = require("../routes/payment.route");
const followRoutes = require("../routes/userfollower.route");

const PORT = 3002;
const app = express();
const corsOptions = {
  origin: "http://localhost:3000", // Front-end URL
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser()); // Use cookie-parser middleware
app.use("/Ezhu/skilledworker", userRoutes);
app.use("/Ezhu/admins", adminRoutes);
app.use("/Ezhu", loginRoutes);
app.use("/Ezhu/Post", postRoutes);
app.use("/Ezhu/Skillworker/Request", requestSkillPersonRoutes);
app.use("/Ezhu/Investor", investorRoutes);
app.use("/Ezhu/Investor/Request", requestInvestorRoutes);
app.use("/Ezhu/chat", messageRoutes);
app.use("/Ezhu/userpayment", paymentRoutes); // Corrected route here
app.use("/Ezhu/follow", followRoutes); // Corrected route here

databaseConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
