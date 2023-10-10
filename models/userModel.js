const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  name: {
    type: String,
    default: null,
    // require: [true, 'Name is require'],
  },
  token: {
    type: String,
    default: null,
  },
  //   verify: {
  //     type: Boolean,
  //     default: false,
  //   },
  //   verificationToken: {
  //     type: String,
  //     required: [true, 'Verify token is required'],
  //   },
  // });
});

const User = mongoose.model('User', userSchema);

module.exports = User;
