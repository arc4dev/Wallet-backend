// const jwt = require('jsonwebtoken');

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
};
