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
    id: 'u1',
    name: 'You',
    age: 28,
    lastActive: '2 hours ago',
    compatibilityScore: 92,
    photos: ['https://randomuser.me/api/portraits/men/1.jpg'],
    location: 'Mumbai',
    education: 'Graduate',
    profession: 'Software',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: 'u2',
    name: 'Priya Sharma',
    age: 26,
    lastActive: '10 minutes ago',
    compatibilityScore: 88,
    photos: ['https://randomuser.me/api/portraits/women/1.jpg'],
    location: 'Delhi',
    education: 'Post Graduate',
    profession: 'Business',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
  },
  {
    id: 'u3',
    name: 'Rahul Verma',
    age: 30,
    lastActive: '1 day ago',
    compatibilityScore: 85,
    photos: ['https://randomuser.me/api/portraits/men/2.jpg'],
    location: 'Bangalore',
    education: 'Professional',
    profession: 'Healthcare',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
  }
];

export const adminStats = {
  totalUsers: 1200,
  activeUsers: 950,
  matchesMade: 320,
  eventsHosted: 12,
  revenue: 150000,
  newRegistrations: 45,
  feedbackScore: 4.7
}; 