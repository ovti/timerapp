const express = require('express');
const router = express.Router();
const authMiddleware = require('../config/authMiddleware');
const userController = require('../controllers/userController');
const timerController = require('../controllers/timerController');
const categoryController = require('../controllers/categoryController');

router.get('/', userController.getIndex);

router.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

router.post(
  '/api/posts',
  authMiddleware.verifyToken,
  userController.createPost
);

router.get('/signup', userController.getSignup);

router.post('/signup', userController.postSignup);

router.get('/logout', userController.logOut);

router.post('/login', userController.logIn);

router.post(
  '/saveTimerSession/:id/:time',
  authMiddleware.verifyToken,
  timerController.saveTimerSession
);

router.get(
  '/sessionCountToday/:id',
  authMiddleware.verifyToken,
  timerController.sessionCountToday
);

router.get(
  '/totalDurationToday/:id',
  authMiddleware.verifyToken,
  timerController.totalDurationToday
);

router.post('/saveCategory/:id/:category', categoryController.saveCategory);

router.get('/getCategories/:id', categoryController.getCategories);

module.exports = router;
