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
  const [activeForm, setActiveForm] = useState(null);
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
    const payload = { fullName: userData.fullName, email: userData.email };
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
      setError(error.response?.data.message || "An error occurred while updating user details.");
    }
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();
    const payload = { oldPassword, newPassword };
    try {
      await axios.post("http://localhost:8000/api/v1/users/change-password", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      setSuccessMessage("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      setError(error.response?.data.message || "An error occurred while changing the password.");
    }
  };

  const handleAvatarUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("avatar", avatarFile);
    try {
      const response = await axios.patch("http://localhost:8000/api/v1/users/avatar", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      setUserData(response.data.data);
      setSuccessMessage("Avatar updated successfully!");
    } catch (error) {
      setError(error.response?.data.message || "An error occurred while updating the avatar.");
    }
  };

  if (loading) return <div className="text-center">Loading user data...</div>;

  const handleSeeChatsClick = () => {
    navigate("/chats");
  };

  return (
  <div className="relative flex flex-col items-center  bg-transparent p-8  w-full">
    {successMessage && <div className="text-green-600 mb-4">{successMessage}</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-20">
        {/* Change Password Card */}
        <div className="bg-transparent py-20 w-70 rounded-lg shadow hover:shadow-md transition-shadow duration-300 text-center">
          <img className="h-20 mx-auto mb-3" src={assets.password} alt="Change Password" />
          <button
            onClick={() => setActiveForm(activeForm === "password" ? null : "password")}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded w-full font-semibold"
          >
            Change Password
          </button>
          {activeForm === "password" && (
            <form onSubmit={handleChangePassword} className="mt-4 space-y-3">
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Old Password"
                className="p-3 border rounded w-full"
              />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                className="p-3 border rounded w-full"
              />
              <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded w-full">
                Submit
              </button>
            </form>
          )}
        </div>

        {/* Upload Avatar Card */}
        <div className="bg-transparent py-20 w-70 rounded-lg shadow hover:shadow-md transition-shadow duration-300 text-center">
          <img className="h-20 mx-auto mb-3" src={assets.avatar} alt="Change Avatar" />
          <button
            onClick={() => setActiveForm(activeForm === "avatar" ? null : "avatar")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded w-full font-semibold"
          >
            Change Avatar
          </button>
          {activeForm === "avatar" && (
            <form onSubmit={handleAvatarUpload} className="mt-4 space-y-3">
              <input
                type="file"
                onChange={(e) => setAvatarFile(e.target.files[0])}
                className="p-3 border rounded w-full"
              />
              <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded w-full">
                Upload
              </button>
            </form>
          )}
        </div>

        {/* Update Username Card */}
        <div className="bg-transparent py-20 w-70 rounded-lg shadow hover:shadow-md transition-shadow duration-300 text-center">
          <img className="h-20 mx-auto mb-3" src={assets.username} alt="Change Password" />
          <button
            onClick={() => setActiveForm(activeForm === "username" ? null : "username")}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full font-semibold"
          >
            Update Fullname
          </button>
          {activeForm === "username" && (
            <form onSubmit={handleUpdateUserDetails} className="mt-4 space-y-3">
              <input
                type="text"
                value={userData.fullName}
                onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                placeholder="Full Name"
                className="p-3 border rounded w-full"
              />
              <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded w-full">
                Update
              </button>
            </form>
          )}
        </div>

        {/* Create Scrap Request Card */}
        {user?.role === "customer" && (
          <div className="bg-transparent h-25 py-20 w-90 rounded-lg shadow hover:shadow-md transition-shadow duration-300 text-center">
           <img className="h-20 mx-auto mb-3" src={assets.createscrap} alt="Change Password" />
            <button
              onClick={() => navigate("/customer/request-creation")}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded w-full font-semibold"
            >
              Create Scrap Request
            </button>
          </div>
        )}

        {/* See Chats Button */}
        <div className="bg-transparent py-20 w-70 rounded-lg shadow hover:shadow-md transition-shadow duration-300 text-center">
          <img className="h-20 mx-auto mb-3" src={assets.chat} alt="Chat Icon" />
          <button
            onClick={handleSeeChatsClick}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            See Chats
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
