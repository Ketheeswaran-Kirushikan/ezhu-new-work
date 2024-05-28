require("dotenv").config();
const { StreamChat } = require("stream-chat");

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREA_API_SECRET_KEY;

if (!apiKey || !apiSecret) {
  console.error("Stream API key and secret must be defined in the .env file.");
  process.exit(1);
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

module.exports = streamClient;
