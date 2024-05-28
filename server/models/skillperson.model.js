const mongoose = require("mongoose");
const { type } = require("os");
require("mongoose-type-email");

const userSchema = new mongoose.Schema({
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
  user_name: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  payment: {
    status: {
      type: String,
      enum: ["succeed", "pending", "failed"],
    },
    transactionId: {
      type: String,
    },
    paymentDate: {
      type: Date,
    },
  },
  bio: {
    type: String,
  },
  followers: {
    type: Array,
    default: [],
  },
  followRequest: {
    type: Array,
    default: [],
  },
});

const Skilledperson = mongoose.model("Skilledperson", userSchema);

module.exports = Skilledperson;
