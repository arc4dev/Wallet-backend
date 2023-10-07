const express = require('express');
const router = express.Router();
const ctrlAuth = require('../../controller/other');

router.get('/users/current', ctrlAuth.getCurrentUser);

router.get('/transaction-categories', ctrlAuth.transactionCategories);

router.get('/transactions-summary', ctrlAuth.transactionsSummary);

module.exports = router;
