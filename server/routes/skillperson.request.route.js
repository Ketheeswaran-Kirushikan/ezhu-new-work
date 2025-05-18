const express = require("express");
const router = express.Router();
const requestController = require("../controllers/skillperson.request.controller");

router.post("/createSkilledPersonRequest", requestController.createUser);
router.get("/findSkilledPersonRequest", requestController.findUser);
router.delete("/deleteSkilledPersonRequest/:id", requestController.deleteUser);
router.post("/sendMail/:_id/:role", requestController.sendWelcomeEmail);

module.exports = router;
