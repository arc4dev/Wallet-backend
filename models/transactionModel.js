const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  date: {
    type: String,
    require: [true, 'Data is required'],
  },
  category: {
    type: String,
    require: [true, 'Category is required'],
  },
  comment: {
    type: String,
    require: [false, `Comment isn't required`],
  },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
