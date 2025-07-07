const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./user.schema');

// Connect to MongoDB
mongoose.connect('mongodb+srv://abhi:abhi%40123@cluster.zvjlqyq.mongodb.net/bandhaconnect?retryWrites=true&w=majority&appName=Cluster', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const sampleUsers = [
  {
    email: 'priya@example.com',
    password: 'password123',
    name: 'Priya Sharma',
    age: 26,
    location: 'Mumbai, Maharashtra',
    education: 'MBA from IIM Bangalore',
    profession: 'Software Engineer',
    religion: 'Hindu',
    interests: ['Reading', 'Traveling', 'Yoga', 'Cooking', 'Photography', 'Music'],
    bio: 'Looking for a life partner who values family, has a good sense of humor, and is passionate about their career.',
    photos: [
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    isVerified: true,
    profileComplete: true,
    role: 'user'
  },
  {
    email: 'ananya@example.com',
    password: 'password123',
    name: 'Ananya Patel',
    age: 28,
    location: 'Ahmedabad, Gujarat',
    education: 'B.Tech Computer Science',
    profession: 'Product Manager',
    religion: 'Hindu',
    interests: ['Dancing', 'Photography', 'Fitness', 'Movies', 'Travel', 'Art'],
    bio: 'Family-oriented person who loves to explore new places and try different cuisines.',
    photos: [
      'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    isVerified: true,
    profileComplete: true,
    role: 'user'
  },
  {
    email: 'kavya@example.com',
    password: 'password123',
    name: 'Kavya Reddy',
    age: 25,
    location: 'Hyderabad, Telangana',
    education: 'M.Com from Osmania University',
    profession: 'Financial Analyst',
    religion: 'Hindu',
    interests: ['Music', 'Gardening', 'Cooking', 'Travel', 'Books', 'Yoga'],
    bio: 'Seeking a genuine connection with someone who shares similar values and dreams.',
    photos: [
      'https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    isVerified: true,
    profileComplete: true,
    role: 'user'
  },
  {
    email: 'riya@example.com',
    password: 'password123',
    name: 'Riya Gupta',
    age: 27,
    location: 'Delhi, NCR',
    education: 'Masters in Psychology',
    profession: 'Clinical Psychologist',
    religion: 'Hindu',
    interests: ['Art', 'Psychology', 'Meditation', 'Books', 'Nature', 'Wellness'],
    bio: 'Believe in the power of understanding and communication in relationships.',
    photos: [
      'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1462980/pexels-photo-1462980.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    isVerified: true,
    profileComplete: true,
    role: 'user'
  },
  {
    email: 'demo@bandhan.com',
    password: 'password',
    name: 'Demo User',
    age: 26,
    location: 'Mumbai, Maharashtra',
    education: 'B.Tech Computer Science',
    profession: 'Software Engineer',
    religion: 'Hindu',
    interests: ['Technology', 'Music', 'Travel', 'Reading'],
    bio: 'Demo user for testing the application.',
    photos: [
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    isVerified: true,
    profileComplete: true,
    role: 'user'
  },
  {
    email: 'admin@bandhan.com',
    password: 'password',
    name: 'Admin User',
    age: 30,
    location: 'Mumbai, Maharashtra',
    education: 'MBA',
    profession: 'Administrator',
    religion: 'Hindu',
    interests: ['Management', 'Technology', 'Business'],
    bio: 'Administrator of BandhanConnect.',
    photos: [
      'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    isVerified: true,
    profileComplete: true,
    role: 'admin'
  }
];

async function seedDatabase() {
  try {
    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Hash passwords and create users
    for (const userData of sampleUsers) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = new User({
        ...userData,
        password: hashedPassword
      });
      await user.save();
      console.log(`Created user: ${userData.name}`);
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase(); 