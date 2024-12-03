const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Revenue', 'Expense'],
    required: true
  },
  status: {
    type: String,
    enum: ['Paid', 'Pending'],
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  user_profile: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^https?:\/\/.+\..+$/.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  }
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;
