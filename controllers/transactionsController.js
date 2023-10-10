const Transaction = require('../models/transactionModel');

const createNewTransaction = async (req, res, next) => {
  try {
    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    res.status(500).json({ err });
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
    // Używa agregacji MongoDB, aby pobrać unikalne kategorie transakcji
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

module.exports = {
  createNewTransaction,
  getAllTransactions,
  updateTransaction,
  removeTransaction,
  getTransactionCategories,
  getTransactionsSummary,
};
