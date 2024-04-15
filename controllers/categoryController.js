const category = require('../db/models/category');
const TimerSession = require('../db/models/timerSession');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

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
      console.log('Saving category ', req.params.category);
      console.log('User:', req.params.id);
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
      await TimerSession.destroy({
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
