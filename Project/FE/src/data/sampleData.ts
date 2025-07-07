export const sampleUsers = [
  {
    id: '1',
    name: 'Priya Sharma',
    age: 26,
    location: 'Mumbai, Maharashtra',
    education: 'MBA from IIM Bangalore',
    profession: 'Software Engineer',
    religion: 'Hindu',
    interests: ['Reading', 'Traveling', 'Yoga', 'Cooking', 'Photography', 'Music'],
    bio: 'Looking for a life partner who values family, has a good sense of humor, and is passionate about their career. I believe in balancing traditional values with modern thinking.',
    photos: [
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    compatibilityScore: 95,
    verificationStatus: 'verified',
    lastActive: '2 hours ago'
  },
  {
    id: '2',
    name: 'Ananya Patel',
    age: 28,
    location: 'Ahmedabad, Gujarat',
    education: 'B.Tech Computer Science',
    profession: 'Product Manager',
    religion: 'Hindu',
    interests: ['Dancing', 'Photography', 'Fitness', 'Movies', 'Travel', 'Art'],
    bio: 'Family-oriented person who loves to explore new places and try different cuisines. Looking for someone who shares similar values and dreams.',
    photos: [
      'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    compatibilityScore: 89,
    verificationStatus: 'verified',
    lastActive: '1 day ago'
  },
  {
    id: '3',
    name: 'Kavya Reddy',
    age: 25,
    location: 'Hyderabad, Telangana',
    education: 'M.Com from Osmania University',
    profession: 'Financial Analyst',
    religion: 'Hindu',
    interests: ['Music', 'Gardening', 'Cooking', 'Travel', 'Books', 'Yoga'],
    bio: 'Seeking a genuine connection with someone who shares similar values and dreams. I believe in the importance of family and building a strong foundation together.',
    photos: [
      'https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    compatibilityScore: 92,
    verificationStatus: 'verified',
    lastActive: '3 hours ago'
  },
  {
    id: '4',
    name: 'Riya Gupta',
    age: 27,
    location: 'Delhi, NCR',
    education: 'Masters in Psychology',
    profession: 'Clinical Psychologist',
    religion: 'Hindu',
    interests: ['Art', 'Psychology', 'Meditation', 'Books', 'Nature', 'Wellness'],
    bio: 'Believe in the power of understanding and communication in relationships. Looking for a partner who values emotional intelligence and personal growth.',
    photos: [
      'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1462980/pexels-photo-1462980.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    compatibilityScore: 88,
    verificationStatus: 'verified',
    lastActive: '5 hours ago'
  },
  {
    id: '5',
    name: 'Sneha Joshi',
    age: 29,
    location: 'Pune, Maharashtra',
    education: 'B.Sc Biotechnology',
    profession: 'Research Scientist',
    religion: 'Hindu',
    interests: ['Science', 'Nature', 'Hiking', 'Reading', 'Environmental Conservation', 'Technology'],
    bio: 'Passionate about science and nature, looking for someone who appreciates life\'s simple pleasures and shares a curiosity about the world around us.',
    photos: [
      'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1845534/pexels-photo-1845534.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    compatibilityScore: 85,
    verificationStatus: 'verified',
    lastActive: '1 hour ago'
  },
  {
    id: '6',
    name: 'Meera Singh',
    age: 24,
    location: 'Bangalore, Karnataka',
    education: 'B.Des Fashion Design',
    profession: 'Fashion Designer',
    religion: 'Hindu',
    interests: ['Fashion', 'Art', 'Travel', 'Culture', 'Design', 'Photography'],
    bio: 'Creative soul with a passion for fashion and design. Looking for someone who appreciates art, culture, and has a zest for life.',
    photos: [
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    compatibilityScore: 91,
    verificationStatus: 'verified',
    lastActive: '30 minutes ago'
  }
];

export const sampleMessages = [
  {
    id: '1',
    senderId: '1',
    receiverId: 'currentUser',
    message: 'Hi! I noticed we have a lot in common. Would love to chat!',
    timestamp: '2024-01-15T10:30:00Z',
    isRead: false
  },
  {
    id: '2',
    senderId: 'currentUser',
    receiverId: '1',
    message: 'Hello! Yes, I saw your profile and you seem very interesting. I love that you\'re into yoga too!',
    timestamp: '2024-01-15T11:15:00Z',
    isRead: true
  },
  {
    id: '3',
    senderId: '1',
    receiverId: 'currentUser',
    message: 'That\'s wonderful! I\'ve been practicing yoga for about 3 years now. It really helps me stay centered. What got you into it?',
    timestamp: '2024-01-15T11:45:00Z',
    isRead: false
  },
  {
    id: '4',
    senderId: '2',
    receiverId: 'currentUser',
    message: 'Hi there! I love your photography. Do you do it professionally or just as a hobby?',
    timestamp: '2024-01-15T09:20:00Z',
    isRead: true
  },
  {
    id: '5',
    senderId: '3',
    receiverId: 'currentUser',
    message: 'Hello! I see you\'re also from Hyderabad. Would you like to meet for coffee sometime?',
    timestamp: '2024-01-14T16:30:00Z',
    isRead: true
  },
  {
    id: '6',
    senderId: 'currentUser',
    receiverId: '2',
    message: 'Thank you! Photography is my passion. I do it professionally but also love capturing candid moments. Your dance videos are amazing!',
    timestamp: '2024-01-15T12:00:00Z',
    isRead: false
  },
  {
    id: '7',
    senderId: '4',
    receiverId: 'currentUser',
    message: 'I really appreciate your perspective on emotional intelligence. It\'s so important in relationships.',
    timestamp: '2024-01-15T14:20:00Z',
    isRead: false
  },
  {
    id: '8',
    senderId: 'currentUser',
    receiverId: '3',
    message: 'That sounds lovely! I know a great café in Banjara Hills. When would be good for you?',
    timestamp: '2024-01-14T17:15:00Z',
    isRead: true
  },
  {
    id: '9',
    senderId: '5',
    receiverId: 'currentUser',
    message: 'Hi! I saw you\'re interested in science too. Have you been to the new science museum in Pune?',
    timestamp: '2024-01-15T16:30:00Z',
    isRead: false
  },
  {
    id: '10',
    senderId: 'currentUser',
    receiverId: '5',
    message: 'No, I haven\'t been there yet! I\'ve heard great things about it. What\'s your favorite exhibit?',
    timestamp: '2024-01-15T16:45:00Z',
    isRead: false
  },
  {
    id: '11',
    senderId: '5',
    receiverId: 'currentUser',
    message: 'The space exploration section is incredible! They have a real Mars rover replica.',
    timestamp: '2024-01-15T17:00:00Z',
    isRead: false
  },
  {
    id: '12',
    senderId: '6',
    receiverId: 'currentUser',
    message: 'Your fashion sense is incredible! I love how you style traditional wear with modern touches.',
    timestamp: '2024-01-15T13:45:00Z',
    isRead: true
  },
  {
    id: '13',
    senderId: 'currentUser',
    receiverId: '6',
    message: 'Thank you so much! I love experimenting with fusion fashion. Your designs are stunning too!',
    timestamp: '2024-01-15T14:00:00Z',
    isRead: true
  },
  {
    id: '14',
    senderId: '7',
    receiverId: 'currentUser',
    message: 'The weather is perfect for a weekend getaway! Any plans?',
    timestamp: '2024-01-15T10:20:00Z',
    isRead: false
  },
  {
    id: '15',
    senderId: 'currentUser',
    receiverId: '7',
    message: 'I was thinking of going to Lonavala! The monsoon views are breathtaking.',
    timestamp: '2024-01-15T10:35:00Z',
    isRead: false
  },
  {
    id: '16',
    senderId: '8',
    receiverId: 'currentUser',
    message: 'Thanks for the restaurant recommendation! The butter chicken was amazing 😊',
    timestamp: '2024-01-14T20:15:00Z',
    isRead: true
  },
  {
    id: '17',
    senderId: 'currentUser',
    receiverId: '8',
    message: 'You\'re welcome! I\'m glad you enjoyed it. Their naan is the best in the city!',
    timestamp: '2024-01-14T20:30:00Z',
    isRead: true
  },
  {
    id: '18',
    senderId: '8',
    receiverId: 'currentUser',
    message: 'Definitely! We should go there together sometime. I\'d love to try more of their menu.',
    timestamp: '2024-01-14T20:45:00Z',
    isRead: true
  },
  // Additional messages for more realistic conversations
  {
    id: '19',
    senderId: 'currentUser',
    receiverId: '1',
    message: 'I started yoga about 2 years ago to manage stress from work. It\'s been life-changing!',
    timestamp: '2024-01-15T12:00:00Z',
    isRead: true
  },
  {
    id: '20',
    senderId: '1',
    receiverId: 'currentUser',
    message: 'That\'s exactly why I started too! What\'s your favorite asana?',
    timestamp: '2024-01-15T12:15:00Z',
    isRead: false
  },
  {
    id: '21',
    senderId: 'currentUser',
    receiverId: '2',
    message: 'I love street photography the most. There\'s something magical about capturing everyday moments.',
    timestamp: '2024-01-15T12:30:00Z',
    isRead: false
  },
  {
    id: '22',
    senderId: '2',
    receiverId: 'currentUser',
    message: 'That\'s beautiful! I\'d love to see some of your work sometime.',
    timestamp: '2024-01-15T12:45:00Z',
    isRead: false
  },
  {
    id: '23',
    senderId: 'currentUser',
    receiverId: '3',
    message: 'How about this Saturday at 3 PM? The café has amazing filter coffee.',
    timestamp: '2024-01-14T17:30:00Z',
    isRead: true
  },
  {
    id: '24',
    senderId: '3',
    receiverId: 'currentUser',
    message: 'Perfect! I love filter coffee. See you there! ☕',
    timestamp: '2024-01-14T17:45:00Z',
    isRead: true
  },
  {
    id: '25',
    senderId: 'currentUser',
    receiverId: '4',
    message: 'Thank you! I believe emotional intelligence is the foundation of any strong relationship.',
    timestamp: '2024-01-15T14:30:00Z',
    isRead: false
  },
  {
    id: '26',
    senderId: '4',
    receiverId: 'currentUser',
    message: 'Absolutely! Would you be interested in discussing this more over coffee?',
    timestamp: '2024-01-15T14:45:00Z',
    isRead: false
  }
];

export const sampleConversations = [
  {
    userId: '1',
    userName: 'Priya Sharma',
    userPhoto: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    lastMessage: 'That\'s wonderful! I\'ve been practicing yoga for about 3 years now...',
    timestamp: '2024-01-15T11:45:00Z',
    unreadCount: 2,
    isOnline: true
  },
  {
    userId: '2',
    userName: 'Ananya Patel',
    userPhoto: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
    lastMessage: 'Thank you! Photography is my passion. I do it professionally...',
    timestamp: '2024-01-15T12:00:00Z',
    unreadCount: 0,
    isOnline: false
  },
  {
    userId: '3',
    userName: 'Kavya Reddy',
    userPhoto: 'https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&w=400',
    lastMessage: 'That sounds lovely! I know a great café in Banjara Hills...',
    timestamp: '2024-01-14T17:15:00Z',
    unreadCount: 0,
    isOnline: true
  },
  {
    userId: '4',
    userName: 'Riya Gupta',
    userPhoto: 'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=400',
    lastMessage: 'I really appreciate your perspective on emotional intelligence...',
    timestamp: '2024-01-15T14:20:00Z',
    unreadCount: 1,
    isOnline: false
  },
  {
    userId: '5',
    userName: 'Sneha Joshi',
    userPhoto: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=400',
    lastMessage: 'Have you been to the new science museum in Pune? It\'s amazing!',
    timestamp: '2024-01-15T16:30:00Z',
    unreadCount: 3,
    isOnline: true
  },
  {
    userId: '6',
    userName: 'Meera Singh',
    userPhoto: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    lastMessage: 'Your fashion sense is incredible! Would love to collaborate on something.',
    timestamp: '2024-01-15T13:45:00Z',
    unreadCount: 0,
    isOnline: false
  },
  {
    userId: '7',
    userName: 'Aditi Verma',
    userPhoto: 'https://images.pexels.com/photos/1462980/pexels-photo-1462980.jpeg?auto=compress&cs=tinysrgb&w=400',
    lastMessage: 'The weather is perfect for a weekend getaway! Any plans?',
    timestamp: '2024-01-15T10:20:00Z',
    unreadCount: 1,
    isOnline: true
  },
  {
    userId: '8',
    userName: 'Pooja Desai',
    userPhoto: 'https://images.pexels.com/photos/1845534/pexels-photo-1845534.jpeg?auto=compress&cs=tinysrgb&w=400',
    lastMessage: 'Thanks for the restaurant recommendation! It was delicious 😊',
    timestamp: '2024-01-14T20:15:00Z',
    unreadCount: 0,
    isOnline: false
  }
];

export const adminStats = {
  totalUsers: 125430,
  verifiedUsers: 98234,
  activeUsers: 45623,
  newRegistrations: 234,
  pendingVerifications: 567,
  reportedProfiles: 23,
  successfulMatches: 8934,
  premiumUsers: 12543,
  monthlyRevenue: 2450000,
  conversionRate: 8.5,
  averageSessionTime: 18.5,
  userRetentionRate: 76.3
};

export const timelineEvents = [
  {
    id: '1',
    title: 'Profile Created',
    description: 'Welcome to BandhanConnect! Your journey begins here.',
    date: '2024-01-01',
    type: 'milestone',
    status: 'completed',
    photos: [],
    participants: ['You'],
    isPrivate: false
  },
  {
    id: '2',
    title: 'Profile Verified',
    description: 'Your profile has been successfully verified with Aadhaar.',
    date: '2024-01-02',
    type: 'milestone',
    status: 'completed',
    photos: [],
    participants: ['You'],
    isPrivate: false
  },
  {
    id: '3',
    title: 'First Match',
    description: 'Congratulations! You received your first match.',
    date: '2024-01-05',
    type: 'milestone',
    status: 'completed',
    photos: [],
    participants: ['You', 'Priya Sharma'],
    isPrivate: false
  }
];

export const communityPosts = [
  {
    id: '1',
    author: {
      name: 'Rajesh Kumar',
      photo: 'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true
    },
    content: 'Just wanted to share some advice for first meetings - always meet in a public place and let your family know where you are. Safety first! 🙏',
    timestamp: '2 hours ago',
    likes: 24,
    comments: 8,
    shares: 3,
    liked: false,
    type: 'advice'
  },
  {
    id: '2',
    author: {
      name: 'Priya Patel',
      photo: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true
    },
    content: 'Celebrating 6 months since we found each other on BandhanConnect! Thank you to this amazing community for all the support. ❤️',
    image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400',
    timestamp: '5 hours ago',
    likes: 156,
    comments: 23,
    shares: 12,
    liked: true,
    type: 'success_story'
  }
];

export const eventsList = [
  {
    id: '1',
    title: 'Virtual Speed Networking - Mumbai',
    description: 'Meet 8-10 potential matches in structured 5-minute conversations. Perfect for busy professionals!',
    date: '2024-02-10',
    time: '19:00',
    location: 'Virtual Event',
    type: 'virtual',
    category: 'networking',
    maxParticipants: 50,
    currentParticipants: 42,
    price: 299,
    organizer: 'BandhanConnect Team',
    image: 'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=400',
    featured: true
  },
  {
    id: '2',
    title: 'Cultural Heritage Workshop',
    description: 'Explore different Indian cultural traditions and their role in modern relationships.',
    date: '2024-02-15',
    time: '15:00',
    location: 'Cultural Center, Delhi',
    type: 'in-person',
    category: 'cultural',
    maxParticipants: 30,
    currentParticipants: 18,
    price: 499,
    organizer: 'Cultural Heritage Foundation',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
    featured: false
  }
];

export const weddingServices = [
  {
    id: '1',
    name: 'Royal Wedding Photography',
    category: 'photography',
    description: 'Capturing your special moments with artistic excellence. Specializing in traditional and contemporary wedding photography.',
    rating: 4.9,
    reviews: 156,
    priceRange: '₹50,000 - ₹2,00,000',
    location: 'Mumbai, Delhi, Bangalore',
    image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    featured: true,
    contact: {
      phone: '+91 98765 43210',
      email: 'info@royalweddingphoto.com'
    },
    services: ['Pre-wedding Shoot', 'Wedding Day Photography', 'Reception Coverage', 'Album Design']
  },
  {
    id: '2',
    name: 'Melodious Moments',
    category: 'music',
    description: 'Professional musicians and DJs for all your wedding celebrations. From classical to contemporary music.',
    rating: 4.7,
    reviews: 89,
    priceRange: '₹25,000 - ₹1,50,000',
    location: 'Delhi, Gurgaon, Noida',
    image: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    featured: false,
    contact: {
      phone: '+91 87654 32109',
      email: 'bookings@melodiousmoments.com'
    },
    services: ['Live Band', 'DJ Services', 'Sound System', 'Traditional Musicians']
  }
];