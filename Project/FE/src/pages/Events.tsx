import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Clock, Filter, Plus, Heart, Star, X } from 'lucide-react';
import { eventsAPI } from '../services/api';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'virtual' | 'in-person' | 'hybrid';
  category: 'networking' | 'workshop' | 'social' | 'cultural';
  maxParticipants: number;
  currentParticipants: number;
  price: number;
  organizer: string;
  image: string;
  featured: boolean;
}

interface EventFormData {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'virtual' | 'in-person' | 'hybrid';
  category: 'networking' | 'workshop' | 'social' | 'cultural';
  maxParticipants: number;
  price: number;
  organizer: string;
  image: string;
  featured: boolean;
}

const Events: React.FC = () => {
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    type: 'virtual',
    category: 'networking',
    maxParticipants: 50,
    price: 0,
    organizer: '',
    image: 'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=400',
    featured: false
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await eventsAPI.getEvents();
      setEvents(data);
    } catch (error) {
      console.error('Error loading events:', error);
      // Fallback to sample data
      setEvents([
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
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof EventFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitEvent = async () => {
    // Basic validation
    if (!formData.title || !formData.description || !formData.date || !formData.time || !formData.location) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setSubmitting(true);
      const newEvent = await eventsAPI.createEvent(formData);
      console.log('Event created:', newEvent);
      
      // Add the new event to the list
      setEvents(prev => [newEvent, ...prev]);
      
      // Reset form and close modal
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        type: 'virtual',
        category: 'networking',
        maxParticipants: 50,
        price: 0,
        organizer: '',
        image: 'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=400',
        featured: false
      });
      setShowCreateEvent(false);
      
      alert('Event created successfully!');
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      type: 'virtual',
      category: 'networking',
      maxParticipants: 50,
      price: 0,
      organizer: '',
      image: 'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: false
    });
  };

  const [filter, setFilter] = useState({
    type: 'all',
    category: 'all',
    priceRange: 'all'
  });

  const filteredEvents = events.filter(event => {
    if (filter.type !== 'all' && event.type !== filter.type) return false;
    if (filter.category !== 'all' && event.category !== filter.category) return false;
    if (filter.priceRange !== 'all') {
      if (filter.priceRange === 'free' && event.price > 0) return false;
      if (filter.priceRange === 'paid' && event.price === 0) return false;
      if (filter.priceRange === 'under500' && event.price >= 500) return false;
      if (filter.priceRange === 'over500' && event.price < 500) return false;
    }
    return true;
  });

  const featuredEvents = events.filter(event => event.featured);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'virtual': return 'bg-blue-100 text-blue-800';
      case 'in-person': return 'bg-green-100 text-green-800';
      case 'hybrid': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'networking': return Users;
      case 'workshop': return Star;
      case 'social': return Heart;
      case 'cultural': return Calendar;
      default: return Calendar;
    }
  };

  const handleRegisterEvent = (eventId: string) => {
    if (registeredEvents.includes(eventId)) {
      setRegisteredEvents(registeredEvents.filter(id => id !== eventId));
    } else {
      setRegisteredEvents([...registeredEvents, eventId]);
    }
  };

  return (
    <div className="fade-in">
      {/* Create Event Modal */}
      {showCreateEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Create New Event</h3>
              <button 
                onClick={() => {
                  setShowCreateEvent(false);
                  resetForm();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Title *</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="Enter event title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Type *</label>
                  <select 
                    className="input-field"
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                  >
                    <option value="virtual">Virtual</option>
                    <option value="in-person">In-Person</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea 
                  className="input-field h-32 resize-none" 
                  placeholder="Describe your event..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                ></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                  <input 
                    type="date" 
                    className="input-field"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time *</label>
                  <input 
                    type="time" 
                    className="input-field"
                    value={formData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="Event location or virtual platform"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <select 
                    className="input-field"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                  >
                    <option value="networking">Networking</option>
                    <option value="workshop">Workshop</option>
                    <option value="social">Social</option>
                    <option value="cultural">Cultural</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Participants *</label>
                  <input 
                    type="number" 
                    className="input-field" 
                    placeholder="50"
                    value={formData.maxParticipants}
                    onChange={(e) => handleInputChange('maxParticipants', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹) *</label>
                  <input 
                    type="number" 
                    className="input-field" 
                    placeholder="0 for free"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Organizer *</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Your name or organization"
                  value={formData.organizer}
                  onChange={(e) => handleInputChange('organizer', e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => handleInputChange('featured', e.target.checked)}
                  className="rounded border-gray-300 text-saffron focus:ring-saffron"
                />
                <label htmlFor="featured" className="text-sm text-gray-700">
                  Mark as featured event
                </label>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={handleSubmitEvent}
                  disabled={submitting}
                  className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Creating...' : 'Create Event'}
                </button>
                <button 
                  onClick={() => {
                    setShowCreateEvent(false);
                    resetForm();
                  }}
                  className="btn-outline flex-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Events</h1>
          <p className="text-gray-600">Join events to meet like-minded people and build connections</p>
        </div>
        <button 
          onClick={() => {
            resetForm();
            setShowCreateEvent(true);
          }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Event
        </button>
      </div>

      {/* Featured Events */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Featured Events</h2>
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading events...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map(event => {
              const CategoryIcon = getCategoryIcon(event.category);
              return (
                <div key={event.id} className="card overflow-hidden">
                  <div className="relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-saffron text-white px-2 py-1 rounded-full text-xs font-medium">
                        Featured
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(event.type)}`}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <CategoryIcon className="w-4 h-4 text-saffron" />
                      <span className="text-sm text-saffron font-medium">
                        {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">
                          {new Date(event.date).toLocaleDateString()} at {event.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">
                          {event.currentParticipants}/{event.maxParticipants} participants
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-saffron">
                        {event.price === 0 ? 'Free' : `₹${event.price}`}
                      </div>
                      <button 
                        onClick={() => handleRegisterEvent(event.id)}
                        className={`${
                          registeredEvents.includes(event.id) 
                            ? 'btn-outline' 
                            : 'btn-primary'
                        }`}
                      >
                        {registeredEvents.includes(event.id) ? 'Registered ✓' : 'Register'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="card p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Filter Events</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
            <select
              value={filter.type}
              onChange={(e) => setFilter({...filter, type: e.target.value})}
              className="input-field"
            >
              <option value="all">All Types</option>
              <option value="virtual">Virtual</option>
              <option value="in-person">In-Person</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={filter.category}
              onChange={(e) => setFilter({...filter, category: e.target.value})}
              className="input-field"
            >
              <option value="all">All Categories</option>
              <option value="networking">Networking</option>
              <option value="workshop">Workshop</option>
              <option value="social">Social</option>
              <option value="cultural">Cultural</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
            <select
              value={filter.priceRange}
              onChange={(e) => setFilter({...filter, priceRange: e.target.value})}
              className="input-field"
            >
              <option value="all">All Prices</option>
              <option value="free">Free</option>
              <option value="under500">Under ₹500</option>
              <option value="over500">₹500+</option>
            </select>
          </div>
        </div>
      </div>

      {/* All Events */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          All Events ({filteredEvents.length})
        </h2>
        <div className="space-y-6">
          {filteredEvents.map(event => {
            const CategoryIcon = getCategoryIcon(event.category);
            return (
              <div key={event.id} className="card p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-48 h-32 md:h-auto">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <CategoryIcon className="w-4 h-4 text-saffron" />
                          <span className="text-sm text-saffron font-medium">
                            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(event.type)}`}>
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </span>
                          {event.featured && (
                            <span className="bg-saffron text-white px-2 py-1 rounded-full text-xs font-medium">
                              Featured
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                        <p className="text-gray-600 mb-4">{event.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-saffron mb-1">
                          {event.price === 0 ? 'Free' : `₹${event.price}`}
                        </div>
                        <button 
                          onClick={() => handleRegisterEvent(event.id)}
                          className={`${
                            registeredEvents.includes(event.id) 
                              ? 'btn-outline' 
                              : 'btn-primary'
                          }`}
                        >
                          {registeredEvents.includes(event.id) ? 'Registered ✓' : 'Register Now'}
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {event.currentParticipants}/{event.maxParticipants} participants
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          Organized by {event.organizer}
                        </div>
                      </div>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-saffron h-2 rounded-full"
                          style={{ width: `${(event.currentParticipants / event.maxParticipants) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Events;