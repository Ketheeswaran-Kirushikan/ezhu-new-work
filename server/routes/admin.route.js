
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
router.post('/login', adminController.getAdmin);
router.post('/createAdmin',adminController.createAdmin)

module.exports = router;
