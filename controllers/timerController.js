const TimerSession = require('../db/models/timerSession');

exports.saveTimerSession = async (req, res, next) => {
  try {
    const { time } = req.query;
    console.log('Saving timer session ', time);
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
