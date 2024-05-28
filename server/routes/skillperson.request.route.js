const express = require("express");
const router = express.Router();
const requestController = require("../controllers/skillperson.request.controller");

router.post("/createSkilledPersonRequest", requestController.createUser);
router.get("/findSkilledPersonRequest", requestController.findUser);
router.delete("/deleteSkilledPersonRequest/:id", requestController.deleteUser);

module.exports = router;
