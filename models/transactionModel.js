const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'A transaction must have an owner'],
  },
  date: {
    type: Date,
    required: [true, 'Data is required'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
  },
  comment: {
    type: String,
    required: [false, `Comment isn't required`],
  },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
