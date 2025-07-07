const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import routers
const userRoutes = require('./routes/user.routes');
const matchRoutes = require('./routes/match.routes');
const messageRoutes = require('./routes/message.routes');
const timelineEventRoutes = require('./routes/timelineEvent.routes');
const taskRoutes = require('./routes/task.routes');
const budgetRoutes = require('./routes/budget.routes');
const serviceRoutes = require('./routes/service.routes');
const eventRoutes = require('./routes/event.routes');
const counselorRoutes = require('./routes/counselor.routes');
const sessionRoutes = require('./routes/session.routes');
const postRoutes = require('./routes/post.routes');
const successStoryRoutes = require('./routes/successStory.routes');
const notificationRoutes = require('./routes/notification.routes');

const app = express();

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173', // Vite dev server
  credentials: true
}));

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://abhi:abhi%40123@cluster.zvjlqyq.mongodb.net/bandhaconnect?retryWrites=true&w=majority&appName=Cluster', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Mount routers
app.use('/api/users', userRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/timeline', timelineEventRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/counselors', counselorRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/success-stories', successStoryRoutes);
app.use('/api/notifications', notificationRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('BandhaConnect API is running');
});

// Start server if run directly
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app; 