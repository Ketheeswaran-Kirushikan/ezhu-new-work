const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment.controller");

router.post("/payment/:_id", paymentController.handlePayment);

module.exports = router;
