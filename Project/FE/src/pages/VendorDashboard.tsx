import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Building, 
  Package, 
  Users, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  LogOut,
  Plus,
  Edit,
  Eye,
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  TrendingUp,
  Heart,
  CheckCircle,
  X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface ServicePackage {
  id: string;
  title: string;
  description: string;
  price: number;
  isActive: boolean;
}

interface ClientLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: 'new' | 'contacted' | 'quoted' | 'booked' | 'lost';
  createdAt: string;
}

interface Query {
  id: string;
  from: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

const VendorDashboard: React.FC = () => {
  const { vendorId } = useParams<{ vendorId: string }>();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Profile state
  const [profile, setProfile] = useState({
    businessName: '',
    services: [] as string[],
    city: '',
    location: '',
    description: '',
    phone: '',
    email: '',
    website: '',
    rating: 0,
    totalReviews: 0,
    isVerified: false
  });

  // Service packages state
  const [servicePackages, setServicePackages] = useState<ServicePackage[]>([
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
  ]);

  // Client leads state
  const [clientLeads, setClientLeads] = useState<ClientLead[]>([
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
  ]);

  // Queries state
  const [queries, setQueries] = useState<Query[]>([
    {
      id: '1',
      from: 'amit@example.com',
      subject: 'Wedding Photography Inquiry',
      message: 'Hi, I would like to know more about your wedding photography packages and availability.',
      status: 'unread',
      createdAt: '2024-01-15T09:00:00Z'
    }
  ]);

  // Analytics state
  const [analytics, setAnalytics] = useState({
    totalLeads: 25,
    convertedLeads: 8,
    totalRevenue: 750000,
    averageRating: 4.5,
    totalBookings: 12,
    monthlyGrowth: 15
  });

  useEffect(() => {
    // Load vendor profile data
    loadVendorProfile();
  }, [vendorId]);

  const loadVendorProfile = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await vendorAPI.getVendorProfile(vendorId);
      // setProfile(response.data);
      
      // Mock data for now
      setProfile({
        businessName: 'Royal Wedding Services',
        services: ['photography', 'decoration', 'catering'],
        city: 'Mumbai',
        location: 'Andheri West',
        description: 'Premium wedding services with over 10 years of experience',
        phone: '+91 98765 43210',
        email: 'info@royalweddings.com',
        website: 'www.royalweddings.com',
        rating: 4.8,
        totalReviews: 156,
        isVerified: true
      });
    } catch (error) {
      console.error('Error loading vendor profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // await vendorAPI.updateProfile(profile);
      setShowProfileForm(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAddServicePackage = async () => {
    // TODO: Implement add service package
    setShowServiceForm(false);
  };

  const handleUpdateLeadStatus = async (leadId: string, status: ClientLead['status']) => {
    setClientLeads(prev => 
      prev.map(lead => 
        lead.id === leadId ? { ...lead, status } : lead
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
      new: 'bg-blue-100 text-blue-800',
      contacted: 'bg-yellow-100 text-yellow-800',
      quoted: 'bg-purple-100 text-purple-800',
      booked: 'bg-green-100 text-green-800',
      lost: 'bg-red-100 text-red-800'
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
              <Building className="w-8 h-8 text-saffron mr-3" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Vendor Dashboard</h1>
                <p className="text-sm text-gray-500">{profile.businessName}</p>
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
              { id: 'services', label: 'Services', icon: Package },
              { id: 'leads', label: 'Client Leads', icon: Users },
              { id: 'queries', label: 'Queries', icon: MessageSquare }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-saffron text-saffron'
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
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Leads</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.totalLeads}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Converted</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.convertedLeads}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <DollarSign className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">₹{analytics.totalRevenue.toLocaleString()}</p>
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
                <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {clientLeads.slice(0, 5).map(lead => (
                    <div key={lead.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{lead.name}</p>
                        <p className="text-sm text-gray-600">{lead.service}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(lead.status)}
                        <span className="text-sm text-gray-500">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Service Packages</h2>
              <button
                onClick={() => setShowServiceForm(true)}
                className="btn-primary flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Package
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicePackages.map(pkg => (
                <div key={pkg.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{pkg.title}</h3>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-gray-600 mb-4">{pkg.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-saffron">₹{pkg.price.toLocaleString()}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      pkg.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {pkg.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Client Leads</h2>
              <div className="flex gap-2">
                <select className="input-field">
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="quoted">Quoted</option>
                  <option value="booked">Booked</option>
                  <option value="lost">Lost</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {clientLeads.map(lead => (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{lead.name}</div>
                          <div className="text-sm text-gray-500">{lead.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{lead.service}</td>
                      <td className="px-6 py-4">{getStatusBadge(lead.status)}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="w-4 h-4" />
                          </button>
                          <select
                            value={lead.status}
                            onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as ClientLead['status'])}
                            className="text-sm border rounded px-2 py-1"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="quoted">Quoted</option>
                            <option value="booked">Booked</option>
                            <option value="lost">Lost</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'queries' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Customer Queries</h2>
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
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        query.status === 'unread' ? 'bg-red-100 text-red-800' :
                        query.status === 'read' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {query.status.charAt(0).toUpperCase() + query.status.slice(1)}
                      </span>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                  <input
                    type="text"
                    value={profile.businessName}
                    onChange={(e) => setProfile({...profile, businessName: e.target.value})}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    value={profile.city}
                    onChange={(e) => setProfile({...profile, city: e.target.value})}
                    className="input-field"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => setProfile({...profile, location: e.target.value})}
                  className="input-field"
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="input-field"
                  />
                </div>
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

export default VendorDashboard; 