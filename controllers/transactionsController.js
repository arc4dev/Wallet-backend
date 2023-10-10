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
