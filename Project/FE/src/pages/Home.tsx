import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Shield, Users, Sparkles } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-white">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-saffron to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="text-xl font-bold text-gray-900">BandhanConnect</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-gray-600 hover:text-saffron transition-colors">
              Login
            </Link>
            <Link to="/register" className="btn-primary">
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Your Perfect
            <span className="text-saffron"> Life Partner</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Modern Indian matrimonial platform combining traditional values with cutting-edge technology. 
            Secure, authentic, and designed for today's generation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary text-lg px-8 py-4">
              Start Your Journey
            </Link>
            <Link to="/login" className="btn-outline text-lg px-8 py-4">
              Sign In
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          <div className="text-center p-6 card">
            <div className="w-12 h-12 bg-gradient-to-r from-saffron to-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">TRUST Verification</h3>
            <p className="text-gray-600">Aadhaar-based verification ensures authentic profiles and secure connections.</p>
          </div>

          <div className="text-center p-6 card">
            <div className="w-12 h-12 bg-gradient-to-r from-teal to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Matching</h3>
            <p className="text-gray-600">AI-powered compatibility algorithm based on values, interests, and lifestyle.</p>
          </div>

          <div className="text-center p-6 card">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Family Connect</h3>
            <p className="text-gray-600">Balanced family involvement while respecting individual choice and privacy.</p>
          </div>

          <div className="text-center p-6 card">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Journey Timeline</h3>
            <p className="text-gray-600">Track your relationship milestones and plan your future together.</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-20 text-center">
          <div>
            <h3 className="text-3xl font-bold text-gray-900">125K+</h3>
            <p className="text-gray-600">Verified Profiles</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-900">8.9K+</h3>
            <p className="text-gray-600">Successful Matches</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-900">45K+</h3>
            <p className="text-gray-600">Active Users</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-20 border-t border-gray-200">
        <div className="text-center text-gray-600">
          <p>&copy; 2024 BandhanConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;