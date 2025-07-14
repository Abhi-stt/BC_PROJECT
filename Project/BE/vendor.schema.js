const mongoose = require('mongoose');
const { Schema } = mongoose;

const VendorSchema = new Schema({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  businessName: { 
    type: String, 
    required: true 
  },
  services: [{ 
    type: String, 
    enum: ['catering', 'makeup', 'photography', 'decoration', 'music', 'transport', 'jewelry', 'clothing', 'venue', 'other'],
    required: true 
  }],
  city: { 
    type: String, 
    required: true 
  },
  location: { 
    type: String, 
    required: true 
  },
  address: String,
  phone: String,
  website: String,
  description: String,
  packages: [{
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    isActive: { type: Boolean, default: true }
  }],
  rating: { 
    type: Number, 
    default: 0 
  },
  totalReviews: { 
    type: Number, 
    default: 0 
  },
  isVerified: { 
    type: Boolean, 
    default: false 
  },
  status: { 
    type: String, 
    enum: ['pending', 'active', 'suspended'], 
    default: 'pending' 
  },
  documents: [{
    name: String,
    url: String,
    type: String
  }],
  workingHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String }
  },
  specializations: [String],
  experience: Number, // in years
  portfolio: [String], // image URLs
  socialMedia: {
    facebook: String,
    instagram: String,
    twitter: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Vendor', VendorSchema); 