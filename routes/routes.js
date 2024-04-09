const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const timerController = require('../controllers/timerController');

router.get('/', userController.getIndex);

router.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

router.post(
  '/api/posts',
  userController.verifyToken,
  userController.createPost
);

router.get('/signup', userController.getSignup);

router.post('/signup', userController.postSignup);

router.get('/logout', userController.logOut);

router.post('/login', userController.logIn);

router.post('/saveTimerSession', timerController.saveTimerSession);

router.get('/sessionCountToday', timerController.sessionCountToday);

router.get('/totalDurationToday', timerController.totalDurationToday);

module.exports = router;
