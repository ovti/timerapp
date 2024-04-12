const category = require('../db/models/category');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.saveCategory = async (req, res, next) => {
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
};

exports.getCategories = async (req, res, next) => {
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
};
