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

const getUserMonthlyStats = async (req, res, next) => {
  try {
    // Pobierz ID użytkownika i miesiąc z żądania
    const userId = req.user._id;
    const { year, month } = req.query;

    // Oblicz statystyki za określony miesiąc
    const userMonthlyStats = await Transaction.aggregate([
      {
        $match: {
          owner: userId,
          $expr: {
            $and: [
              { $eq: [{ $year: '$date' }, parseInt(year)] },
              { $eq: [{ $month: '$date' }, parseInt(month)] },
            ],
          },
        },
      },
      {
        $group: {
          _id: null,
          totalIncome: {
            $sum: { $cond: [{ $eq: ['$amount', { $abs: '$amount' }] }, '$amount', 0] },
          },
          totalExpense: { $sum: { $cond: [{ $lt: ['$amount', 0] }, '$amount', 0] } },
        },
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: userMonthlyStats[0] || [],
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const getUserYearlyStats = async (req, res, next) => {
  try {
    // Pobierz ID użytkownika i rok z żądania
    const userId = req.user._id;
    const { year } = req.query;

    // Oblicz statystyki za określony rok
    const userYearlyStats = await Transaction.aggregate([
      {
        $match: {
          owner: userId,
          $expr: {
            $eq: [{ $year: '$date' }, parseInt(year)],
          },
        },
      },
      {
        $group: {
          _id: null,
          totalIncome: {
            $sum: { $cond: [{ $eq: ['$amount', { $abs: '$amount' }] }, '$amount', 0] },
          },
          totalExpense: { $sum: { $cond: [{ $lt: ['$amount', 0] }, '$amount', 0] } },
        },
      },
    ]);

    res.status(200).json({
      status: 'success',
      yearlyStats: userYearlyStats[0] || [],
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
};

module.exports = {
  getCurrentUser,
  getUserTransactions,
  getUserMonthlyStats,
  getUserYearlyStats,
};
