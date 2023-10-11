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
    trim: true,
    required: [true, 'Password is required'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'You must confirm your password!'],
    trim: true,
    validate: {
      validator: function (el) {
        return this.password === el;
      },
    },
  },
  name: {
    type: String,
    default: null,
    required: [true, 'Name is require'],
  },
  role: {
    type: String,
    enum: {
      values: ['user', 'admin'],
      message: 'The role must be either user or admin',
    },
    default: 'user',
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

// Exclude fields before find
userSchema.pre(/^find/, function (next) {
  this.select('-password');

  next();
});

// Method to check if password is correct
userSchema.methods.isCorrectPassword = async function (passwordToCheck, userPassword) {
  return await bcrypt.compare(passwordToCheck, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
