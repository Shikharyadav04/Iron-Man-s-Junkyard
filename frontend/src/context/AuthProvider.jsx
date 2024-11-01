import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Cookies from "js-cookie"; // Import js-cookie for cookie handling

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const login = async (credentials) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        credentials,
        { withCredentials: true }
      );

      if (response.data.success) {
        const loggedInUser = response.data.data.user;
        setUser(loggedInUser);

        // Save the user's ID in localStorage
        localStorage.setItem("userId", loggedInUser._id);

        // Save the access token in a cookie (expires in 1 day)
        Cookies.set("accessToken", response.data.data.accessToken, {
          expires: 1,
        });

        // Navigate to the user's role-based page
        navigate(`/${loggedInUser.role}`);

        return loggedInUser;
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
    localStorage.removeItem("userId"); // Remove user ID from localStorage
    Cookies.remove("accessToken"); // Remove access token cookie
    navigate("/login");
  };

  const register = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        data
      );

      if (response.data.success) {
        const userData = response.data.data.user;
        setUser(userData); // Set the user state

        // Save the user's ID in localStorage
        localStorage.setItem("userId", userData._id);

        // Save the access token in a cookie (expires in 1 day)
        Cookies.set("accessToken", response.data.data.accessToken, {
          expires: 1,
        });

        // Navigate to the user's role-based page after registration
        navigate(`/${userData.role}`);

        return userData; // Optionally return user data
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
