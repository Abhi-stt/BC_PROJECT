const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, enum: ['virtual', 'in-person', 'hybrid'], required: true },
  category: { type: String, enum: ['networking', 'workshop', 'social', 'cultural'], required: true },
  maxParticipants: { type: Number, required: true },
  currentParticipants: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  organizer: { type: String, required: true },
  image: { type: String },
  featured: { type: Boolean, default: false },
  registeredUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema); 