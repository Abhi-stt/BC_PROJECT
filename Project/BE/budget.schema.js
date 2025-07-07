const mongoose = require('mongoose');
const { Schema } = mongoose;

const BudgetSchema = new Schema({
  category: String,
  allocated: Number,
  spent: Number,
  color: String
});

module.exports = mongoose.model('Budget', BudgetSchema); 