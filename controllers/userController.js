const passport = require('passport');
const User = require('../models/user');
const dotenv = require('dotenv');

dotenv.config();

exports.getIndex = async (req, res) => {
  try {
    res.render('index', { user: req.user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getSignup = (req, res) => {
  res.render('user/signup');
};

exports.postSignup = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      const err = new Error('User already exists');
      err.status = 400;
      return next(err);
    }
    if (req.body.password !== req.body.confirmPassword) {
      const err = new Error('Passwords do not match');
      err.status = 400;
      return next(err);
    }

    const user = new User({
      username: req.body.username,
      password: req.body.password,
      first_name: req.body.firstName,
      last_name: req.body.lastName,
    });
    await user.save();
    res.redirect('/');
  } catch (err) {
    return next(err);
  }
};

exports.logOut = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};

exports.logIn = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/',
});
