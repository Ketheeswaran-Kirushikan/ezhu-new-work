const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment.controller");

router.post("/userpayment/payment/:userId", paymentController.handlePayment);
router.get("/userpayment/success", paymentController.handlePayment);


module.exports = router;
