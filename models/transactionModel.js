const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = new Schema({
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
  },
  owner: {
    type: Schema.Types.ObjectId,
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
