import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { assets } from "@/assets/assets.js";

const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    avatar: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [activeForm, setActiveForm] = useState(null); // Form toggle state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user) {
          setUserData({
            fullName: user.fullName,
            email: user.email,
            avatar: user.avatar || "/default-avatar.png",
          });
        } else {
          throw new Error("User not found");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleUpdateUserDetails = async (event) => {
    event.preventDefault();
    const payload = {
      fullName: userData.fullName,
      email: userData.email,
    };

    try {
      const response = await axios.patch(
        "http://localhost:8000/api/v1/users/update-account",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      setUserData(response.data.data);
      setSuccessMessage("User details updated successfully!");
    } catch (error) {
      setError(
        error.response?.data.message || "An error occurred while updating user details."
      );
    }
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();

    const payload = {
      oldPassword,
      newPassword,
    };

    try {
      await axios.post(
        "http://localhost:8000/api/v1/users/change-password",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      setSuccessMessage("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      setError(
        error.response?.data.message || "An error occurred while changing the password."
      );
    }
  };

  const handleAvatarUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("avatar", avatarFile);

    try {
      const response = await axios.patch(
        "http://localhost:8000/api/v1/users/avatar",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      setUserData(response.data.data);
      setSuccessMessage("Avatar updated successfully!");
    } catch (error) {
      setError(
        error.response?.data.message || "An error occurred while updating the avatar."
      );
    }
  };
  const handleSeeChatsClick = () => {
    navigate("/chats"); // Navigate to the Chat page
  };

  if (loading) return <div>Loading user data...</div>;

  return (
    <div className="relative flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md max-w-3xl mx-auto w-full ">
      
      
      
      

      
    

      
      
      
      
      
      
      
      
      
      
      
      

      {successMessage && <div className="text-green-600 mb-4">{successMessage}</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 w-full">
        {/* Change Password Card */}
        <div className="bg-white p-4 rounded shadow">
          <img className='' src={assets.password}/>
          <button
            onClick={() => setActiveForm(activeForm === "password" ? null : "password")}
            className="bg-green-600 text-white py-2 px-4 rounded w-full"
          >
            Change Password
          </button>
          {activeForm === "password" && (
            <form onSubmit={handleChangePassword} className="space-y-4 mt-4">
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Old Password"
                className="p-2 border rounded w-full"
              />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                className="p-2 border rounded w-full"
              />
              <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded w-full">
                Submit
              </button>
            </form>
          )}
        </div>

        {/* Upload Avatar Card */}
        <div className="bg-white p-4 rounded shadow">
          <img src={assets.avatar}/>
          <button
            onClick={() => setActiveForm(activeForm === "avatar" ? null : "avatar")}
            className="bg-indigo-600 text-white py-2 px-4 rounded w-full"
          >
            Change Avatar
          </button>
          {activeForm === "avatar" && (
            <form onSubmit={handleAvatarUpload} className="space-y-4 mt-4">
              <input
                type="file"
                onChange={(e) => setAvatarFile(e.target.files[0])}
                className="p-2 border rounded w-full"
              />
              <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded w-full">
                Upload
              </button>
            </form>
          )}
        </div>

        {/* Update Username Card */}
        <div className="bg-white p-4 rounded shadow">
          <button
            onClick={() => setActiveForm(activeForm === "username" ? null : "username")}
            className="bg-blue-600 text-white py-2 px-4 rounded w-full"
          >
            Update Username
          </button>
          {activeForm === "username" && (
            <form onSubmit={handleUpdateUserDetails} className="space-y-4 mt-4">
              <input
                type="text"
                value={userData.fullName}
                onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                placeholder="Full Name"
                className="p-2 border rounded w-full"
              />
              <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded w-full">
                Update
              </button>
            </form>
          )}
        </div>

        {/* Create Scrap Request Card */}
        {user?.role === "customer" && (
          <div className="bg-white p-4 rounded shadow">
            <button
              onClick={() => navigate("/customer/request-creation")}
              className="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200 w-full"
            >
              Create Scrap Request
            </button>
          </div>
        )}
        <div className="flex-1 p-6 overflow-y-auto">
         
         
          <button
            onClick={handleSeeChatsClick}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            See Chats
          </button>
        </div>

        
      </div>
    </div>
  );
};

export default Profile;
