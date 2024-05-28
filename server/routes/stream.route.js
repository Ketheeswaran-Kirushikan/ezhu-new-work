const express = require("express");
const router = express.Router();
const { generateToken } = require("../controllers/stream.comtroller");

router.get("/token", generateToken);

module.exports = router;
