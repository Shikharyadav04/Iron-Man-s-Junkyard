// AuthProvider.jsx
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // AuthProvider.jsx
  const login = async (credentials) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/users/login',
        JSON.stringify(credentials), // Ensure you stringify the JSON
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      setUser(response.data.user); // Assuming response has a user field
      return response.data.user;
    } catch (error) {
      console.error("Login error:", error); // Log the error for debugging
      throw error; // Rethrow to handle it in the component
    }
  };

  
  
  
  
  
  
  
  
  
  
  

  const register = async (userData) => {
    try {
      const response = await axios.post("/api/v1/users/register", userData, {
        withCredentials: true,
      });
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };
  
  
  
  
  
  
  
  
  
  
  

  const logout = async () => {
    await axios.post('/api/v1/users/logout', {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
