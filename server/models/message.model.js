const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    sender_id: {
      type: String,
      required: true,
    },
    receiver_id: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    sender_role: {
      type: String,
      required: true,
    },
    receiver_role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
