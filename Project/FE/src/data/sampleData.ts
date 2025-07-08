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
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: 'u2',
    name: 'Priya Sharma',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
  },
  {
    id: 'u3',
    name: 'Rahul Verma',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
  }
]; 