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
  res.render('user/signup', { message: req.flash('error') });
};

exports.postSignup = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      req.flash('error', 'User already exists');
      return res.render('user/signup', { message: req.flash('error') });
    }
    if (req.body.password !== req.body.confirmPassword) {
      req.flash('error', 'Passwords do not match');
      return res.render('user/signup', { message: req.flash('error') });
    }

    const user = new User({
      username: req.body.username,
      password: req.body.password,
      first_name: req.body.firstName,
      last_name: req.body.lastName,
    });
    await user.save();
    req.flash('success', 'You are now registered and can log in');
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

exports.logIn = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash('error', 'Invalid username or password');
      return res.redirect('/');
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });
  })(req, res, next);
};
