const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  communityName: {
    type: String,
    required: true
  },
  religion: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  rules: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  totalMembers: {
    type: Number,
    default: 0
  },
  activeMembers: {
    type: Number,
    default: 0
  },
  totalMatches: {
    type: Number,
    default: 0
  },
  successfulMatches: {
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
  contactEmail: {
    type: String,
    required: true
  },
  contactPhone: {
    type: String,
    required: true
  },
  location: {
    city: String,
    state: String,
    country: {
      type: String,
      default: 'India'
    }
  },
  profileApprovalCriteria: {
    ageRange: {
      min: Number,
      max: Number
    },
    requiredFields: [String],
    verificationRequired: {
      type: Boolean,
      default: true
    }
  },
  events: [{
    title: String,
    description: String,
    date: Date,
    time: String,
    location: String,
    maxAttendees: Number,
    attendees: [{
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      status: {
        type: String,
        enum: ['registered', 'attended', 'cancelled'],
        default: 'registered'
      }
    }],
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
      default: 'upcoming'
    }
  }],
  monthlyGrowth: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for efficient queries
communitySchema.index({ userId: 1 });
communitySchema.index({ status: 1 });
communitySchema.index({ isVerified: 1 });
communitySchema.index({ religion: 1 });
communitySchema.index({ region: 1 });

module.exports = mongoose.model('Community', communitySchema); 