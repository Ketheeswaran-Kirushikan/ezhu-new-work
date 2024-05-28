const mongoose = require("mongoose");
require("mongoose-type-email");

const userRequestSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    default: "male",
  },
  birthDate: {
    type: Date,
    required: true,
  },
  skill: {
    type: Array,
    default: [],
  },
  role: {
    type: String,
    default: "skilled person",
  },
  nationalid: {
    type: String,
    required: true,
    unique: true,
  },
  district: {
    type: String,
    required: true,
  },
  images: {
    type: String,
    url: String,
  },
  referenceNumbers: {
    type: String,
    required: true,
  },
  payment: {
    status: {
      type: String,
      enum: ["succeed", "pending", "failed"],
      default: "pending",
    },
    transactionId: {
      type: String,
    },
    paymentDate: {
      type: Date,
    },
  },
});

const User = mongoose.model("SkilledpersonRequest", userRequestSchema);

module.exports = User;
