const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");

router.delete("/deletePost/:_id", postController.deletePost);
router.put("/updatePost/:_id", postController.updatePost);
router.post("/createPost", postController.createPost);
router.get("/postScroll", postController.viewPost);
router.get("/postScrollProfile/:_id", postController.profileViewPost);

module.exports = router;
