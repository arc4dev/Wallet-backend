const express = require('express');
const transactionsController = require('../controllers/transactionsController');
const authController = require('../controllers/authController');

const router = express.Router();

// Auth before all requests
router.use(authController.auth);

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
