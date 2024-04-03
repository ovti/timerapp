const TimerSession = require('../db/models/timerSession');
const { Op } = require('sequelize');

exports.saveTimerSession = async (req, res, next) => {
  try {
    const { time } = req.query;
    console.log('Saving timer session ', time);
    console.log('User:', req.user.id);
    await TimerSession.create({
      userId: req.user.id,
      timeInSeconds: parseInt(time),
    });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving timer session');
  }
};

exports.sessionCountToday = async (req, res, next) => {
  try {
    const sessionCount = await TimerSession.count({
      where: {
        userId: req.user.id,
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
        userId: req.user.id,
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
