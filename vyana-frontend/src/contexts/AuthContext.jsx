import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('vyana_token'));

  useEffect(() => {
    // Check if user is logged in on app load
    const storedUser = localStorage.getItem('vyana_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('vyana_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simulated API call - Replace with actual backend
      const mockResponse = {
        data: {
          user: {
            id: '1',
            email,
            name: email.split('@')[0],
            role: 'user'
          },
          token: 'mock_jwt_token_12345'
        }
      };

      setUser(mockResponse.data.user);
      setToken(mockResponse.data.token);
      
      localStorage.setItem('vyana_user', JSON.stringify(mockResponse.data.user));
      localStorage.setItem('vyana_token', mockResponse.data.token);
      
      toast.success('Login successful!');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      return { success: false, error };
    }
  };

  const signup = async (userData) => {
    try {
      // Simulated API call
      const mockResponse = {
        data: {
          user: {
            id: '2',
            email: userData.email,
            name: userData.name,
            role: 'user'
          },
          token: 'mock_jwt_token_67890'
        }
      };

      setUser(mockResponse.data.user);
      setToken(mockResponse.data.token);
      
      localStorage.setItem('vyana_user', JSON.stringify(mockResponse.data.user));
      localStorage.setItem('vyana_token', mockResponse.data.token);
      
      toast.success('Account created successfully!');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
      return { success: false, error };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('vyana_user');
    localStorage.removeItem('vyana_token');
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    token,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};