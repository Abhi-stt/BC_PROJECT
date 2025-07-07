import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sampleUsers } from '../data/sampleData';
import { Search as SearchIcon, MapPin, GraduationCap, Briefcase, Heart } from 'lucide-react';

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    ageMin: '',
    ageMax: '',
    location: '',
    education: '',
    profession: ''
  });
  const [results, setResults] = useState(sampleUsers);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter users based on search criteria
    let filteredResults = sampleUsers;
    
    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filteredResults = filteredResults.filter(user => 
        user.name.toLowerCase().includes(term) ||
        user.location.toLowerCase().includes(term) ||
        user.profession.toLowerCase().includes(term) ||
        user.education.toLowerCase().includes(term)
      );
    }
    
    // Filter by age range
    if (filters.ageMin) {
      filteredResults = filteredResults.filter(user => user.age >= parseInt(filters.ageMin));
    }
    if (filters.ageMax) {
      filteredResults = filteredResults.filter(user => user.age <= parseInt(filters.ageMax));
    }
    
    // Filter by location
    if (filters.location) {
      filteredResults = filteredResults.filter(user => 
        user.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    // Filter by education
    if (filters.education) {
      filteredResults = filteredResults.filter(user => user.education === filters.education);
    }
    
    // Filter by profession
    if (filters.profession) {
      filteredResults = filteredResults.filter(user => user.profession === filters.profession);
    }
    
    setResults(filteredResults);
  };

  const handleMessage = (userId: string) => {
    navigate(`/app/chat/${userId}`);
  };

  return (
    <div className="fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Search Profiles</h1>
        <p className="text-gray-600">Find your perfect match with advanced search</p>
      </div>

      {/* Search Form */}
      <div className="card p-6 mb-6">
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
                placeholder="Search by name, location, profession..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Age</label>
              <input
                type="number"
                value={filters.ageMin}
                onChange={(e) => setFilters(prev => ({...prev, ageMin: e.target.value}))}
                className="input-field"
                placeholder="24"
                min="18"
                max="60"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Age</label>
              <input
                type="number"
                value={filters.ageMax}
                onChange={(e) => setFilters(prev => ({...prev, ageMax: e.target.value}))}
                className="input-field"
                placeholder="35"
                min="18"
                max="60"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={filters.location}
                onChange={(e) => setFilters(prev => ({...prev, location: e.target.value}))}
                className="input-field"
                placeholder="Any city"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
              <select
                value={filters.education}
                onChange={(e) => setFilters(prev => ({...prev, education: e.target.value}))}
                className="input-field"
              >
                <option value="">All Education</option>
                <option value="Graduate">Graduate</option>
                <option value="Post Graduate">Post Graduate</option>
                <option value="Professional">Professional</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profession</label>
              <select
                value={filters.profession}
                onChange={(e) => setFilters(prev => ({...prev, profession: e.target.value}))}
                className="input-field"
              >
                <option value="">All Professions</option>
                <option value="Software">Software</option>
                <option value="Business">Business</option>
                <option value="Healthcare">Healthcare</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn-primary">
            Search Profiles
          </button>
        </form>
      </div>

      {/* Search Results */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Search Results ({results.length})</h2>
        
        {results.map(user => (
          <div key={user.id} className="card p-6 hover:shadow-xl transition-shadow">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-48 h-48 rounded-lg overflow-hidden">
                <img
                  src={user.photos[0]}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{user.name}, {user.age}</h3>
                    <p className="text-gray-600">Active {user.lastActive}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-green-600">{user.compatibilityScore}% Match</span>
                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm">{user.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <GraduationCap className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm">{user.education}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm">{user.profession}</span>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 line-clamp-2">{user.bio}</p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {user.interests.slice(0, 3).map((interest, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => handleMessage(user.id)}
                    className="btn-primary"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;