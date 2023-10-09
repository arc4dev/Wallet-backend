const passport = require('../config/config-passport.js');
const User = require('../models/userModel.js');

const auth = async (req, res, next) => {
  try {
    await passport.authenticate('jwt', { session: false }, async (err, user) => {
      if (!user || err) {
        return res.status(401).json({
          status: 'error',
          code: 401,
          message: 'Unauthorized',
          data: 'Unauthorized',
        });
      }

      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];

      const allUsers = await User.find();
      const isToken = allUsers.some(user => user.token === token);
      if (!isToken) {
        return res.status(401).json({
          status: 'error',
          code: 401,
          data: 'No Authorization',
        });
      }

      req.user = user;
      next();
    })(req, res, next);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      code: 500,
      message: 'An error occurred during authentication.',
    });
  }
};

const signUp = async (req, res, next) => {
  try {
    const { body } = req;
    const { email, name, password } = body;
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

    return res.status(200).json({
      status: 'success',
      code: 200,
      user: { body: { email, name, password } },
      // token: token,
    });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

const signIn = async (req, res, next) => {
  console.log('sign in');
};

const signOut = async (req, res, next) => {
  console.log('sign out');
};

const getCurrentUser = async (req, res, next) => {
  console.log('current user');
};

module.exports = {
  signUp,
  signIn,
  signOut,
  getCurrentUser,
  auth,
};