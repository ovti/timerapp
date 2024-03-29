const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getIndex);

router.get('/signup', userController.getSignup);

router.post('/signup', userController.postSignup);

router.get('/logout', userController.logOut);

router.post('/login', userController.logIn);

module.exports = router;
