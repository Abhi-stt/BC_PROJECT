import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { Upload, Camera, Plus, X } from 'lucide-react';

const CreateProfile: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    location: '',
    education: '',
    profession: '',
    religion: '',
    bio: '',
    interests: [] as string[],
    photos: [] as string[],
    preferences: {
      ageRange: [24, 35] as [number, number],
      location: '',
      education: '',
      profession: ''
    }
  });
  const { setUserProfile } = useUser();
  const navigate = useNavigate();

  const interestOptions = [
    'Reading', 'Traveling', 'Cooking', 'Photography', 'Music', 'Dancing',
    'Fitness', 'Yoga', 'Movies', 'Art', 'Technology', 'Sports',
    'Gardening', 'Writing', 'Meditation', 'Fashion', 'Gaming', 'Nature'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handlePhotoUpload = (photoUrl: string) => {
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, photoUrl]
    }));
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    const profile = {
      id: '1',
      ...formData,
      age: parseInt(formData.age)
    };
    
    setUserProfile(profile);
    navigate('/app');
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-white p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Profile</h1>
          <p className="text-gray-600">Tell us about yourself to find your perfect match</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Step {step} of 4</span>
            <span className="text-sm text-gray-500">{Math.round((step / 4) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-saffron to-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="card p-8">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Your age"
                    min="18"
                    max="60"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="City, State"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
                  <input
                    type="text"
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Your highest qualification"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profession</label>
                  <input
                    type="text"
                    name="profession"
                    value={formData.profession}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Your profession"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Religion</label>
                <select
                  name="religion"
                  value={formData.religion}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                >
                  <option value="">Select Religion</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Muslim">Muslim</option>
                  <option value="Christian">Christian</option>
                  <option value="Sikh">Sikh</option>
                  <option value="Buddhist">Buddhist</option>
                  <option value="Jain">Jain</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <button onClick={nextStep} className="w-full btn-primary">
                Next Step
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About Yourself</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="input-field"
                  placeholder="Tell us about yourself, your values, and what you're looking for in a partner..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Interests</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {interestOptions.map(interest => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => handleInterestToggle(interest)}
                      className={`p-2 rounded-lg border text-sm transition-all ${
                        formData.interests.includes(interest)
                          ? 'bg-saffron text-white border-saffron'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-saffron'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">Select at least 3 interests</p>
              </div>

              <div className="flex gap-4">
                <button onClick={prevStep} className="flex-1 btn-outline">
                  Previous
                </button>
                <button onClick={nextStep} className="flex-1 btn-primary">
                  Next Step
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Add Photos</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* Sample photos for demo */}
                {formData.photos.length === 0 && (
                  <>
                    <div 
                      className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
                      onClick={() => handlePhotoUpload('https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=400')}
                    >
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Add Photo</p>
                      </div>
                    </div>
                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                      <Camera className="w-8 h-8 text-gray-400" />
                    </div>
                  </>
                )}

                {formData.photos.map((photo, index) => (
                  <div key={index} className="aspect-square relative">
                    <img
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removePhoto(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {formData.photos.length < 6 && (
                  <button
                    onClick={() => handlePhotoUpload('https://images.pexels.com/photos/1462980/pexels-photo-1462980.jpeg?auto=compress&cs=tinysrgb&w=400')}
                    className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <Plus className="w-8 h-8 text-gray-400" />
                  </button>
                )}
              </div>

              <div className="flex gap-4">
                <button onClick={prevStep} className="flex-1 btn-outline">
                  Previous
                </button>
                <button onClick={nextStep} className="flex-1 btn-primary">
                  Next Step
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Partner Preferences</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age Range</label>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    value={formData.preferences.ageRange[0]}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        ageRange: [parseInt(e.target.value), prev.preferences.ageRange[1]]
                      }
                    }))}
                    className="input-field"
                    placeholder="Min age"
                    min="18"
                    max="60"
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="number"
                    value={formData.preferences.ageRange[1]}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        ageRange: [prev.preferences.ageRange[0], parseInt(e.target.value)]
                      }
                    }))}
                    className="input-field"
                    placeholder="Max age"
                    min="18"
                    max="60"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Location</label>
                <input
                  type="text"
                  value={formData.preferences.location}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    preferences: {
                      ...prev.preferences,
                      location: e.target.value
                    }
                  }))}
                  className="input-field"
                  placeholder="Any specific location preference"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Education Preference</label>
                  <input
                    type="text"
                    value={formData.preferences.education}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        education: e.target.value
                      }
                    }))}
                    className="input-field"
                    placeholder="Education preference"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profession Preference</label>
                  <input
                    type="text"
                    value={formData.preferences.profession}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        profession: e.target.value
                      }
                    }))}
                    className="input-field"
                    placeholder="Profession preference"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button onClick={prevStep} className="flex-1 btn-outline">
                  Previous
                </button>
                <button onClick={handleSubmit} className="flex-1 btn-primary">
                  Complete Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;