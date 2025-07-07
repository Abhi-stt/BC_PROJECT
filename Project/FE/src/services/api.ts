import axios from 'axios';

const API_BASE_URL = 'https://bc-project.onrender.com/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
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
      // Mock authentication for demo purposes
      const mockUser = {
        id: '1',
        email,
        name: email === 'admin@bandhan.com' ? 'Admin User' : 'Demo User',
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
  }
};

export default api; 