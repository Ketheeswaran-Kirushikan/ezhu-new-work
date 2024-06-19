const express = require("express");
const router = express.Router();
const userController = require("../controllers/skillperson.controller");

router.post("/createSkilledPerson/:_id", userController.verifyUser);
router.post("/loginSkilledPerson", userController.getUser);
router.get("/findSkilledPerson", userController.findUser);
router.delete("/deleteSkilledPerson/:_id", userController.deleteUser);
router.patch("/updateSkilledPerson/:_id", userController.updateUser);
router.post("/createSkilledPersonAdmin", userController.createUser);

module.exports = router;
