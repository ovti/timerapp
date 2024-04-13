const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../db/models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.getIndex = async (req, res) => {
  // try {
  //   res.render('index', { user: req.user });
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).send('Server Error');
  // }
  res.json({ message: 'Hello from the server!' });
};

exports.getSignup = (req, res) => {
  res.render('user/signup', { message: req.flash('error') });
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

    res.json({ message: 'Registration successful' });
  } catch (err) {
    return next(err);
  }
};

// exports.logIn = (req, res, next) => {
//   passport.authenticate('local', (err, user, info) => {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       req.flash('error', 'Invalid username or password');
//       return res.redirect('/');
//     }
//     req.logIn(user, (err) => {
//       if (err) {
//         return next(err);
//       }
//       return res.redirect('/');
//     });
//   })(req, res, next);
// };

// exports.logOut = (req, res, next) => {
//   req.logout((err) => {
//     if (err) {
//       return next(err);
//     }
//     res.redirect('/');
//   });
// };

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

exports.createPost = (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created...',
        authData,
      });
    }
  });
};
