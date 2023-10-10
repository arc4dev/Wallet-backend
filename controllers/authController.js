// const jwt = require('jsonwebtoken');
const passport = require('../config/config-passport.js');
const User = require('../models/userModel.js');

const auth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        status: 'error',
        message: 'Unauthorized',
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};
const signUp = async (req, res, next) => {
  try {
    // const { body } = req;
    // const { email, name, password } = body;
    // const user = await User.create({
    //   name,
    //   email,
    //   password,
    // });
    // const payload = {
    //   id: user.id,
    //   username: email,
    // };
    // const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // user.token = token;
    // await user.save();
    // const user = await User.find();
    // const singleUser = user.find(user => user.email === email);
    // if (!singleUser) {
    // return console.log('cannot find user');
    // }

    res.status(200).json({
      status: 'success',
      message: 'User signed up',
      // token
    });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

const signIn = async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'User logged in',
  });
};

const signOut = async (req, res, next) => {
  const getUserbyId = async id => {
    try {
      return await User.findById(id);
    } catch (e) {
      console.log(e);
    }
  };
  try {
    const { id } = req.user;
    const user = await getUserbyId(id);
    if (!user) {
      return res.status(404).json('Error! User not found!');
    }
    user.token = null;
    await user.save();
    res.status(204).json({ message: 'User signed out' });
  } catch (error) {
    res.status(401).json({
      message: 'Bearer auth failed',
    });
  }
};

const getCurrentUser = async (req, res, next) => {
  res.status(200).json({
    status: 'success',
  });
};

module.exports = {
  signUp,
  signIn,
  signOut,
  getCurrentUser,
  auth,
};
