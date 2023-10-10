// const jwt = require('jsonwebtoken');
const passport = require('../config/config-passport.js');

const User = require('../models/userModel.js');
const jwt = require('jsonwebtoken');

// helpers
const signToken = payload =>
  jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });

const auth = async (req, res, next) => {
  await passport.authenticate('jwt', { session: false }, async (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        status: 'fail',
        message: 'Unauthorized',
      });
    }

    req.user = user;
    next();
  })(req, res, next);
};

const signUp = async (req, res, next) => {
  try {
    const { body } = req;
    const { email, name, password } = body;

    // 1. Create a user
    const user = await User.create({
      name,
      email,
      password,
    });

    // 2. Sign a token to that user
    const token = signToken({
      id: user.id,
      username: email,
    });

    // 3. Send a token to the client
    res.status(201).json({
      status: 'success',
      token,
      data: user,
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1) Check if password and email are provided
    if (!email || !password)
      return res
        .status(400)
        .json({ status: 'fail', message: 'Please provide an email or password' });

    // 2) Check if user exists and password is correct
    const user = await User.findOne({
      email,
    }).select('+password');

    if (!user || !(await user.isCorrectPassword(password, user.password)))
      return res
        .status(400)
        .json({ status: 'fail', message: 'The email or password is incorrect!' });

    // 3) If everything is ok, send token to client
    const token = signToken({
      id: user.id,
      username: email,
    });

    res.status(200).json({
      status: 'success',
      token,
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

const signOut = async (req, res, next) => {
  try {
    // wylogowaniem musi byc dodanie tokena do czanrje listy i przy funkcji auth sprawdzanie czy token nalezy do tej listy
    
    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

module.exports = {
  signUp,
  signIn,
  signOut,
  auth,
};
