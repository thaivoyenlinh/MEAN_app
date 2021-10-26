const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/user', UserController.storeUser);
router.get('/user', UserController.getLatestUser);

module.exports = router;