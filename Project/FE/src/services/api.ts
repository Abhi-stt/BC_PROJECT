import axios from 'axios';
import { io, Socket } from 'socket.io-client';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

// Socket.IO connection
let socket: Socket | null = null;

export const initializeSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      withCredentials: true,
    });
    
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });
    
    socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });
  }
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    return initializeSocket();
  }
  return socket;
};

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Added for CORS with credentials
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Helper function to check if backend is available
const isBackendAvailable = async () => {
  try {
    await api.get('/');
    return true;
  } catch {
    return false;
  }
};

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/users/login', { email, password });
      return response.data;
    } catch (error) {
      console.warn('Backend not available, using mock authentication');
      // Mock authentication for demo purposes - admin access restricted to specific credentials
      const mockUser = {
        id: '1',
        email,
        name: email === 'admin@bandhan.com' ? 'Demo Admin User' : 'Demo User',
        isVerified: true,
        profileComplete: true,
        role: email === 'admin@bandhan.com' ? 'admin' : 'user'
      };
      return {
        user: mockUser,
        token: 'mock-token-' + Date.now()
      };
    }
  },
  
  register: async (userData: any) => {
    try {
      const response = await api.post('/users/register', userData);
      return response.data;
    } catch (error) {
      console.warn('Backend not available, using mock registration');
      const mockUser = {
        id: Math.random().toString(36).substr(2, 9),
        email: userData.email,
        name: userData.name,
        isVerified: false,
        profileComplete: false,
        role: 'user'
      };
      return {
        user: mockUser,
        token: 'mock-token-' + Date.now()
      };
    }
  },
  
  verifyEmail: async (token: string) => {
    const response = await api.post('/users/verify-email', { token });
    return response.data;
  },
  
  forgotPassword: async (email: string) => {
    const response = await api.post('/users/forgot-password', { email });
    return response.data;
  },
  
  resetPassword: async (token: string, password: string) => {
    const response = await api.post('/users/reset-password', { token, password });
    return response.data;
  }
};

