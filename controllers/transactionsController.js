const Transaction = require('../models/transactionModel');

const createNewTransaction = async (req, res, next) => {
  res.status(200).json({
    status: 'success',
  });
};

const getAllTransactions = async (req, res, next) => {
  res.status(200).json({
    status: 'success',
  });
};

const updateTransaction = async (req, res, next) => {
  res.status(200).json({
    status: 'success',
  });
};

const removeTransaction = async (req, res, next) => {
  res.status(200).json({
    status: 'success',
  });
};

const getTransactionCategories = async (req, res, next) => {
  res.status(200).json({
    status: 'success',
  });
};

const getUserTransactions = async (req, res, next) => {
  try {
    // Pobierz transakcje użytkownika na podstawie ID użytkownika
    const userId = req.user._id;
    const userTransactions = await Transaction.find({ owner: userId });

    res.status(200).json({
      status: 'success',
      transactions: userTransactions,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while fetching user transactions.',
    });
  }
};

const getTransactionsSummary = async (req, res, next) => {
  res.status(200).json({
    status: 'success',
  });
};

module.exports = {
  createNewTransaction,
  getAllTransactions,
  updateTransaction,
  removeTransaction,
  getTransactionCategories,
  getUserTransactions,
  getTransactionsSummary,
};
