const mongoose = require("mongoose");
require("mongoose-type-email");

const InvestorSignupSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
  },
  nationalid: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    default: "male",
  },
  district: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  registrationNumber: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Investor",
  },
  images: {
    type: String,
    required: true,
    url: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  payment: {
    status: {
      type: String,
      default: "succeed",
    },
    transactionId: {
      type: String,
    },
    paymentDate: {
      type: Date,
    },
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

const Investor = mongoose.model("Investor", InvestorSignupSchema);

module.exports = Investor;
