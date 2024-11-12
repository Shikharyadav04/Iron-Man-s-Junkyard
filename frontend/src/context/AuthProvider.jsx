import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check for user session on mount
  useEffect(() => {
    const checkUserSession = async () => {
      const storedUserId = localStorage.getItem("userId");
      const accessToken = Cookies.get("aToken");
      const refreshToken = Cookies.get("rToken");
      console.log("getaccessToken: ", accessToken);
      console.log("getrefreshToken ", refreshToken);

      if (storedUserId && accessToken) {
        try {
          // Optionally fetch user details from the backend
          const response = await axios.post(
            "http://localhost:8000/api/v1/users/refreshToken",
            {
              refreshToken: refreshToken,
            }
          );
          console.log("refreshTokenworkuser : : ", response.data.data.user);
          setUser(response.data.data.user);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          logout(); // If fetching user data fails, clear the session
        }
      }
    };

    checkUserSession();
  }, []);

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
        // Save user data to persist session
        localStorage.setItem("userId", loggedInUser._id);
        console.log("loggedinuser : ", loggedInUser);

        Cookies.set("aToken", response.data.data.user.accessToken, {
          expires: 10,
        });
        Cookies.set("rToken", response.data.data.user.refreshToken, {
          expires: 10,
        });
        console.log("accessToken: " + response.data.data.user.accessToken);
        console.log("refreshToken : ", response.data.data.user.refreshToken);

        // Navigate based on user role
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
    localStorage.removeItem("userId");
    Cookies.remove("accessToken");
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
        setUser(userData);

        localStorage.setItem("userId", userData._id);
        Cookies.set("accessToken", response.data.data.accessToken, {
          expires: 1,
        });

        navigate(`/${userData.role}`);
        return userData;
      } else {
        throw new Error(response.data.message || "Registration failed");
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  };

  const registerDealer = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/dealer-request",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        return response.data; // Return the API response data
      } else {
        throw new Error(response.data.message || "Registration failed");
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, registerDealer }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
