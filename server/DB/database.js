const mongoose = require("mongoose");
require("dotenv").config();

const mongo_URL = process.env.mongo_URL;

const databaseConnect = async () => {
  try {
    await mongoose.connect(mongo_URL, {});
    console.log("Connected to the database!");
  } catch (error) {
    console.log("Connection failed!", error);
    throw error;
  }
};

module.exports = databaseConnect;
