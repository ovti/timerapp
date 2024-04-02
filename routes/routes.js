const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const timerController = require('../controllers/timerController');

router.get('/', userController.getIndex);

router.get('/signup', userController.getSignup);

router.post('/signup', userController.postSignup);

router.get('/logout', userController.logOut);

router.post('/login', userController.logIn);

router.post('/saveTimerSession', timerController.saveTimerSession);

router.get('/sessionCount', timerController.sessionCount);

router.get('/totalDuration', timerController.totalDuration);

module.exports = router;
