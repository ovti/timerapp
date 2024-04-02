const TimerSession = require('../db/models/timerSession');

exports.saveTimerSession = async (req, res, next) => {
  try {
    const { time } = req.query;
    console.log('Saving timer session ', time);
    console.log('User:', req.user.id);
    await TimerSession.create({
      userId: req.user.id,
      timeInSeconds: parseInt(time),
      timestamp: new Date(),
    });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving timer session');
  }
};

exports.sessionCount = async (req, res, next) => {
  try {
    const sessionCount = await TimerSession.count({
      where: { userId: req.user.id },
    });
    res.json({ sessionCount });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching session count');
  }
};

exports.totalDuration = async (req, res, next) => {
  try {
    const totalDuration = await TimerSession.sum('timeInSeconds', {
      where: { userId: req.user.id },
    });
    res.json({ totalDuration });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching total duration');
  }
};
