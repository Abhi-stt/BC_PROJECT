import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Package, 
  Users, 
  MessageSquare, 
  Calendar,
  Settings,
  Building,
  Star,
  DollarSign,
  FileText,
  Award,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const VendorSidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { path: '/vendor/dashboard', label: 'Dashboard', icon: BarChart3, description: 'Overview & Analytics' },
    { path: '/vendor/services', label: 'Services', icon: Package, description: 'Manage Service Packages' },
    { path: '/vendor/leads', label: 'Client Leads', icon: Users, description: 'Manage Client Inquiries' },
    { path: '/vendor/messages', label: 'Messages', icon: MessageSquare, description: 'Client Communications' },
    { path: '/vendor/bookings', label: 'Bookings', icon: Calendar, description: 'Manage Appointments' },
    { path: '/vendor/reviews', label: 'Reviews', icon: Star, description: 'Client Feedback' },
    { path: '/vendor/earnings', label: 'Earnings', icon: DollarSign, description: 'Revenue & Payments' },
    { path: '/vendor/profile', label: 'Business Profile', icon: Building, description: 'Company Information' },
    { path: '/vendor/documents', label: 'Documents', icon: FileText, description: 'Certificates & Licenses' },
    { path: '/vendor/achievements', label: 'Achievements', icon: Award, description: 'Awards & Recognition' },
    { path: '/vendor/settings', label: 'Settings', icon: Settings, description: 'Account Configuration' },
    { path: '/vendor/support', label: 'Support', icon: HelpCircle, description: 'Help & Assistance' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen fixed left-0 top-16 overflow-y-auto">
      <div className="p-4">
        {/* Vendor Info */}
        <div className="mb-6 p-4 bg-gradient-to-r from-saffron to-orange-500 rounded-lg text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">{user?.name || 'Vendor'}</h3>
              <p className="text-sm opacity-90">Business Account</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors group ${
                  isActive(item.path)
                    ? 'bg-saffron text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
                title={item.description}
              >
                <Icon className={`w-5 h-5 ${isActive(item.path) ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}`} />
                <div className="flex-1">
                  <span className="font-medium">{item.label}</span>
                  <p className={`text-xs ${isActive(item.path) ? 'text-white opacity-80' : 'text-gray-400 group-hover:text-gray-500'}`}>
                    {item.description}
                  </p>
                </div>
                {/* Notification badges */}
                {item.label === 'Messages' && (
                  <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                )}
                {item.label === 'Leads' && (
                  <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    5
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Quick Stats */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Quick Stats</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Active Leads</span>
              <span className="font-medium text-blue-600">12</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">This Month</span>
              <span className="font-medium text-green-600">₹45,000</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Rating</span>
              <span className="font-medium text-yellow-600">4.8 ★</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorSidebar; 