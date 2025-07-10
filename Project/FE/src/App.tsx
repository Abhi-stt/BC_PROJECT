import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CreateProfile from './pages/CreateProfile';
import Matches from './pages/Matches';
import Messages from './pages/Messages';
import Chat from './pages/Chat';
import Search from './pages/Search';
import Admin from './pages/Admin';
import Verification from './pages/Verification';
import Timeline from './pages/Timeline';
import Community from './pages/Community';
import Events from './pages/Events';
import Services from './pages/Services';
import Analytics from './pages/Analytics';
import AIAssistant from './pages/AIAssistant';
import VideoCall from './pages/VideoCall';
import Counseling from './pages/Counseling';
import WeddingPlanning from './pages/WeddingPlanning';
import Support from './pages/Support';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <NotificationProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verification" element={<Verification />} />
              <Route path="/create-profile" element={<CreateProfile />} />
              <Route path="/app" element={<Layout />}>
                <Route index element={<Matches />} />
                <Route path="matches" element={<Matches />} />
                <Route path="search" element={<Search />} />
                <Route path="messages" element={<Messages />} />
                <Route path="chat/:userId" element={<Chat />} />
                <Route path="video-call/:userId" element={<VideoCall />} />
                <Route path="profile" element={<Profile />} />
                <Route path="timeline" element={<Timeline />} />
                <Route path="community" element={<Community />} />
                <Route path="services" element={<Services />} />
                <Route path="counseling" element={<Counseling />} />
                <Route path="wedding-planning" element={<WeddingPlanning />} />
                <Route path="ai-assistant" element={<AIAssistant />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="admin" element={<Admin />} />
                <Route path="events" element={<Events />} />
                <Route path="support" element={<Support />} />
              </Route>
            </Routes>
          </Router>
        </NotificationProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;