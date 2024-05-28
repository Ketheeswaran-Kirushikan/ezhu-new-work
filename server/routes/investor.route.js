const express = require("express");
const router = express.Router();
const userController = require("../controllers/investor.controller");

router.post("/createInvestorPerson/:_id", userController.verifyUser);
router.post("/loginInvestorerson", userController.getUser);
router.get("/findInvestorPerson", userController.findUser);
router.delete("/deleteInvestorPerson/:_id", userController.deleteUser);
router.put("/updateInvestorPerson/:_id", userController.updateUser);
router.post("/createInvestorPersonAdmin", userController.createUser);

module.exports = router;
