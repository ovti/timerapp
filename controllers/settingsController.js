const User = require('../db/models/user');
const Settings = require('../db/models/settings');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { Op, sequelize } = require('sequelize');

dotenv.config();

exports.getSettings = async (req, res, next) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
    try {
      const settings = await Settings.findOne({
        where: {
          userId: req.params.id,
        },
      });
      res.json(settings);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching settings');
    }
  });
};

exports.updateSettings = async (req, res, next) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
    try {
      await Settings.update(
        {
          breakDuration: req.params.breakDuration,
          alarmSound: req.params.alarmSound,
        },
        {
          where: {
            userId: req.params.id,
          },
        }
      );
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error updating settings');
    }
  });
};
