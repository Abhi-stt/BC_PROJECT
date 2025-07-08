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

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://your-frontend.vercel.app', // Replace with your actual Vercel URL
  // Add any other frontend URLs here
];

const app = express();

// Clean, robust CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Preflight for all routes
app.options('*', cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Log Origin header and CORS errors for debugging
app.use((req, res, next) => {
  console.log(`[CORS DEBUG] Origin: ${req.headers.origin} | Path: ${req.path}`);
  next();
});

// In the CORS middleware, add an error handler for CORS
app.use((err, req, res, next) => {
  if (err && err.message === 'Not allowed by CORS') {
    console.error(`[CORS ERROR] Blocked Origin: ${req.headers.origin} | Path: ${req.path}`);
    res.status(403).json({ error: 'CORS error: Origin not allowed' });
  } else {
    next(err);
  }
});

// CORS test endpoint
app.get('/api/cors-test', (req, res) => {
  res.json({ success: true, message: 'CORS is working!' });
});

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