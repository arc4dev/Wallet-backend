const Transaction = require('../models/transactionModel');

const createNewTransaction = async (req, res, next) => {
  try {
    const { amount, date, category, comment } = req.body;

    const newTransaction = await Transaction.create({
      amount,
      date,
      category,
      comment,
      owner: req.user._id,
    });

    res.status(201).json({ status: 'success', data: newTransaction });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

const getAllTransactions = async (req, res, next) => {
  try {
    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    res.status(500).json({ err });
  }
};

const updateTransaction = async (req, res, next) => {
  try {
    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    res.status(500).json({ err });
  }
};

const removeTransaction = async (req, res, next) => {
  try {
    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    res.status(500).json({ err });
  }
};

const getTransactionCategories = async (req, res, next) => {
  try {
    const categories = await Transaction.distinct('category');

    return res.status(200).json({
      status: 'success',
      data: categories,
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

const getTransactionsSummary = async (req, res, next) => {
  try {
    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    res.status(500).json({ err });
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
            $eq: [{ $year: '$date' }, parseInt(year)],
            $eq: [{ $month: '$date' }, parseInt(month)],
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
      monthlyStats: userMonthlyStats[0],
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while fetching user monthly stats.',
    });
  }
};

const getUserYearlyStats = async (req, res, next) => {
  try {
    // Pobierz ID użytkownika i rok z żądania
    const userId = req.user._id;
    const year = req.query.year;

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
      yearlyStats: userYearlyStats[0],
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while fetching user yearly stats.',
    });
  }
};

module.exports = {
  createNewTransaction,
  getAllTransactions,
  updateTransaction,
  removeTransaction,
  getTransactionCategories,
  getTransactionsSummary,
  getUserMonthlyStats,
  getUserYearlyStats,
};
