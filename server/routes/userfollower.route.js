const express = require("express");
const router = express.Router();
const followController = require("../controllers/followers.controller");

router.post("/followRequest/:id/:userid", followController.createFollowers);
router.get("/followers/:id", followController.findUser);
router.get("/followersRequests/:id", followController.sendRequest);
router.put("/followersChange/:id/:userid", followController.changeFollowers);
router.delete("/followersDelete/:id/:userid", followController.deleteFollowers);
router.get("/getfollowers/:id", followController.getFollowers);

module.exports = router;
