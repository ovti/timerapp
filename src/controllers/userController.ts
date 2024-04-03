import bcrypt from 'bcryptjs';
import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import User from '../db/models/user';

export const getIndex = async (req: Request, res: Response) => {
  try {
    res.render('index', { user: req.user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

export const getSignup = (req: Request, res: Response) => {
  res.render('user/signup', { message: req.flash('error') });
};

export const postSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const existingUser = await User.findOne({
      where: { username: req.body.username },
    });
    if (existingUser) {
      req.flash('error', 'User already exists');
      return res.render('user/signup', { message: req.flash('error') });
    }
    if (req.body.password !== req.body.confirmPassword) {
      req.flash('error', 'Passwords do not match');
      return res.render('user/signup', { message: req.flash('error') });
    }

    await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.flash('success', 'You are now registered and can log in');
    res.redirect('/');
  } catch (err) {
    return next(err);
  }
};

export const logOut = (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};

export const logIn = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err: Error, user: unknown, info: unknown) => {
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
