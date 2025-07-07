import React, { useState } from 'react';
import { adminStats, sampleUsers } from '../data/sampleData';
import { 
  Users, 
  UserCheck, 
  Activity, 
  UserPlus, 
  AlertTriangle, 
  Heart,
  Crown,
  TrendingUp,
  Shield,
  Eye,
  Ban,
  CheckCircle
} from 'lucide-react';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+{trend}%</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const handleUserAction = (userId: string, action: string) => {
    console.log(`${action} user ${userId}`);
  };

  return (
    <div className="fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage users, content, and platform analytics</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'users', label: 'Users' },
          { id: 'moderation', label: 'Moderation' },
          { id: 'analytics', label: 'Analytics' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-saffron shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Users"
              value={adminStats.totalUsers}
              icon={Users}
              color="bg-blue-500"
              trend={12}
            />
            <StatCard
              title="Verified Users"
              value={adminStats.verifiedUsers}
              icon={UserCheck}
              color="bg-green-500"
              trend={8}
            />
            <StatCard
              title="Active Users"
              value={adminStats.activeUsers}
              icon={Activity}
              color="bg-teal-500"
              trend={15}
            />
            <StatCard
              title="Premium Users"
              value={adminStats.premiumUsers}
              icon={Crown}
              color="bg-purple-500"
              trend={25}
            />
          </div>

          {/* Secondary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="New Registrations"
              value={adminStats.newRegistrations}
              icon={UserPlus}
              color="bg-orange-500"
            />
            <StatCard
              title="Pending Verifications"
              value={adminStats.pendingVerifications}
              icon={Shield}
              color="bg-yellow-500"
            />
            <StatCard
              title="Reported Profiles"
              value={adminStats.reportedProfiles}
              icon={AlertTriangle}
              color="bg-red-500"
            />
            <StatCard
              title="Successful Matches"
              value={adminStats.successfulMatches}
              icon={Heart}
              color="bg-pink-500"
            />
          </div>

          {/* Recent Activity */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { action: 'New user registered', user: 'priya.sharma@email.com', time: '2 minutes ago' },
                { action: 'Profile verified', user: 'arjun.patel@email.com', time: '15 minutes ago' },
                { action: 'Premium subscription', user: 'kavya.reddy@email.com', time: '1 hour ago' },
                { action: 'Profile reported', user: 'reported.user@email.com', time: '2 hours ago' },
                { action: 'Successful match', user: 'Match between two users', time: '3 hours ago' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.user}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Search users..."
                className="input-field w-64"
              />
              <select className="input-field">
                <option>All Users</option>
                <option>Verified</option>
                <option>Unverified</option>
                <option>Premium</option>
              </select>
            </div>
          </div>

          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sampleUsers.map(user => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={user.photos[0]}
                            alt={user.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.age} years</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {user.verificationStatus === 'verified' ? (
                            <div className="verification-badge">
                              <Shield className="w-4 h-4" />
                              Verified
                            </div>
                          ) : (
                            <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                              Pending
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Jan 15, 2024
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUserAction(user.id, 'view')}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleUserAction(user.id, 'verify')}
                            className="text-green-600 hover:text-green-900"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleUserAction(user.id, 'ban')}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Ban className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Moderation Tab */}
      {activeTab === 'moderation' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Content Moderation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Pending Reviews</h3>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">
                  {adminStats.pendingVerifications}
                </span>
              </div>
              <p className="text-gray-600 mb-4">Profiles waiting for manual review</p>
              <button className="btn-primary w-full">Review Queue</button>
            </div>

            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Reported Content</h3>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">
                  {adminStats.reportedProfiles}
                </span>
              </div>
              <p className="text-gray-600 mb-4">User reports requiring attention</p>
              <button className="btn-primary w-full">View Reports</button>
            </div>

            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Auto-Flagged</h3>
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm">
                  12
                </span>
              </div>
              <p className="text-gray-600 mb-4">Content flagged by AI systems</p>
              <button className="btn-primary w-full">Review Flags</button>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Analytics & Insights</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Chart visualization would go here</p>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Match Success Rate</h3>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Chart visualization would go here</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">78%</div>
                <div className="text-sm text-gray-600">Profile Completion Rate</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">85%</div>
                <div className="text-sm text-gray-600">Message Response Rate</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">12%</div>
                <div className="text-sm text-gray-600">Premium Conversion</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">92%</div>
                <div className="text-sm text-gray-600">User Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;