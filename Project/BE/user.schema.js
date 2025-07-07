const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  age: Number,
  location: String,
  education: String,
  profession: String,
  religion: String,
  interests: [String],
  bio: String,
  photos: [String],
  preferences: {
    ageRange: { type: [Number], default: [18, 99] },
    location: String,
    education: String,
    profession: String
  },
  isVerified: { type: Boolean, default: false },
  profileComplete: { type: Boolean, default: false },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  compatibilityScore: Number,
  verificationStatus: String,
  lastActive: String
});

module.exports = mongoose.model('User', UserSchema); 