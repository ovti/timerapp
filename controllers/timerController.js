const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const TimerSession = require('../db/models/timerSession');
const Category = require('../db/models/category');
const Task = require('../db/models/task');

dotenv.config();

exports.getSessions = async (req, res, next) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
    try {
      const sessions = await TimerSession.findAll({
        where: {
          userId: req.params.id,
        },
        include: [
          {
            model: Task,
            include: [
              {
                model: Category,
              },
            ],
          },
        ],

        order: [['createdAt', 'DESC']],
      });
      res.json(sessions);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching sessions');
    }
  });
};

exports.deleteSession = async (req, res, next) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
    try {
      await TimerSession.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error deleting session');
    }
  });
};

exports.saveTimerSession = async (req, res, next) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
    try {
      await TimerSession.create({
        userId: req.params.id,
        taskId: req.params.task,
        time: parseInt(req.params.time),
      });
      const task = await Task.findByPk(req.params.task);
      const sessions = await TimerSession.count({
        where: {
          taskId: req.params.task,
        },
      });
      if (sessions >= task.sessionsToComplete) {
        await Task.update(
          { status: 'completed' },
          {
            where: {
              id: req.params.task,
            },
          }
        );
      }

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
    const totalDuration = await TimerSession.sum('time', {
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
