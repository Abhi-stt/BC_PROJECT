import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserProfile {
  id: string;
  name: string;
  age: number;
  location: string;
  education: string;
  profession: string;
  religion: string;
  interests: string[];
  bio: string;
  photos: string[];
  preferences: {
    ageRange: [number, number];
    location: string;
    education: string;
    profession: string;
  };
}

interface UserContextType {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (userProfile) {
      const updatedProfile = { ...userProfile, ...updates };
      setUserProfile(updatedProfile);
    }
  };

  return (
    <UserContext.Provider value={{ userProfile, setUserProfile, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
};