import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  LogOut,
  Plus,
  Edit,
  Eye,
  Star,
  CheckCircle,
  X,
  UserPlus,
  UserMinus,
  Shield,
  Heart,
  MapPin
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface CommunityMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileStatus: 'pending' | 'approved' | 'rejected';
  joinDate: string;
  isActive: boolean;
}

interface MatrimonialProfile {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  age: number;
  profession: string;
  location: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  photo?: string;
}

interface CommunityQuery {
  id: string;
  from: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  maxAttendees: number;
  status: 'upcoming' | 'ongoing' | 'completed';
}

const CommunityDashboard: React.FC = () => {
  const { communityId } = useParams<{ communityId: string }>();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Profile state
  const [profile, setProfile] = useState({
    communityName: '',
    religion: '',
    region: '',
    rules: '',
    description: '',
    totalMembers: 0,
    activeMembers: 0,
    totalMatches: 0,
    isVerified: false
  });

  // Members state
  const [members, setMembers] = useState<CommunityMember[]>([
    {
      id: '1',
      name: 'Priya Sharma',
      email: 'priya@example.com',
      phone: '+91 98765 43210',
      profileStatus: 'approved',
      joinDate: '2024-01-01',
      isActive: true
    },
    {
      id: '2',
      name: 'Rahul Patel',
      email: 'rahul@example.com',
      phone: '+91 87654 32109',
      profileStatus: 'pending',
      joinDate: '2024-01-15',
      isActive: true
    },
    {
      id: '3',
      name: 'Meera Singh',
      email: 'meera@example.com',
      phone: '+91 76543 21098',
      profileStatus: 'approved',
      joinDate: '2023-12-20',
      isActive: false
    }
  ]);

  // Matrimonial profiles state
  const [matrimonialProfiles, setMatrimonialProfiles] = useState<MatrimonialProfile[]>([
    {
      id: '1',
      userId: 'user1',
      userName: 'Priya Sharma',
      userEmail: 'priya@example.com',
      age: 28,
      profession: 'Software Engineer',
      location: 'Mumbai',
      status: 'pending',
      submittedDate: '2024-01-15'
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Rahul Patel',
      userEmail: 'rahul@example.com',
      age: 30,
      profession: 'Doctor',
      location: 'Delhi',
      status: 'approved',
      submittedDate: '2024-01-10'
    }
  ]);

  // Queries state
  const [queries, setQueries] = useState<CommunityQuery[]>([
    {
      id: '1',
      from: 'amit@example.com',
      subject: 'Community Guidelines Question',
      message: 'Hi, I would like to know more about the community guidelines and rules for profile approval.',
      status: 'unread',
      createdAt: '2024-01-15T09:00:00Z'
    }
  ]);

  // Events state
  const [events, setEvents] = useState<CommunityEvent[]>([
    {
      id: '1',
      title: 'Community Meet & Greet',
      description: 'Monthly community gathering for members to meet and network',
      date: '2024-02-15',
      time: '18:00',
      location: 'Community Center, Mumbai',
      attendees: 45,
      maxAttendees: 100,
      status: 'upcoming'
    },
    {
      id: '2',
      title: 'Wedding Planning Workshop',
      description: 'Workshop on traditional wedding planning and customs',
      date: '2024-01-25',
      time: '14:00',
      location: 'Cultural Hall, Mumbai',
      attendees: 78,
      maxAttendees: 80,
      status: 'upcoming'
    }
  ]);

  // Analytics state
  const [analytics, setAnalytics] = useState({
    totalMembers: 1250,
    activeMembers: 890,
    totalMatches: 156,
    successfulMatches: 89,
    pendingProfiles: 23,
    totalEvents: 12,
    monthlyGrowth: 8
  });

  useEffect(() => {
    // Load community profile data
    loadCommunityProfile();
  }, [communityId]);

  const loadCommunityProfile = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await communityAPI.getCommunityProfile(communityId);
      // setProfile(response.data);
      
      // Mock data for now
      setProfile({
        communityName: 'Mumbai Hindu Community',
        religion: 'Hindu',
        region: 'Maharashtra',
        rules: 'Members must follow traditional values and respect community guidelines',
        description: 'A vibrant community dedicated to preserving cultural values and helping members find life partners',
        totalMembers: 1250,
        activeMembers: 890,
        totalMatches: 156,
        isVerified: true
      });
    } catch (error) {
      console.error('Error loading community profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // await communityAPI.updateProfile(profile);
      setShowProfileForm(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAddEvent = async () => {
    // TODO: Implement add event
    setShowEventForm(false);
  };

  const handleUpdateMemberStatus = async (memberId: string, status: CommunityMember['profileStatus']) => {
    setMembers(prev => 
      prev.map(member => 
        member.id === memberId ? { ...member, profileStatus: status } : member
      )
    );
  };

  const handleUpdateProfileStatus = async (profileId: string, status: MatrimonialProfile['status']) => {
    setMatrimonialProfiles(prev => 
      prev.map(profile => 
        profile.id === profileId ? { ...profile, status } : profile
      )
    );
  };

  const handleReplyToQuery = async (queryId: string, reply: string) => {
    setQueries(prev => 
      prev.map(query => 
        query.id === queryId ? { ...query, status: 'replied' } : query
      )
    );
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      unread: 'bg-red-100 text-red-800',
      read: 'bg-yellow-100 text-yellow-800',
      replied: 'bg-green-100 text-green-800',
      upcoming: 'bg-blue-100 text-blue-800',
      ongoing: 'bg-green-100 text-green-800',
      completed: 'bg-gray-100 text-gray-800'
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
              <Users className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Community Dashboard</h1>
                <p className="text-sm text-gray-500">{profile.communityName}</p>
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
              { id: 'members', label: 'Members', icon: Users },
              { id: 'profiles', label: 'Matrimonial Profiles', icon: Heart },
              { id: 'queries', label: 'Queries', icon: MessageSquare },
              { id: 'events', label: 'Events', icon: Calendar }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-green-600 text-green-600'
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
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Members</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.totalMembers}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <UserPlus className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Members</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.activeMembers}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Heart className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Matches</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.totalMatches}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Calendar className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Events</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.totalEvents}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {members.slice(0, 5).map(member => (
                    <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-600">Joined: {new Date(member.joinDate).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(member.profileStatus)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          member.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {member.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Community Members</h2>
              <div className="flex gap-2">
                <select className="input-field">
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Member</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Join Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {members.map(member => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{member.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{member.email}</div>
                        <div className="text-sm text-gray-500">{member.phone}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(member.joinDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getStatusBadge(member.profileStatus)}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            member.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {member.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="w-4 h-4" />
                          </button>
                          {member.profileStatus === 'pending' && (
                            <>
                              <button
                                onClick={() => handleUpdateMemberStatus(member.id, 'approved')}
                                className="text-green-600 hover:text-green-900"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleUpdateMemberStatus(member.id, 'rejected')}
                                className="text-red-600 hover:text-red-900"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
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

        {activeTab === 'profiles' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Matrimonial Profiles</h2>
              <div className="flex gap-2">
                <select className="input-field">
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {matrimonialProfiles.map(profile => (
                <div key={profile.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                        <Users className="w-8 h-8 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{profile.userName}</h3>
                        <p className="text-sm text-gray-500">{profile.userEmail}</p>
                        <p className="text-sm text-gray-600">{profile.age} years • {profile.profession}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{profile.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(profile.status)}
                      <span className="text-sm text-gray-500">
                        {new Date(profile.submittedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="w-4 h-4 mr-1" />
                      View Profile
                    </button>
                    {profile.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleUpdateProfileStatus(profile.id, 'approved')}
                          className="text-green-600 hover:text-green-900"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleUpdateProfileStatus(profile.id, 'rejected')}
                          className="text-red-600 hover:text-red-900"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'queries' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Community Queries</h2>
              <div className="flex gap-2">
                <select className="input-field">
                  <option value="all">All Queries</option>
                  <option value="unread">Unread</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {queries.map(query => (
                <div key={query.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-medium text-gray-900">{query.subject}</h3>
                      <p className="text-sm text-gray-500">From: {query.from}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(query.status)}
                      <span className="text-sm text-gray-500">
                        {new Date(query.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{query.message}</p>
                  <div className="flex gap-2">
                    <button className="btn-primary text-sm">Reply</button>
                    <button className="btn-outline text-sm">Mark as Read</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Community Events</h2>
              <button
                onClick={() => setShowEventForm(true)}
                className="btn-primary flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Event
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map(event => (
                <div key={event.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                    {getStatusBadge(event.status)}
                  </div>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date} at {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{event.attendees}/{event.maxAttendees} attendees</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="btn-primary text-sm">View Details</button>
                    <button className="btn-outline text-sm">Edit</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Profile Form Modal */}
      {showProfileForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Edit Community Profile</h3>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Community Name</label>
                  <input
                    type="text"
                    value={profile.communityName}
                    onChange={(e) => setProfile({...profile, communityName: e.target.value})}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Religion</label>
                  <input
                    type="text"
                    value={profile.religion}
                    onChange={(e) => setProfile({...profile, religion: e.target.value})}
                    className="input-field"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Region/State</label>
                <input
                  type="text"
                  value={profile.region}
                  onChange={(e) => setProfile({...profile, region: e.target.value})}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Community Rules</label>
                <textarea
                  value={profile.rules}
                  onChange={(e) => setProfile({...profile, rules: e.target.value})}
                  className="input-field h-32"
                  placeholder="Enter community rules and guidelines..."
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

export default CommunityDashboard; 