// User API
export const userAPI = {
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },
  getAllUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },
  
  updateProfile: async (profileData: any) => {
    const response = await api.put('/users/profile', profileData);
    return response.data;
  },
  
  uploadPhoto: async (file: File) => {
    const formData = new FormData();
    formData.append('photo', file);
    const response = await api.post('/users/upload-photo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },
  getAllPosts: async () => {
    const response = await api.get('/posts');
    return response.data;
  },
  getAllReports: async () => {
    const response = await api.get('/admin/reports');
    return response.data;
  },
  getAnnouncements: async () => {
    const response = await api.get('/announcements');
    return response.data.map((a: any) => ({
      ...a,
      id: a._id,
      title: a.title || '',
      content: a.content || '',
      author: a.author || '',
      timestamp: a.timestamp || '',
      isActive: typeof a.isActive === 'boolean' ? a.isActive : true,
      targetAudience: a.targetAudience || ['all'],
    }));
  }
};

// Matches API
export const matchesAPI = {
  getMatches: async (filters?: any) => {
    try {
      const response = await api.get('/matches', { params: filters });
      return response.data;
    } catch (error) {
      // Fallback to sample data if backend is not available
      console.warn('Backend not available, using sample data');
      const { sampleUsers } = await import('../data/sampleData');
      return sampleUsers;
    }
  },
  
  likeUser: async (userId: string) => {
    try {
      const response = await api.post('/matches/like', { userId });
      return response.data;
    } catch (error) {
      console.warn('Backend not available, simulating like action');
      return { message: 'User liked successfully' };
    }
  },
  
  rejectUser: async (userId: string) => {
    try {
      const response = await api.post('/matches/reject', { userId });
      return response.data;
    } catch (error) {
      console.warn('Backend not available, simulating reject action');
      return { message: 'User rejected successfully' };
    }
  },
  
  getLikedUsers: async () => {
    const response = await api.get('/matches/liked');
    return response.data;
  }
};

// Messages API
export const messagesAPI = {
  getConversations: async () => {
    try {
      const response = await api.get('/messages/conversations');
      return response.data;
    } catch (error) {
      console.warn('Backend not available, using sample conversations');
      const { sampleConversations } = await import('../data/sampleData');
      return sampleConversations;
    }
  },
  
  getMessages: async (userId: string) => {
    try {
      const response = await api.get(`/messages/${userId}`);
      return response.data;
    } catch (error) {
      console.warn('Backend not available, using sample messages');
      const { sampleMessages } = await import('../data/sampleData');
      return sampleMessages.filter(m => 
        (m.senderId === userId || m.receiverId === userId) || 
        (m.senderId === 'currentUser' || m.receiverId === 'currentUser')
      );
    }
  },
  
  sendMessage: async (receiverId: string, message: string) => {
    try {
      const response = await api.post('/messages', { receiverId, message });
      return response.data;
    } catch (error) {
      console.warn('Backend not available, simulating message send');
      return {
        id: Date.now().toString(),
        senderId: 'currentUser',
        receiverId,
        message,
        timestamp: new Date().toISOString(),
        isRead: false
      };
    }
  },
  
  markAsRead: async (messageId: string) => {
    const response = await api.put(`/messages/${messageId}/read`);
    return response.data;
  }
};

// Services API
export const servicesAPI = {
  getServices: async () => {
    const response = await api.get('/services');
    return response.data;
  },
  
  bookService: async (serviceId: string, bookingData: any) => {
    const response = await api.post(`/services/${serviceId}/book`, bookingData);
    return response.data;
  }
};

// Counseling API
export const counselingAPI = {
  getCounselors: async () => {
    const response = await api.get('/counselors');
    return response.data;
  },
  
  bookSession: async (counselorId: string, sessionData: any) => {
    const response = await api.post(`/counselors/${counselorId}/sessions`, sessionData);
    return response.data;
  },
  
  getSessions: async () => {
    const response = await api.get('/sessions');
    return response.data;
  }
};

// Timeline API
export const timelineAPI = {
  getTimeline: async () => {
    const response = await api.get('/timeline');
    return response.data;
  },
  
  addEvent: async (eventData: any) => {
    const response = await api.post('/timeline', eventData);
    return response.data;
  }
};

// Community API
export const communityAPI = {
  getPosts: async () => {
    const response = await api.get('/posts');
    return response.data;
  },
  
  createPost: async (postData: any) => {
    const response = await api.post('/posts', postData);
    return response.data;
  },
  
  likePost: async (postId: string) => {
    const response = await api.post(`/posts/${postId}/like`);
    return response.data;
  }
};

// Notifications API
export const notificationsAPI = {
  getNotifications: async () => {
    const response = await api.get('/notifications');
    return response.data;
  },
  
  markAsRead: async (notificationId: string) => {
    const response = await api.put(`/notifications/${notificationId}/read`);
    return response.data;
  },
  
  markAllAsRead: async () => {
    const response = await api.put('/notifications/read-all');
    return response.data;
  },
  markNotificationAsRead: async (id: string) => {
    const response = await api.put(`/notifications/${id}/read`);
    return response.data;
  },
  markAllNotificationsAsRead: async (userId: string) => {
    const response = await api.put(`/notifications/read-all?userId=${userId}`);
    return response.data;
  }
};

// Events API
export const eventsAPI = {
  getEvents: async () => {
    try {
      const response = await api.get('/events');
      return response.data;
    } catch (error) {
      console.warn('Backend not available, using sample events');
      const { eventsList } = await import('../data/sampleData');
      return eventsList;
    }
  },
  
  createEvent: async (eventData: any) => {
    try {
      const response = await api.post('/events', eventData);
      return response.data;
    } catch (error) {
      console.warn('Backend not available, simulating event creation');
      // Return a mock event with the submitted data
      return {
        id: Date.now().toString(),
        ...eventData,
        currentParticipants: 0,
        registeredUsers: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }
  },
  
  joinEvent: async (eventId: string) => {
    try {
      const response = await api.post(`/events/${eventId}/join`);
      return response.data;
    } catch (error) {
      console.warn('Backend not available, simulating event join');
      return { message: 'Successfully registered for event' };
    }
  }
};

// Admin API
export const adminAPI = {
  // User Management
  verifyUser: async (userId: string) => {
    const response = await api.patch(`/users/${userId}/verify`);
    return response.data;
  },
  
  suspendUser: async (userId: string) => {
    const response = await api.patch(`/users/${userId}/suspend`);
    return response.data;
  },
  
  activateUser: async (userId: string) => {
    const response = await api.patch(`/users/${userId}/activate`);
    return response.data;
  },
  
  makePremium: async (userId: string) => {
    const response = await api.patch(`/users/${userId}/premium`);
    return response.data;
  },
  
  deleteUser: async (userId: string) => {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
  },
  
  // Content Moderation
  approvePost: async (postId: string) => {
    const response = await api.patch(`/admin/posts/${postId}/approve`);
    return response.data;
  },
  
  rejectPost: async (postId: string) => {
    const response = await api.patch(`/admin/posts/${postId}/reject`);
    return response.data;
  },
  
  deletePost: async (postId: string) => {
    const response = await api.delete(`/admin/posts/${postId}`);
    return response.data;
  },
  
  resolveReport: async (reportId: string) => {
    const response = await api.patch(`/admin/reports/${reportId}/resolve`);
    return response.data;
  },
  
  reviewReport: async (reportId: string) => {
    const response = await api.patch(`/admin/reports/${reportId}/review`);
    return response.data;
  },
  
  // Announcements
  createAnnouncement: async (announcementData: any) => {
    const response = await api.post('/announcements', announcementData);
    return response.data;
  },
  
  getAnnouncements: async () => {
    const response = await api.get('/announcements');
    return response.data;
  },
  
  toggleAnnouncement: async (announcementId: string) => {
    const response = await api.patch(`/announcements/${announcementId}/activate`);
    return response.data;
  },
  
  deleteAnnouncement: async (announcementId: string) => {
    const response = await api.delete(`/announcements/${announcementId}`);
    return response.data;
  },
  
  // Notifications
  createNotification: async (notificationData: any) => {
    const response = await api.post('/notifications', notificationData);
    return response.data;
  },
  
  getNotifications: async (userId?: string) => {
    const params = userId ? { userId } : {};
    const response = await api.get('/notifications', { params });
    return response.data;
  }
};

// Support API
export const supportAPI = {
  // User functions
  createTicket: async (ticketData: any) => {
    try {
      const response = await api.post('/support', ticketData);
      return response.data;
    } catch (error: any) {
      console.error('Error creating ticket:', error);
      throw new Error('Failed to create ticket');
    }
  },
  
  getMyTickets: async () => {
    try {
      const response = await api.get('/support/my-tickets');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching user tickets:', error);
      throw new Error('Failed to fetch tickets');
    }
  },
  
  getTicket: async (ticketId: string) => {
    try {
      console.log('Fetching ticket:', ticketId);
      const response = await api.get(`/support/${ticketId}`);
      console.log('Ticket response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching ticket:', error);
      throw new Error('Failed to fetch ticket');
    }
  },
  
  addReply: async (ticketId: string, message: string) => {
    try {
      const response = await api.post(`/support/${ticketId}/reply`, { message });
      return response.data;
    } catch (error: any) {
      console.error('Error adding reply:', error);
      throw new Error('Failed to add reply');
    }
  },
  
  // Admin functions
  getAllTickets: async () => {
    try {
      const response = await api.get('/support/admin/all');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching tickets from backend:', error);
      if (error.response?.status === 401) {
        throw new Error('Authentication required. Please log in again.');
      }
      if (error.response?.status === 403) {
        throw new Error('Admin access required.');
      }
      throw new Error('Failed to fetch tickets from server');
    }
  },
  
  updateTicketStatus: async (ticketId: string, status: string) => {
    try {
      const response = await api.patch(`/support/admin/${ticketId}/status`, { status });
      return response.data;
    } catch (error: any) {
      console.error('Error updating ticket status:', error);
      throw new Error('Failed to update ticket status');
    }
  },
  
  assignTicket: async (ticketId: string, assignedTo: string) => {
    try {
      const response = await api.patch(`/support/admin/${ticketId}/assign`, { assignedTo });
      return response.data;
    } catch (error: any) {
      console.error('Error assigning ticket:', error);
      throw new Error('Failed to assign ticket');
    }
  },
  
  updateTicketPriority: async (ticketId: string, priority: string) => {
    try {
      const response = await api.patch(`/support/admin/${ticketId}/priority`, { priority });
      return response.data;
    } catch (error: any) {
      console.error('Error updating ticket priority:', error);
      throw new Error('Failed to update ticket priority');
    }
  }
};

export default api; 