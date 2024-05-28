const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message.controller");
const protectRoute = require("../middleware/protectRoute");

router.post("/sendMessage/:_id", protectRoute, messageController.sendMessage);
router.get("/:_id", protectRoute, messageController.getMessage);
router.get(
  "/getuser/:_id",
  protectRoute,
  messageController.getUsersWithConversations
);

module.exports = router;
