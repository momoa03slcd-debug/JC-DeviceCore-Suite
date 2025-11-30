import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Try to get saved user from localStorage
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('jc-user');
      return savedUser ? JSON.parse(savedUser) : null;
    }
    return null;
  });

  const isAuthenticated = !!user;

  useEffect(() => {
    if (user) {
      localStorage.setItem('jc-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('jc-user');
    }
  }, [user]);

  const login = (userData) => {
    // Mock login - in real app this would call backend API
    const mockUser = {
      id: '1',
      email: userData.email,
      name: userData.name || 'Demo User',
      company: userData.company || 'Demo Company',
      role: userData.role || 'admin', // admin, technician, viewer
      avatar: null,
    };
    setUser(mockUser);
    return { success: true, user: mockUser };
  };

  const logout = () => {
    setUser(null);
  };

  const register = (userData) => {
    // Mock registration
    return login(userData);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
