const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Task = require('../db/models/task');
const Category = require('../db/models/category');
const TimerSession = require('../db/models/timerSession');
const User = require('../db/models/user');

dotenv.config();

exports.getTasks = async (req, res, next) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
    try {
      const tasks = await Task.findAll({
        where: {
          userId: req.params.id,
        },
        include: [
          {
            model: Category,
          },
        ],
        order: [['createdAt', 'DESC']],
      });
      const tasksWithSessionCount = await Promise.all(
        tasks.map(async (task) => {
          const sessionCount = await TimerSession.count({
            where: {
              taskId: task.id,
            },
          });
          return {
            ...task.toJSON(),
            sessionCount,
          };
        })
      );
      res.json(tasksWithSessionCount);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching tasks');
    }
  });
};

exports.saveTask = async (req, res, next) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
    try {
      console.log('Saving task ', req.params.title);
      console.log('User:', req.params.id);
      console.log('Category:', req.params.category);
      console.log('Description:', req.params.description);
      console.log('Sessions to complete:', req.params.sessionsToComplete);
      await Task.create({
        userId: req.params.id,
        categoryId: req.params.category,
        title: req.params.title,
        description: req.params.description,
        status: 'pending',
        sessionsToComplete: req.params.sessionsToComplete,
      });
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error saving task');
    }
  });
};

exports.deleteTask = async (req, res, next) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
    try {
      const task = await Task.findOne({
        where: {
          id: req.params.id,
        },
      });
      await TimerSession.destroy({
        where: {
          taskId: task.id,
        },
      });
      await task.destroy();
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error deleting task');
    }
  });
};
