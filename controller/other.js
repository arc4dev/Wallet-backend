const getCurrentUser = async (req, res, next) => {
  console.log('current user');
};

const transactionCategories = async (req, res, next) => {
  console.log('transaction categories');
};

const transactionsSummary = async (req, res, next) => {
  console.log('transactions summary');
};

module.exports = {
  getCurrentUser,
  transactionCategories,
  transactionsSummary,
};
