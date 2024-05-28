const mongoose = require("mongoose");
require("mongoose-type-email");

const investorSchema = new mongoose.Schema({
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

const InvestorRequest = mongoose.model("InvestorRequest", investorSchema);

module.exports = InvestorRequest;
