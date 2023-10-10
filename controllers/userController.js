const Transaction = require('../models/transactionModel');
const User = require('../models/userModel');

const getCurrentUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    // 1. Find a user
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ status: 'fail', message: 'User not found' });
    }

    // 2. Send a response
    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

const getUserTransactions = async (req, res, next) => {
  try {
    // Pobierz transakcje użytkownika na podstawie ID użytkownika
    const userTransactions = await Transaction.find({ owner: req.user._id });

    res.status(200).json({
      status: 'success',
      data: userTransactions,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

module.exports = {
  getCurrentUser,
  getUserTransactions,
};
