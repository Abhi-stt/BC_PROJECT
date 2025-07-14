import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Heart, 
  Clock, 
  Users, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  LogOut,
  Plus,
  Edit,
  Eye,
  Star,
  Calendar,
  DollarSign,
  CheckCircle,
  X,
  Video,
  Phone,
  MapPin
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  sessionType: 'online' | 'offline' | 'both';
}

interface CounselingRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  issue: string;
  preferredTime: string;
  sessionType: 'online' | 'offline';
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  createdAt: string;
}

interface Session {
  id: string;
  userId: string;
  userName: string;
  date: string;
  time: string;
  duration: number;
  sessionType: 'online' | 'offline';
  status: 'scheduled' | 'completed' | 'cancelled';
  notes: string;
  rating?: number;
  feedback?: string;
}

const CounselorDashboard: React.FC = () => {
  const { counselorId } = useParams<{ counselorId: string }>();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showTimeSlotForm, setShowTimeSlotForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Profile state
  const [profile, setProfile] = useState({
    name: '',
    specialization: '',
    experience: 0,
    counselingMethods: [] as string[],
    availableCities: [] as string[],
    sessionFees: 0,
    description: '',
    phone: '',
    email: '',
    rating: 0,
    totalSessions: 0,
    isVerified: false
  });

  // Time slots state
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    {
      id: '1',
      day: 'Monday',
      startTime: '09:00',
      endTime: '17:00',
      isAvailable: true,
      sessionType: 'both'
    },
    {
      id: '2',
      day: 'Tuesday',
      startTime: '10:00',
      endTime: '18:00',
      isAvailable: true,
      sessionType: 'online'
    },
    {
      id: '3',
      day: 'Wednesday',
      startTime: '09:00',
      endTime: '17:00',
      isAvailable: true,
      sessionType: 'offline'
    }
  ]);

  // Counseling requests state
  const [counselingRequests, setCounselingRequests] = useState<CounselingRequest[]>([
    {
      id: '1',
      userId: 'user1',
      userName: 'Priya Sharma',
      userEmail: 'priya@example.com',
      userPhone: '+91 98765 43210',
      issue: 'Pre-marital counseling needed for communication issues',
      preferredTime: '2024-01-20T14:00:00Z',
      sessionType: 'online',
      status: 'pending',
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Rahul Patel',
      userEmail: 'rahul@example.com',
      userPhone: '+91 87654 32109',
      issue: 'Post-marital counseling for relationship conflicts',
      preferredTime: '2024-01-21T16:00:00Z',
      sessionType: 'offline',
      status: 'accepted',
      createdAt: '2024-01-14T15:45:00Z'
    }
  ]);

  // Sessions state
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: '1',
      userId: 'user1',
      userName: 'Priya Sharma',
      date: '2024-01-20',
      time: '14:00',
      duration: 60,
      sessionType: 'online',
      status: 'scheduled',
      notes: 'First session - communication issues'
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Rahul Patel',
      date: '2024-01-21',
      time: '16:00',
      duration: 90,
      sessionType: 'offline',
      status: 'completed',
      notes: 'Relationship conflict resolution',
      rating: 5,
      feedback: 'Very helpful session, learned a lot about communication'
    }
  ]);

  // Analytics state
  const [analytics, setAnalytics] = useState({
    totalSessions: 45,
    completedSessions: 42,
    totalRequests: 28,
    averageRating: 4.8,
    totalEarnings: 67500,
    monthlyGrowth: 12
  });

  useEffect(() => {
    // Load counselor profile data
    loadCounselorProfile();
  }, [counselorId]);

  const loadCounselorProfile = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await counselorAPI.getCounselorProfile(counselorId);
      // setProfile(response.data);
      
      // Mock data for now
      setProfile({
        name: 'Dr. Meera Kapoor',
        specialization: 'Pre-marital and Post-marital Counseling',
        experience: 8,
        counselingMethods: ['online', 'offline'],
        availableCities: ['Mumbai', 'Delhi', 'Bangalore'],
        sessionFees: 1500,
        description: 'Experienced relationship counselor specializing in pre and post-marital counseling',
        phone: '+91 98765 43210',
        email: 'dr.meera@example.com',
        rating: 4.8,
        totalSessions: 45,
        isVerified: true
      });
    } catch (error) {
      console.error('Error loading counselor profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // await counselorAPI.updateProfile(profile);
      setShowProfileForm(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTimeSlot = async () => {
    // TODO: Implement add time slot
    setShowTimeSlotForm(false);
  };

  const handleUpdateRequestStatus = async (requestId: string, status: CounselingRequest['status']) => {
    setCounselingRequests(prev => 
      prev.map(request => 
        request.id === requestId ? { ...request, status } : request
      )
    );
  };

  const handleUpdateSessionStatus = async (sessionId: string, status: Session['status']) => {
    setSessions(prev => 
      prev.map(session => 
        session.id === sessionId ? { ...session, status } : session
      )
    );
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: 'bg-yellow-100 text-yellow-800',
      accepted: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      scheduled: 'bg-purple-100 text-purple-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig[status as keyof typeof statusConfig]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Heart className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Counselor Dashboard</h1>
                <p className="text-sm text-gray-500">{profile.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowProfileForm(true)}
                className="btn-outline flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Profile
              </button>
              <button className="btn-outline flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'time-slots', label: 'Time Slots', icon: Clock },
              { id: 'requests', label: 'Counseling Requests', icon: Users },
              { id: 'sessions', label: 'Sessions', icon: Calendar }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.totalSessions}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.completedSessions}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <DollarSign className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Earnings</p>
                    <p className="text-2xl font-bold text-gray-900">₹{analytics.totalEarnings.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Star className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Rating</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.averageRating}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Sessions</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {sessions.slice(0, 5).map(session => (
                    <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{session.userName}</p>
                        <p className="text-sm text-gray-600">{session.date} at {session.time}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(session.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          session.sessionType === 'online' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {session.sessionType}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'time-slots' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Manage Time Slots</h2>
              <button
                onClick={() => setShowTimeSlotForm(true)}
                className="btn-primary flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Time Slot
              </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Day</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Session Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {timeSlots.map(slot => (
                    <tr key={slot.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{slot.day}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {slot.startTime} - {slot.endTime}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          slot.sessionType === 'online' ? 'bg-blue-100 text-blue-800' :
                          slot.sessionType === 'offline' ? 'bg-green-100 text-green-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {slot.sessionType}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          slot.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {slot.isAvailable ? 'Available' : 'Unavailable'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Counseling Requests</h2>
              <div className="flex gap-2">
                <select className="input-field">
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {counselingRequests.map(request => (
                <div key={request.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-medium text-gray-900">{request.userName}</h3>
                      <p className="text-sm text-gray-500">{request.userEmail} • {request.userPhone}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(request.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        request.sessionType === 'online' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {request.sessionType}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{request.issue}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Preferred: {new Date(request.preferredTime).toLocaleString()}
                    </div>
                    <div className="flex gap-2">
                      {request.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleUpdateRequestStatus(request.id, 'accepted')}
                            className="btn-primary text-sm"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleUpdateRequestStatus(request.id, 'cancelled')}
                            className="btn-outline text-sm"
                          >
                            Decline
                          </button>
                        </>
                      )}
                      {request.status === 'accepted' && (
                        <button
                          onClick={() => handleUpdateRequestStatus(request.id, 'completed')}
                          className="btn-primary text-sm"
                        >
                          Mark Complete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'sessions' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Sessions</h2>
              <div className="flex gap-2">
                <select className="input-field">
                  <option value="all">All Sessions</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sessions.map(session => (
                    <tr key={session.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{session.userName}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {session.date} at {session.time}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{session.duration} min</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          session.sessionType === 'online' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {session.sessionType}
                        </span>
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(session.status)}</td>
                      <td className="px-6 py-4">
                        {session.rating ? (
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="ml-1 text-sm">{session.rating}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="w-4 h-4" />
                          </button>
                          {session.status === 'scheduled' && (
                            <button
                              onClick={() => handleUpdateSessionStatus(session.id, 'completed')}
                              className="text-green-600 hover:text-green-900"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Profile Form Modal */}
      {showProfileForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Edit Profile</h3>
              <button
                onClick={() => setShowProfileForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                  <input
                    type="text"
                    value={profile.specialization}
                    onChange={(e) => setProfile({...profile, specialization: e.target.value})}
                    className="input-field"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience (years)</label>
                  <input
                    type="number"
                    value={profile.experience}
                    onChange={(e) => setProfile({...profile, experience: parseInt(e.target.value)})}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Session Fees (₹)</label>
                  <input
                    type="number"
                    value={profile.sessionFees}
                    onChange={(e) => setProfile({...profile, sessionFees: parseInt(e.target.value)})}
                    className="input-field"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Counseling Methods</label>
                <div className="grid grid-cols-2 gap-2">
                  {['online', 'offline', 'both'].map(method => (
                    <label key={method} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={profile.counselingMethods.includes(method)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setProfile({
                              ...profile,
                              counselingMethods: [...profile.counselingMethods, method]
                            });
                          } else {
                            setProfile({
                              ...profile,
                              counselingMethods: profile.counselingMethods.filter(m => m !== method)
                            });
                          }
                        }}
                        className="rounded border-gray-300 mr-2"
                      />
                      <span className="text-sm capitalize">{method}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Available Cities</label>
                <input
                  type="text"
                  value={profile.availableCities.join(', ')}
                  onChange={(e) => setProfile({...profile, availableCities: e.target.value.split(', ').filter(city => city.trim())})}
                  className="input-field"
                  placeholder="Mumbai, Delhi, Bangalore"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={profile.description}
                  onChange={(e) => setProfile({...profile, description: e.target.value})}
                  className="input-field h-32"
                />
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={handleUpdateProfile}
                  className="btn-primary flex-1"
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update Profile'}
                </button>
                <button
                  onClick={() => setShowProfileForm(false)}
                  className="btn-outline flex-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CounselorDashboard; 