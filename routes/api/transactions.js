const express = require('express');
const router = express.Router();
const ctrlAuth = require('../../controller/transactions');

router.post('/', ctrlAuth.createNewTransaction);

router.get('/', ctrlAuth.getAllTransactions);

router.patch('/:transactionId', ctrlAuth.updateTransaction);

router.delete('/:transactionId', ctrlAuth.removeTransaction);

module.exports = router;
