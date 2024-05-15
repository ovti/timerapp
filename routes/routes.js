const express = require('express');
const router = express.Router();
const authMiddleware = require('../config/authMiddleware');
const userController = require('../controllers/userController');
const timerController = require('../controllers/timerController');
const categoryController = require('../controllers/categoryController');
const taskController = require('../controllers/taskController');
const settingsController = require('../controllers/settingsController');

router.get('/', userController.getIndex);

// user routes

router.get('/signup', userController.getSignup);

router.post('/signup', userController.postSignup);

router.get('/logout', userController.logOut);

router.post('/login', userController.logIn);

router.delete('/user/:id', userController.deleteData);

// settings routes

router.get('/settings/:id', settingsController.getSettings);

router.put(
  '/settings/:id/:breakDuration/:alarmSound/:autoResume',
  settingsController.updateSettings
);

// timer routes

router.get('/sessions/:id', timerController.getSessions);

router.delete('/session/:id', timerController.deleteSession);

router.post(
  '/saveTimerSession/:id/:time/:task',
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

// category routes

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

// task routes

router.get('/tasks/:id', authMiddleware.verifyToken, taskController.getTasks);

router.post(
  '/task/:id/:category/:title/:description/:sessionsToComplete',
  authMiddleware.verifyToken,
  taskController.saveTask
);

router.delete(
  '/task/:id',
  authMiddleware.verifyToken,
  taskController.deleteTask
);

router.put(
  '/task/:id/:description/:sessionsToComplete',
  taskController.updateTask
);

module.exports = router;
