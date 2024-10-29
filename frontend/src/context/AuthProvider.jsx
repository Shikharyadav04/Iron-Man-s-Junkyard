import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        credentials
      );

      if (response.data.success) {
        setUser(response.data.data.user);
        localStorage.setItem("token", response.data.token);
        return response.data.data.user; // Return user object
      } else {
        console.error("Login failed:", response.data.message);
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message
      );
      throw new Error("Login failed. Please try again.");
    }
  };

  const register = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        formData
      );

      if (response.data.success) {
        return response.data; // Return the response data
      } else {
        console.error("Registration failed:", response.data.message);
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error(
        "Registration error:",
        error.response ? error.response.data : error.message
      );
      throw new Error("Registration failed. Please try again.");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
