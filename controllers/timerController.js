const TimerSession = require('../db/models/timerSession');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.saveTimerSession = async (req, res, next) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
    try {
      console.log('Saving timer session ', req.params.time);
      console.log('User:', req.params.id);
      await TimerSession.create({
        userId: req.params.id,
        timeInSeconds: parseInt(req.params.time),
      });
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error saving timer session');
    }
  });
};

exports.sessionCountToday = async (req, res, next) => {
  try {
    const sessionCount = await TimerSession.count({
      where: {
        userId: req.params.id,
        createdAt: {
          [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    });
    res.json({ sessionCount });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching session count');
  }
};

exports.totalDurationToday = async (req, res, next) => {
  try {
    const totalDuration = await TimerSession.sum('timeInSeconds', {
      where: {
        userId: req.params.id,
        createdAt: {
          [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    });
    res.json({ totalDuration });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching total duration');
  }
};
