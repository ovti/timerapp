const category = require('../db/models/category');
const task = require('../db/models/task');
const timerSession = require('../db/models/timerSession');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { Op, sequelize } = require('sequelize');

dotenv.config();

exports.getCategories = async (req, res, next) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
    try {
      const categories = await category.findAll({
        where: {
          userId: req.params.id,
        },
      });
      res.json(categories);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching categories');
    }
  });
};

exports.saveCategory = async (req, res, next) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
    try {
      await category.create({
        userId: req.params.id,
        category: req.params.category,
      });
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error saving category');
    }
  });
};

exports.deleteCategory = async (req, res, next) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
    try {
      const tasks = await task.findAll({
        where: {
          categoryId: req.params.id,
        },
      });
      const taskIds = tasks.map((task) => task.id);
      await timerSession.destroy({
        where: {
          taskId: {
            [Op.in]: taskIds,
          },
        },
      });
      await task.destroy({
        where: {
          categoryId: req.params.id,
        },
      });
      await category.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error deleting category');
    }
  });
};
