// config.js
require("dotenv").config();

module.exports = {
  stream: {
    apiKey: process.env.STREAM_API_KEY,
    apiSecret: process.env.STREAM_API_SECRET_KEY,
  },
};
