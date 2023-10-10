const createNewTransaction = async (req, res, next) => {
  try {
    return res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const getAllTransactions = async (req, res, next) => {
  try {
    return res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const updateTransaction = async (req, res, next) => {
  try {
    return res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const removeTransaction = async (req, res, next) => {
  try {
    return res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const getTransactionCategories = async (req, res, next) => {
  try {
    return res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const getTransactionsSummary = async (req, res, next) => {
  try {
    return res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    return res.status(500).json({ err });
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
