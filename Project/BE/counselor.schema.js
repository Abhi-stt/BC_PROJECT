const mongoose = require('mongoose');
const { Schema } = mongoose;

const CounselorSchema = new Schema({
  name: String,
  title: String,
  specialization: [String],
  experience: Number,
  rating: Number,
  reviews: Number,
  languages: [String],
  photo: String,
  verified: Boolean,
  availability: String,
  sessionTypes: [String],
  pricePerSession: Number,
  bio: String
});

module.exports = mongoose.model('Counselor', CounselorSchema); 