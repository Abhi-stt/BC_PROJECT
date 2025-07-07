const mongoose = require('mongoose');
const { Schema } = mongoose;

const MatchSchema = new Schema({
  user1: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  user2: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  compatibilityScore: Number,
  status: { type: String, enum: ['pending', 'matched', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Match', MatchSchema); 