const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/skillperson.route");
const adminRoutes = require("./routes/admin.route");
const loginRoutes = require("./routes/login.route");
const requestSkillPersonRoutes = require("./routes/skillperson.request.route");
const requestInvestorRoutes = require("./routes/investor.request.route");
const investorRoutes = require("./routes/investor.route");
const postRoutes = require("./routes/post.route");
const messageRoutes = require("./routes/message.route");
const paymentRoutes = require("./routes/payment.route");
const followRoutes = require("./routes/userfollower.route");
const { app, server, io } = require("./utils/socket");
const databaseConnect = require("./DB/database");

const PORT = 3002;

const corsOptions = { origin: "http://localhost:3000", credentials: true };
// Add a basic status check endpoint
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running!" });
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use("/Ezhu/skilledworker", userRoutes);
app.use("/Ezhu/admins", adminRoutes);
app.use("/Ezhu", loginRoutes);
app.use("/Ezhu/Post", postRoutes);
app.use("/Ezhu/Skillworker/Request", requestSkillPersonRoutes);
app.use("/Ezhu/Investor", investorRoutes);
app.use("/Ezhu/Investor/Request", requestInvestorRoutes);
app.use("/Ezhu/chat", messageRoutes);
app.use("/Ezhu", paymentRoutes);
app.use("/Ezhu/follow", followRoutes);

databaseConnect()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
