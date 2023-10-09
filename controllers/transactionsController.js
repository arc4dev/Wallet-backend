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
  console.log('get all transaction');
};

const updateTransaction = async (req, res, next) => {
  console.log('update transaction');
};

const removeTransaction = async (req, res, next) => {
  console.log('remove transaction');
};

const getTransactionCategories = async (req, res, next) => {
  console.log('transaction categories');
};

const getTransactionsSummary = async (req, res, next) => {
  console.log('transactions summary');
};

module.exports = {
  createNewTransaction,
  getAllTransactions,
  updateTransaction,
  removeTransaction,
  getTransactionCategories,
  getTransactionsSummary,
};
