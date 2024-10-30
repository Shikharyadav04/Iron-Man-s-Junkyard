import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Cookies from "js-cookie"; // Import js-cookie

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
        localStorage.setItem("jwttoken", response.data.token); // Change to jwttoken
        Cookies.set("jwttoken", response.data.token, { expires: 7 }); // Change to jwttoken
        return response.data.data.user; // Return user object
      } else {
        console.error("Login failed:", response.data.message);
        throw new Error(response.data.message);
      }
    } catch (error) {
      let errorMessage = "Login failed. Please try again."; // Default message
      if (error.response && error.response.data) {
        errorMessage = error.response.data.message || error.message; // Extract the message from the response
        console.error("Login error:", errorMessage);
      } else {
        console.error("Login error:", error.message);
      }
      throw new Error(errorMessage); // Throw the specific error message
    }
  };

  const register = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Handle FormData
          },
        }
      );

      if (response.data.success) {
        const registeredUser = response.data.data.user; // Assuming user data is returned
        setUser(registeredUser); // Update the user state

        // Navigate to the respective role-based page
        if (registeredUser.role === "admin") {
          navigate("/admin");
        } else if (registeredUser.role === "dealer") {
          navigate("/dealer");
        } else {
          navigate("/customer");
        }

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
    localStorage.removeItem("jwttoken"); // Change to jwttoken
    Cookies.remove("jwttoken"); // Change to jwttoken
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
