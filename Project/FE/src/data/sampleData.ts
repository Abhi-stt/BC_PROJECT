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

export const sampleConversations = [
  {
    id: 'c1',
    userId: 'u2',
    userName: 'Priya Sharma',
    lastMessage: 'Looking forward to our call!',
    lastMessageTime: '2024-07-08T10:00:00Z',
    unreadCount: 2,
    userAvatar: 'https://randomuser.me/api/portraits/women/1.jpg'
  },
  {
    id: 'c2',
    userId: 'u3',
    userName: 'Rahul Verma',
    lastMessage: 'Thanks for the advice!',
    lastMessageTime: '2024-07-07T18:30:00Z',
    unreadCount: 0,
    userAvatar: 'https://randomuser.me/api/portraits/men/2.jpg'
  }
];

export const sampleMessages = [
  {
    id: 'm1',
    senderId: 'u1',
    receiverId: 'u2',
    message: 'Hi Priya! How are you?',
    timestamp: '2024-07-08T10:01:00Z',
    isRead: true
  },
  {
    id: 'm2',
    senderId: 'u2',
    receiverId: 'u1',
    message: 'I am good, thanks! Looking forward to our call.',
    timestamp: '2024-07-08T10:02:00Z',
    isRead: false
  }
];

export const sampleUsers = [
  {
    id: '64a1b2c3d4e5f6a7b8c9d0e1',
    name: 'You',
    age: 28,
    lastActive: '2 hours ago',
    compatibilityScore: 92,
    photos: ['https://randomuser.me/api/portraits/men/1.jpg'],
    location: 'Mumbai',
    education: 'Graduate',
    profession: 'Software',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    bio: 'Passionate software developer who loves coding and building meaningful applications. Looking for someone who shares similar values and goals.',
    interests: ['Technology', 'Coding', 'Travel', 'Music', 'Reading'],
    status: 'active',
    isVerified: true,
    isPremium: false,
    lastLogin: '2024-07-08T10:00:00Z',
    registrationDate: '2024-01-15T00:00:00Z',
    reportedCount: 0
  },
  {
    id: '686b98d57624046327960886', // Priya Sharma
    name: 'Priya Sharma',
    age: 26,
    lastActive: '10 minutes ago',
    compatibilityScore: 88,
    photos: ['https://randomuser.me/api/portraits/women/1.jpg'],
    location: 'Delhi',
    education: 'Post Graduate',
    profession: 'Business',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    bio: 'Business professional with a love for entrepreneurship and innovation. Enjoys networking, traveling, and exploring new cultures.',
    interests: ['Business', 'Travel', 'Networking', 'Cooking', 'Fitness'],
    status: 'active',
    isVerified: true,
    isPremium: true,
    lastLogin: '2024-07-08T09:30:00Z',
    registrationDate: '2024-02-20T00:00:00Z',
    reportedCount: 0
  },
  {
    id: '64a1b2c3d4e5f6a7b8c9d0e2',
    name: 'Rahul Verma',
    age: 30,
    lastActive: '1 day ago',
    compatibilityScore: 85,
    photos: ['https://randomuser.me/api/portraits/men/2.jpg'],
    location: 'Bangalore',
    education: 'Professional',
    profession: 'Healthcare',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    bio: 'Healthcare professional dedicated to helping others. Passionate about medicine, fitness, and making a positive impact in people\'s lives.',
    interests: ['Healthcare', 'Fitness', 'Sports', 'Reading', 'Volunteering'],
    status: 'pending',
    isVerified: false,
    isPremium: false,
    lastLogin: '2024-07-07T15:45:00Z',
    registrationDate: '2024-07-05T00:00:00Z',
    reportedCount: 0
  },
  {
    id: '64a1b2c3d4e5f6a7b8c9d0e3',
    name: 'Kavya Reddy',
    age: 24,
    lastActive: '3 days ago',
    compatibilityScore: 78,
    photos: ['https://randomuser.me/api/portraits/women/3.jpg'],
    location: 'Hyderabad',
    education: 'Graduate',
    profession: 'Software',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    bio: 'Software engineer with a passion for AI and machine learning. Loves reading sci-fi and exploring new technologies.',
    interests: ['AI/ML', 'Technology', 'Reading', 'Travel', 'Photography'],
    status: 'suspended',
    isVerified: true,
    isPremium: false,
    lastLogin: '2024-07-05T12:20:00Z',
    registrationDate: '2024-03-10T00:00:00Z',
    reportedCount: 2
  }
];

