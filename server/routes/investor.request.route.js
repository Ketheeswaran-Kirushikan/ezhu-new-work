const express = require("express");
const router = express.Router();
const requestController = require("../controllers/investor.request.controller");

router.post("/createInvestorRequest", requestController.createUser);
router.get("/findInvestorRequest", requestController.findUser);
router.delete("/deleteInvestorRequest/:id", requestController.deleteUser);

module.exports = router;
