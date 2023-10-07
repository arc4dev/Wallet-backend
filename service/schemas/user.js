const mongoose = require('mongoose');
const { Schema } = mongoose;

const user = new Schema({
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
  },
  token: {
    type: String,
    default: null,
  },
});

const User = mongoose.model('user', user);

module.exports = User;
