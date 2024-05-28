const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationSchema = new Schema(
  {
    participants: [
      {
        type: String, // Assuming you store user IDs as strings
        required: true,
      },
    ],
    messages: [
      {
        sender_id: { type: String, required: true }, // User ID as string
        receiver_id: { type: String, required: true }, // User ID as string
        message: { type: String, required: true },
        sender_role: { type: String, required: true }, // "investor" or "skilledworker"
        receiver_role: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
