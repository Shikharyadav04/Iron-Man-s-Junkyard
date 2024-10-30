import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const login = async (credentials) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        credentials
      );

      if (response.data.success) {
        setUser(response.data.data.user);
        localStorage.setItem("jwttoken", response.data.token);
        
        // Navigate to the user's role-based page
        navigate(`/${response.data.data.user.role}`);

        return response.data.data.user;
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (error) {
      let errorMessage = "Login failed. Please try again.";
      if (error.response && error.response.data) {
        errorMessage = error.response.data.message || error.message;
      }
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("jwttoken");
    navigate("/login");
  };

  const register = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        data
      );
      if (response.data.success) {
        // Automatically log in the user after successful registration if desired
        const userData = response.data.data.user;
        setUser(userData);
        localStorage.setItem("jwttoken", response.data.token);
        navigate(`/${userData.role}`);
      } else {
        throw new Error(response.data.message || "Registration failed");
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
