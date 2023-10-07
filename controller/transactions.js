const createNewTransaction = async (req, res, next) => {
  console.log('create new transaction');
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

module.exports = {
  createNewTransaction,
  getAllTransactions,
  updateTransaction,
  removeTransaction,
};
