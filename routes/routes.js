const express = require('express');
const router = express.Router();
const authMiddleware = require('../config/authMiddleware');
const userController = require('../controllers/userController');
const timerController = require('../controllers/timerController');
const categoryController = require('../controllers/categoryController');

router.get('/', userController.getIndex);

router.get('/signup', userController.getSignup);

router.post('/signup', userController.postSignup);

router.get('/logout', userController.logOut);

router.post('/login', userController.logIn);

router.get('/sessions/:id', timerController.getSessions);

router.post(
  '/saveTimerSession/:id/:time/:category',
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

router.get(
  '/category/:id',
  authMiddleware.verifyToken,
  categoryController.getCategories
);

router.post(
  '/category/:id/:category',
  authMiddleware.verifyToken,
  categoryController.saveCategory
);

router.delete(
  '/category/:id',
  authMiddleware.verifyToken,
  categoryController.deleteCategory
);

module.exports = router;
