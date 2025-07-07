const mongoose = require('mongoose');
const { Schema } = mongoose;

const EventSchema = new Schema({
  title: String,
  description: String,
  date: String,
  time: String,
  location: String,
  type: { type: String, enum: ['virtual', 'in-person', 'hybrid'] },
  category: { type: String, enum: ['networking', 'workshop', 'social', 'cultural'] },
  maxParticipants: Number,
  currentParticipants: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  organizer: String,
  image: String,
  featured: { type: Boolean, default: false },
  registeredUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema); 