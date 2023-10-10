const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});

// Method to check if password is correct
userSchema.methods.isCorrectPassword = async function (passwordToCheck, userPassword) {
  return await bcrypt.compare(passwordToCheck, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
