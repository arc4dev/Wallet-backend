const express = require('express');
const transactionsController = require('../controllers/transactionsController');

const router = express.Router();

router
  .route('/')
  .get(transactionsController.getAllTransactions)
  .post(transactionsController.createNewTransaction);

router
  .route('/:transactionId')
  .patch(transactionsController.updateTransaction)
  .delete(transactionsController.removeTransaction);

router.get('/transaction-categories', transactionsController.getTransactionCategories);

router.get('/transactions-summary', transactionsController.getTransactionsSummary);

module.exports = router;
