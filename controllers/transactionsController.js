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
  try {
    // Używa agregacji MongoDB, aby pobrać unikalne kategorie transakcji
    const categories = await Transaction.distinct('category');

    res.status(200).json({
      status: 'success',
      categories: categories,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while fetching transaction categories.',
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
  getTransactionsSummary,
};
