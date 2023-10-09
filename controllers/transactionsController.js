const Transaction = require('../models/transactionModel');

const createNewTransaction = async (req, res, next) => {
  const createTransaction = ({ amount, date, category, comment }) => {
    return Transaction.create({ amount, date, category, comment });
  };
  const { amount, date, category, comment } = req.body;
  try {
    const newTransaction = await createTransaction({ amount, date, category, comment });
    res.status(201).json(newTransaction);
  } catch (e) {
    console.error(e);
    next(e);
  }
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
