const mongoose = require('mongoose');

const counselorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true,
    min: 0
  },
  counselingMethods: [{
    type: String,
    enum: ['online', 'offline', 'both'],
    default: ['online']
  }],
  availableCities: [{
    type: String,
    required: true
  }],
  sessionFees: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalSessions: {
    type: Number,
    default: 0
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['active', 'pending', 'suspended'],
    default: 'pending'
  },
  timeSlots: [{
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    },
    isAvailable: {
      type: Boolean,
      default: true
    },
    sessionType: {
      type: String,
      enum: ['online', 'offline', 'both'],
      default: 'both'
    }
  }],
  // Add counselingRequests subdocument
  counselingRequests: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userName: String,
    userEmail: String,
    userPhone: String,
    issue: String,
    preferredTime: String,
    sessionType: { type: String, enum: ['online', 'offline'] },
    status: { type: String, enum: ['pending', 'accepted', 'completed', 'cancelled'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
  }],
  // Add sessions subdocument
  sessions: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userName: String,
    date: String,
    time: String,
    duration: Number,
    sessionType: { type: String, enum: ['online', 'offline'] },
    status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
    notes: String,
    rating: Number,
    feedback: String
  }],
  totalEarnings: {
    type: Number,
    default: 0
  },
  totalRequests: {
    type: Number,
    default: 0
  },
  completedSessions: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for efficient queries
counselorSchema.index({ userId: 1 });
counselorSchema.index({ status: 1 });
counselorSchema.index({ isVerified: 1 });
counselorSchema.index({ availableCities: 1 });

module.exports = mongoose.model('Counselor', counselorSchema); 