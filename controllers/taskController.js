const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Task = require('../db/models/task');

dotenv.config();

exports.getTasks = async (req, res, next) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
    try {
      const tasks = await Task.findAll({
        where: {
          userId: req.params.id,
        },
        order: [['createdAt', 'DESC']],
      });
      res.json(tasks);
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
