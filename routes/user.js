const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getIndex);

router.get('/signup', userController.getSignup);

router.post('/signup', userController.postSignup);

router.get('/log-out', userController.logOut);

router.post('/log-in', userController.logIn);

module.exports = router;
