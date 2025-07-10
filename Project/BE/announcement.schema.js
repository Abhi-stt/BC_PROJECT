const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  targetAudience: { type: [String], default: ['all'] } // user IDs or roles
});

module.exports = mongoose.model('Announcement', AnnouncementSchema); 