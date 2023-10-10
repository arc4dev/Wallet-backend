const passport = require('../config/config-passport.js');
const User = require('../models/userModel.js');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'An error occurred during authentication.',
    });
  }
};

const signUp = async (req, res, next) => {
  try {
    const { body } = req;
    const { email, name, password } = body;
    const user = await User.create({
      name,
      email,
      password,
    });
    const payload = {
      id: user.id,
      username: email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    user.token = token;
    await user.save();
    const owner = await User.find();
    const singleUser = owner.find(user => user.email === email);
    if (!singleUser) {
      return console.log('cannot find user');
    }

    res.status(200).json({
      status: 'success',
      message: 'User signed up',
      token,
    });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

const signIn = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ status: 'fail', message: 'User not found' });

    const payload = {
      id: user.id,
      username: user.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    user.token = token;
    await user.save();
    console.log(token);
    return res.status(200).json({
      status: 'success',
      message: 'User logged in',
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      code: 500,
      data: err,
    });
  }
};

const signOut = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ Error: 'User not found' });
    }
    user.token = null;
    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'User logged out',
      data: user,
    });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      code: 500,
      message: `${err}`,
    });
  }
};

module.exports = {
  signUp,
  signIn,
  signOut,
  getCurrentUser,
  auth,
};