export const adminStats = {
  totalUsers: 1200,
  verifiedUsers: 980,
  activeUsers: 950,
  premiumUsers: 150,
  matchesMade: 320,
  successfulMatches: 280,
  eventsHosted: 12,
  revenue: 150000,
  newRegistrations: 45,
  pendingVerifications: 25,
  reportedProfiles: 8,
  feedbackScore: 4.7
};

export const samplePosts = [
  {
    id: 'p1',
    userId: 'u2',
    userName: 'Priya Sharma',
    userAvatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    content: 'Just had an amazing conversation with someone I met here! The platform really works!',
    type: 'success_story',
    likes: 24,
    comments: 8,
    timestamp: '2024-07-08T09:00:00Z',
    status: 'approved',
    isReported: false
  },
  {
    id: 'p2',
    userId: 'u3',
    userName: 'Rahul Verma',
    userAvatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    content: 'Looking for advice on how to approach cultural differences in relationships. Any tips?',
    type: 'advice',
    likes: 12,
    comments: 15,
    timestamp: '2024-07-07T14:30:00Z',
    status: 'pending',
    isReported: false
  },
  {
    id: 'p3',
    userId: 'u4',
    userName: 'Kavya Reddy',
    userAvatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    content: 'This is inappropriate content that should be removed.',
    type: 'general',
    likes: 0,
    comments: 0,
    timestamp: '2024-07-06T10:15:00Z',
    status: 'reported',
    isReported: true,
    reportReason: 'Inappropriate content'
  }
];

export const reportedContent = [
  {
    id: 'rc1',
    contentType: 'profile',
    contentId: 'u4',
    reportedBy: 'user@email.com',
    reason: 'Inappropriate profile content',
    status: 'pending',
    timestamp: '2024-07-08T08:00:00Z',
    description: 'Profile contains inappropriate images and content'
  },
  {
    id: 'rc2',
    contentType: 'post',
    contentId: 'p3',
    reportedBy: 'moderator@email.com',
    reason: 'Spam content',
    status: 'reviewed',
    timestamp: '2024-07-07T16:00:00Z',
    description: 'Post contains spam links and inappropriate content'
  }
];

export const pendingApprovals = [
  {
    id: 'pa1',
    type: 'event',
    title: 'Cultural Heritage Workshop',
    submittedBy: 'event.organizer@email.com',
    timestamp: '2024-07-08T07:30:00Z',
    description: 'New event submission for cultural workshop'
  },
  {
    id: 'pa2',
    type: 'success_story',
    title: 'Success Story: Priya & Rahul',
    submittedBy: 'priya.sharma@email.com',
    timestamp: '2024-07-07T18:00:00Z',
    description: 'Success story submission from matched couple'
  }
];

