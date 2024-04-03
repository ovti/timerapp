import express from 'express';
import * as userController from '../controllers/userController';
import * as timerController from '../controllers/timerController';

const router = express.Router();

router.get('/', userController.getIndex);

router.get('/signup', userController.getSignup);

router.post('/signup', userController.postSignup);

router.get('/logout', userController.logOut);

router.post('/login', userController.logIn);

router.post('/saveTimerSession', timerController.saveTimerSession);

router.get('/sessionCountToday', timerController.sessionCountToday);

router.get('/totalDurationToday', timerController.totalDurationToday);

export default router;
