import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, ThumbsUp, Users, Calendar, MapPin, Plus, Filter, X } from 'lucide-react';
import api from '../services/api';

interface Post {
  id: string;
  author: {
    name: string;
    photo: string;
    verified: boolean;
  };
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  liked: boolean;
  type: 'success_story' | 'advice' | 'event' | 'general';
}

interface SuccessStory {
  id: string;
  couple: {
    name1: string;
    name2: string;
    photo1: string;
    photo2: string;
  };
  story: string;
  weddingDate: string;
  location: string;
  photos: string[];
}

interface Article {
  id: string;
  title: string;
  category: string;
  author: string;
  readTime: string;
  excerpt: string;
  content: string;
}

const Community: React.FC = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showArticle, setShowArticle] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [newPost, setNewPost] = useState({
    content: '',
    type: 'general' as const,
    image: ''
  });
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: {
        name: 'Rajesh Kumar',
        photo: 'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=400',
        verified: true
      },
      content: 'Just wanted to share some advice for first meetings - always meet in a public place and let your family know where you are. Safety first! 🙏',
      timestamp: '2 hours ago',
      likes: 24,
      comments: 8,
      shares: 3,
      liked: false,
      type: 'advice'
    },
    {
      id: '2',
      author: {
        name: 'Priya Patel',
        photo: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
        verified: true
      },
      content: 'Celebrating 6 months since we found each other on BandhanConnect! Thank you to this amazing community for all the support. ❤️',
      image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400',
      timestamp: '5 hours ago',
      likes: 156,
      comments: 23,
      shares: 12,
      liked: true,
      type: 'success_story'
    },
    {
      id: '3',
      author: {
        name: 'Community Team',
        photo: 'https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&w=400',
        verified: true
      },
      content: 'Join us for our virtual speed networking event this Saturday! Meet multiple potential matches in a fun, relaxed environment. Register now!',
      timestamp: '1 day ago',
      likes: 89,
      comments: 15,
      shares: 25,
      liked: false,
      type: 'event'
    }
  ]);

  const [successStories] = useState<SuccessStory[]>([
    {
      id: '1',
      couple: {
        name1: 'Arjun',
        name2: 'Kavya',
        photo1: 'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=400',
        photo2: 'https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      story: 'We matched on BandhanConnect in January 2024. What started as a simple conversation about our shared love for travel turned into something beautiful. Our families connected instantly, and we knew we had found our perfect match.',
      weddingDate: '2024-12-15',
      location: 'Mumbai, Maharashtra',
      photos: [
        'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=400'
      ]
    },
    {
      id: '2',
      couple: {
        name1: 'Rohit',
        name2: 'Sneha',
        photo1: 'https://images.pexels.com/photos/1462980/pexels-photo-1462980.jpeg?auto=compress&cs=tinysrgb&w=400',
        photo2: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      story: 'Our compatibility score was 98%! We were both skeptical at first, but after our first video call, we knew the algorithm got it right. Six months later, we\'re planning our future together.',
      weddingDate: '2024-11-20',
      location: 'Bangalore, Karnataka',
      photos: [
        'https://images.pexels.com/photos/1845534/pexels-photo-1845534.jpeg?auto=compress&cs=tinysrgb&w=400'
      ]
    }
  ]);

  const articles: Article[] = [
    {
      id: '1',
      title: 'First Meeting Tips',
      category: 'Dating Advice',
      author: 'Dr. Priya Sharma',
      readTime: '5 min read',
      excerpt: 'Essential tips for making a great first impression during your initial meeting.',
      content: `Meeting someone for the first time can be both exciting and nerve-wracking. Here are some essential tips to help you make a great first impression:

1. Choose the Right Location
   - Opt for a public place like a café or restaurant
   - Ensure it's well-lit and easily accessible
   - Consider a neutral location that's convenient for both parties

2. Dress Appropriately
   - Wear something that makes you feel confident
   - Keep it clean and well-fitted
   - Consider the venue when choosing your outfit

3. Be Punctual
   - Arrive 5-10 minutes early
   - This shows respect and reliability
   - Plan your route in advance to avoid delays

4. Body Language Matters
   - Maintain good eye contact
   - Sit up straight and avoid crossing your arms
   - Smile genuinely and show interest

5. Conversation Tips
   - Ask open-ended questions
   - Listen actively and respond thoughtfully
   - Share about yourself but don't dominate the conversation
   - Avoid controversial topics initially

6. Be Authentic
   - Be yourself rather than trying to impress
   - Honesty builds trust from the start
   - Don't pretend to be someone you're not

Remember, the goal is to get to know each other in a comfortable, safe environment. Trust your instincts and enjoy the process!`
    },
    {
      id: '2',
      title: 'Family Involvement Balance',
      category: 'Relationship Advice',
      author: 'Counselor Rajesh Kumar',
      readTime: '7 min read',
      excerpt: 'How to balance family expectations with personal choices in modern relationships.',
      content: `Balancing family expectations with personal choices is one of the most challenging aspects of modern relationships. Here's how to navigate this complex dynamic:

Understanding Family Perspectives
- Families often have traditional values and expectations
- They want the best for their children
- Cultural and religious beliefs play a significant role
- Generational differences in relationship expectations

Communication Strategies
- Open and honest communication with family members
- Explain your perspective without being defensive
- Listen to family concerns with empathy
- Find common ground and shared values

Setting Boundaries
- Establish clear boundaries while maintaining respect
- Make decisions as a couple first, then involve families
- Be firm but kind when expressing your choices
- Remember that you're building a new family unit

Cultural Integration
- Respect and learn about each other's cultural backgrounds
- Find ways to incorporate both families' traditions
- Create new traditions that honor both cultures
- Be patient with the learning process

Conflict Resolution
- Address conflicts directly but respectfully
- Focus on solutions rather than blame
- Consider family counseling if needed
- Remember that change takes time

Building Bridges
- Include families in important decisions when appropriate
- Celebrate milestones together
- Show appreciation for family support
- Create opportunities for families to bond

The key is finding a balance that respects both your relationship and your families' values while building a strong foundation for your future together.`
    },
    {
      id: '3',
      title: 'Communication Strategies',
      category: 'Communication',
      author: 'Dr. Anita Desai',
      readTime: '6 min read',
      excerpt: 'Effective communication techniques for building strong relationships.',
      content: `Effective communication is the foundation of any strong relationship. Here are proven strategies to enhance your communication skills:

Active Listening
- Give your full attention to your partner
- Avoid interrupting or formulating responses while they speak
- Show understanding through verbal and non-verbal cues
- Ask clarifying questions when needed

Expressing Feelings
- Use "I" statements instead of "you" statements
- Be specific about your feelings and needs
- Avoid blaming or criticizing
- Share both positive and negative emotions

Non-Verbal Communication
- Pay attention to body language and tone
- Maintain appropriate eye contact
- Use gestures to enhance understanding
- Be aware of your partner's non-verbal cues

Conflict Resolution
- Address issues promptly rather than letting them fester
- Focus on the problem, not the person
- Use "time-out" when emotions are high
- Work together to find mutually acceptable solutions

Regular Check-ins
- Schedule regular conversations about your relationship
- Discuss goals, concerns, and aspirations
- Celebrate achievements and milestones
- Address small issues before they become big problems

Cultural and Language Considerations
- Be patient with language barriers
- Learn about cultural communication styles
- Adapt your communication style when needed
- Seek clarification when cultural differences arise

Digital Communication
- Use technology to stay connected
- Be mindful of tone in text messages
- Schedule video calls for important conversations
- Balance digital and in-person communication

Remember, good communication is a skill that improves with practice. Be patient with yourself and your partner as you develop these skills together.`
    },
    {
      id: '4',
      title: 'Cultural Compatibility',
      category: 'Cultural Advice',
      author: 'Prof. Vikram Singh',
      readTime: '8 min read',
      excerpt: 'Understanding and navigating cultural differences in relationships.',
      content: `Cultural compatibility is crucial for long-term relationship success. Here's how to understand and navigate cultural differences:

Understanding Cultural Backgrounds
- Learn about each other's cultural heritage
- Understand family traditions and values
- Recognize the influence of cultural upbringing
- Appreciate the diversity of perspectives

Cultural Values and Beliefs
- Discuss core values and beliefs openly
- Identify areas of alignment and difference
- Respect different viewpoints and traditions
- Find ways to honor both cultures

Family Dynamics
- Understand family roles and expectations
- Learn about cultural family structures
- Navigate family involvement appropriately
- Build relationships with extended family

Religious and Spiritual Beliefs
- Discuss religious practices and beliefs
- Find ways to respect different faiths
- Plan for religious celebrations and observances
- Consider how religion will influence your future

Language and Communication
- Be patient with language differences
- Learn key phrases in each other's languages
- Use translation tools when needed
- Celebrate linguistic diversity

Cultural Celebrations
- Participate in each other's cultural celebrations
- Learn about traditional customs and rituals
- Create new traditions that blend both cultures
- Share cultural experiences with families

Food and Cuisine
- Explore each other's traditional cuisines
- Learn to cook traditional dishes together
- Share food culture with families
- Create fusion meals that blend both cultures

Education and Career
- Understand cultural perspectives on education
- Discuss career goals and family expectations
- Balance individual aspirations with family values
- Support each other's professional growth

Remember, cultural compatibility doesn't mean being identical - it means respecting and celebrating differences while building a shared future together.`
    },
    {
      id: '5',
      title: 'Long Distance Relationships',
      category: 'Relationship Advice',
      author: 'Dr. Meera Patel',
      readTime: '10 min read',
      excerpt: 'Making long distance relationships work in the digital age.',
      content: `Long distance relationships can be challenging, but with the right strategies, they can thrive. Here's how to make your long distance relationship work:

Communication is Key
- Establish regular communication schedules
- Use multiple communication channels (video, voice, text)
- Be creative with your communication methods
- Share daily experiences and feelings

Trust and Transparency
- Build trust through honest communication
- Share your daily activities and social interactions
- Be transparent about your feelings and concerns
- Avoid situations that might create doubt

Quality Time Together
- Schedule regular video calls and virtual dates
- Plan activities you can do together online
- Watch movies or shows simultaneously
- Play online games or take virtual tours

Managing Expectations
- Set realistic expectations about communication frequency
- Discuss future plans and goals
- Be patient with time zone differences
- Understand that challenges are normal

Dealing with Challenges
- Address conflicts promptly and constructively
- Use "time-out" when emotions are high
- Focus on solutions rather than blame
- Seek support from friends and family

Planning for the Future
- Discuss long-term goals and timelines
- Plan visits and reunions in advance
- Work towards closing the distance
- Celebrate milestones and achievements

Self-Care and Independence
- Maintain your individual interests and hobbies
- Build a support network of friends and family
- Take care of your physical and mental health
- Pursue personal and professional goals

Technology Tools
- Use apps designed for long distance couples
- Share photos and videos regularly
- Use shared calendars for planning
- Create shared playlists or photo albums

Remember, long distance relationships require extra effort, but they can be just as fulfilling as geographically close relationships when both partners are committed to making it work.`
    },
    {
      id: '6',
      title: 'Wedding Planning Basics',
      category: 'Wedding Advice',
      author: 'Event Planner Kavya',
      readTime: '12 min read',
      excerpt: 'A comprehensive guide to planning your dream Indian wedding.',
      content: `Planning an Indian wedding is an exciting journey that requires careful organization and cultural understanding. Here's a comprehensive guide:

Early Planning (12-18 months before)
- Set your budget and stick to it
- Choose your wedding date (consider auspicious dates)
- Book your venue and key vendors
- Create a guest list and send save-the-dates
- Research and book photographers and videographers

Cultural Considerations
- Understand the significance of various ceremonies
- Plan traditional rituals and customs
- Coordinate with both families for cultural requirements
- Respect religious and cultural traditions
- Include family elders in decision-making

Venue and Decor
- Choose venues that accommodate your guest count
- Consider separate venues for different ceremonies
- Plan decor that reflects your cultural heritage
- Work with decorators who understand Indian weddings
- Create a cohesive theme across all events

Catering and Food
- Plan menus that accommodate all dietary preferences
- Include traditional dishes and modern options
- Consider multiple meal services for long events
- Arrange for special dietary requirements
- Plan for food safety and hygiene

Attire and Jewelry
- Start shopping for wedding attire early
- Consider multiple outfit changes for different ceremonies
- Plan jewelry and accessories
- Arrange for alterations and fittings
- Coordinate colors and styles with family

Photography and Videography
- Book experienced Indian wedding photographers
- Plan for coverage of all ceremonies
- Discuss cultural photography requirements
- Arrange for candid and traditional shots
- Plan for drone photography if desired

Entertainment and Music
- Book traditional musicians and DJs
- Plan for different types of music for different events
- Arrange for dance performances
- Consider interactive entertainment
- Plan for sound and lighting requirements

Guest Management
- Create detailed guest lists for each event
- Plan accommodation for out-of-town guests
- Arrange transportation for guests
- Create welcome packages
- Plan for guest comfort and convenience

Timeline and Coordination
- Create detailed timelines for each event
- Assign responsibilities to family members
- Hire a wedding coordinator if needed
- Plan for contingencies and backup plans
- Ensure smooth transitions between events

Remember, while planning is important, don't forget to enjoy the journey and celebrate your love story with family and friends!`
    }
  ];

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleCreatePost = async () => {
    if (!newPost.content) return;
    setSubmitting(true);
    try {
      const payload = {
        author: {
          name: 'You',
          photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
          verified: true
        },
        content: newPost.content,
        image: newPost.image,
        timestamp: 'Just now',
        type: newPost.type
      };
      const res = await api.post('/posts', payload);
      const savedPost = res.data;
      setPosts([{ ...savedPost, id: savedPost._id || Date.now().toString(), likes: 0, comments: 0, shares: 0, liked: false }, ...posts]);
      setNewPost({ content: '', type: 'general', image: '' });
      setShowCreatePost(false);
    } catch (err) {
      alert('Failed to create post. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegisterEvent = (eventTitle: string) => {
    if (registeredEvents.includes(eventTitle)) {
      setRegisteredEvents(registeredEvents.filter(e => e !== eventTitle));
    } else {
      setRegisteredEvents([...registeredEvents, eventTitle]);
    }
  };

  const handleReadArticle = (article: Article) => {
    setSelectedArticle(article);
    setShowArticle(true);
  };

  const formatTime = (timestamp: string) => {
    return timestamp;
  };

  return (
    <div className="fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Community</h1>
          <p className="text-gray-600">Connect with others on their journey to find love</p>
        </div>
        <button 
          onClick={() => setShowCreatePost(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Post
        </button>
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Create Post</h3>
              <button onClick={() => setShowCreatePost(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <textarea
                className="input-field w-full h-24 resize-none"
                placeholder="What's on your mind? Share your thoughts, advice, or a success story..."
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              />
              <div className="flex gap-2">
                <select
                  className="input-field"
                  value={newPost.type}
                  onChange={(e) => setNewPost({ ...newPost, type: e.target.value as Post['type'] })}
                >
                  <option value="general">General</option>
                  <option value="advice">Advice</option>
                  <option value="success_story">Success Story</option>
                  <option value="event">Event</option>
                </select>
                <input
                  type="text"
                  className="input-field flex-1"
                  placeholder="Image URL (optional)"
                  value={newPost.image}
                  onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCreatePost}
                  className="btn-primary flex-1"
                  disabled={submitting}
                >
                  {submitting ? 'Posting...' : 'Post'}
                </button>
                <button
                  onClick={() => setShowCreatePost(false)}
                  className="btn-outline flex-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Article Modal */}
      {showArticle && selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">{selectedArticle.title}</h3>
              <button 
                onClick={() => setShowArticle(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mb-4">
              <span className="px-2 py-1 bg-saffron/10 text-saffron rounded-full text-xs font-medium">
                {selectedArticle.category}
              </span>
              <span className="ml-2 text-sm text-gray-500">
                By {selectedArticle.author} • {selectedArticle.readTime}
              </span>
            </div>
            <div className="prose max-w-none">
              {selectedArticle.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
        {[
          { id: 'feed', label: 'Community Feed' },
          { id: 'stories', label: 'Success Stories' },
          { id: 'events', label: 'Events' },
          { id: 'advice', label: 'Advice Corner' }
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

      {/* Community Feed */}
      {activeTab === 'feed' && (
        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className="card p-6">
              <div className="flex items-start gap-4">
                <img
                  src={post.author.photo}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                    {post.author.verified && (
                      <div className="verification-badge">
                        <Heart className="w-3 h-3" />
                        Verified
                      </div>
                    )}
                    <span className="text-sm text-gray-500">• {formatTime(post.timestamp)}</span>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{post.content}</p>
                  
                  {post.image && (
                    <img
                      src={post.image}
                      alt="Post image"
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                  )}
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-6">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center gap-2 ${
                          post.liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                        }`}
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-sm">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-500 hover:text-green-500">
                        <Share2 className="w-4 h-4" />
                        <span className="text-sm">{post.shares}</span>
                      </button>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      post.type === 'success_story' ? 'bg-green-100 text-green-800' :
                      post.type === 'advice' ? 'bg-blue-100 text-blue-800' :
                      post.type === 'event' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {post.type.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Success Stories */}
      {activeTab === 'stories' && (
        <div className="space-y-8">
          {successStories.map(story => (
            <div key={story.id} className="card p-8">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <img
                    src={story.couple.photo1}
                    alt={story.couple.name1}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <Heart className="w-8 h-8 text-red-500" />
                  <img
                    src={story.couple.photo2}
                    alt={story.couple.name2}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {story.couple.name1} & {story.couple.name2}
                </h3>
                <div className="flex items-center justify-center gap-4 text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Wedding: {new Date(story.weddingDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{story.location}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6 text-center">
                "{story.story}"
              </p>
              
              {story.photos.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {story.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`${story.couple.name1} & ${story.couple.name2} photo ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Events */}
      {activeTab === 'events' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Virtual Speed Networking',
                date: 'Saturday, Feb 10, 2024',
                time: '7:00 PM - 9:00 PM',
                participants: 45,
                description: 'Meet multiple potential matches in a fun, structured environment'
              },
              {
                title: 'Cultural Exchange Workshop',
                date: 'Sunday, Feb 18, 2024',
                time: '3:00 PM - 5:00 PM',
                participants: 32,
                description: 'Learn about different cultural traditions and values'
              },
              {
                title: 'Relationship Building Seminar',
                date: 'Friday, Feb 23, 2024',
                time: '6:00 PM - 8:00 PM',
                participants: 28,
                description: 'Expert advice on building strong, lasting relationships'
              },
              {
                title: 'Family Integration Workshop',
                date: 'Saturday, Mar 2, 2024',
                time: '4:00 PM - 6:00 PM',
                participants: 38,
                description: 'Navigate family dynamics in modern relationships'
              }
            ].map((event, index) => (
              <div key={index} className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{event.participants} participants</span>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{event.description}</p>
                <button 
                  onClick={() => handleRegisterEvent(event.title)}
                  className={`w-full ${
                    registeredEvents.includes(event.title) 
                      ? 'btn-outline' 
                      : 'btn-primary'
                  }`}
                >
                  {registeredEvents.includes(event.title) ? 'Registered ✓' : 'Register Now'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Advice Corner */}
      {activeTab === 'advice' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <div key={index} className="card p-6">
                <div className="mb-4">
                  <span className="px-2 py-1 bg-saffron/10 text-saffron rounded-full text-xs font-medium">
                    {article.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{article.title}</h3>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>By {article.author}</span>
                  <span>{article.readTime}</span>
                </div>
                <button 
                  onClick={() => handleReadArticle(article)}
                  className="btn-outline w-full mt-4"
                >
                  Read Article
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;