export const analyticsData = {
  userGrowth: [
    { month: 'Jan', users: 850, newUsers: 120 },
    { month: 'Feb', users: 920, newUsers: 70 },
    { month: 'Mar', users: 980, newUsers: 60 },
    { month: 'Apr', users: 1050, newUsers: 70 },
    { month: 'May', users: 1120, newUsers: 70 },
    { month: 'Jun', users: 1180, newUsers: 60 },
    { month: 'Jul', users: 1200, newUsers: 20 }
  ],
  geographicDistribution: [
    { city: 'Mumbai', users: 320, percentage: 26.7 },
    { city: 'Delhi', users: 280, percentage: 23.3 },
    { city: 'Bangalore', users: 240, percentage: 20.0 },
    { city: 'Hyderabad', users: 180, percentage: 15.0 },
    { city: 'Chennai', users: 120, percentage: 10.0 },
    { city: 'Others', users: 60, percentage: 5.0 }
  ],
  engagementMetrics: {
    dailyActiveUsers: 450,
    weeklyActiveUsers: 850,
    monthlyActiveUsers: 1200,
    averageSessionDuration: '12 minutes',
    messagesPerDay: 1200,
    matchesPerDay: 45,
    profileCompletionRate: 78,
    responseRate: 85
  },
  revenueData: [
    { month: 'Jan', revenue: 45000, subscriptions: 45 },
    { month: 'Feb', revenue: 52000, subscriptions: 52 },
    { month: 'Mar', revenue: 48000, subscriptions: 48 },
    { month: 'Apr', revenue: 55000, subscriptions: 55 },
    { month: 'May', revenue: 62000, subscriptions: 62 },
    { month: 'Jun', revenue: 58000, subscriptions: 58 },
    { month: 'Jul', revenue: 65000, subscriptions: 65 }
  ]
};

export const notifications = [
  {
    id: 'n1',
    type: 'announcement',
    title: 'Platform Maintenance',
    message: 'Scheduled maintenance on July 10th, 2024 from 2:00 AM to 4:00 AM IST.',
    timestamp: '2024-07-08T10:00:00Z',
    isRead: false,
    priority: 'high'
  },
  {
    id: 'n2',
    type: 'system',
    title: 'New Feature Released',
    message: 'Video calling feature is now available for premium users!',
    timestamp: '2024-07-07T15:30:00Z',
    isRead: true,
    priority: 'medium'
  },
  {
    id: 'n3',
    type: 'user',
    title: 'Profile Verification',
    message: 'Your profile has been verified successfully.',
    timestamp: '2024-07-06T09:15:00Z',
    isRead: true,
    priority: 'low'
  }
];

export const announcements = [
  {
    id: 'a1',
    title: 'Welcome to BandhaConnect!',
    content: 'We are excited to announce the launch of our new platform. Join us in building meaningful connections.',
    author: 'Admin Team',
    timestamp: '2024-07-01T00:00:00Z',
    isActive: true,
    targetAudience: 'all'
  },
  {
    id: 'a2',
    title: 'Premium Features Now Available',
    content: 'Unlock advanced features like unlimited messaging, video calls, and priority support with our premium subscription.',
    author: 'Admin Team',
    timestamp: '2024-06-25T00:00:00Z',
    isActive: true,
    targetAudience: 'free_users'
  }
];

export const sampleVendorPackages = [
  {
    id: '1',
    title: 'Basic Wedding Package',
    description: 'Essential wedding services including photography and basic decoration',
    price: 50000,
    isActive: true
  },
  {
    id: '2',
    title: 'Premium Wedding Package',
    description: 'Complete wedding services with premium photography, decoration, and catering',
    price: 150000,
    isActive: true
  }
];

export const sampleVendorLeads = [
  {
    id: '1',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    phone: '+91 98765 43210',
    service: 'Wedding Photography',
    message: 'Looking for wedding photography services for my wedding in December',
    status: 'new',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Rahul Patel',
    email: 'rahul@example.com',
    phone: '+91 87654 32109',
    service: 'Wedding Decoration',
    message: 'Need decoration services for reception venue',
    status: 'contacted',
    createdAt: '2024-01-14T15:45:00Z'
  }
];

export const sampleVendorQueries = [
  {
    id: '1',
    from: 'amit@example.com',
    subject: 'Wedding Photography Inquiry',
    message: 'Hi, I would like to know more about your wedding photography packages and availability.',
    status: 'unread',
    createdAt: '2024-01-15T09:00:00Z'
  }
];