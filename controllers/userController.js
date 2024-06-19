const passport = require('passport');
const User = require('../db/models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const TimerSession = require('../db/models/timerSession');
const Category = require('../db/models/category');
const Task = require('../db/models/task');
const Settings = require('../db/models/settings');

dotenv.config();

exports.getIndex = async (req, res) => {
  res.json({ message: 'Hello from the server!' });
};

exports.getSignup = (req, res) => {
  res.json({ message: 'Signup page' });
};

exports.deleteData = async (req, res, next) => {
  try {
    await TimerSession.destroy({
      where: {
        userId: req.params.id,
      },
    });
    await Task.destroy({
      where: {
        userId: req.params.id,
      },
    });
    await Category.destroy({
      where: {
        userId: req.params.id,
      },
    });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting data');
  }
};

exports.postSignup = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({
      where: { username: req.body.username },
    });
    if (existingUser) {
      const err = new Error('User already exists');
      err.status = 400;
      return next(err);
    }
    if (req.body.password !== req.body.confirmPassword) {
      const err = new Error('Passwords do not match');
      err.status = 401;
      return next(err);
    }

    await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    const user = await User.findOne({ where: { username: req.body.username } });
    await Settings.create({
      userId: user.id,
      breakDuration: 5,
      alarmSound: 'bell',
      autoResume: true,
    });

    // create category 'None' for new user
    await Category.create({
      userId: user.id,
      category: 'None',
    });

    res.json({ message: 'Registration successful' });
  } catch (err) {
    return next(err);
  }
};

exports.logIn = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      const err = new Error('User not found');
      err.status = 400;
      return next(err);
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      jwt.sign(
        { user: user },
        process.env.JWT_SECRET,
        { expiresIn: '1d' },
        (err, token) => {
          if (err) {
            return next(err);
          }
          res.json({
            token,
            userId: user.id,
            nickname: user.username,
          });
        }
      );
    });
  })(req, res, next);
};

exports.logOut = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};
