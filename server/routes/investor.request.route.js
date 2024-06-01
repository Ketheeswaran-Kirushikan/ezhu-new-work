const express = require("express");
const router = express.Router();
const requestController = require("../controllers/investor.request.controller");

router.post("/createInvestorRequest", requestController.createUser);
router.get("/findInvestorRequest", requestController.findUser);
router.delete("/deleteInvestorRequest/:id", requestController.deleteUser);
router.post("/sendMail/:_id", requestController.sendWelcomeEmail);

module.exports = router;
