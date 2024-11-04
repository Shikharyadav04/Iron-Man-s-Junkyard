import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

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

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user) {
          setUserData({
            fullName: user.fullName,
            email: user.email,
            avatar: user.avatar || "/default-avatar.png", // Use default avatar if none exists
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

  if (loading) return <div>Loading user data...</div>;

  return (
    <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md max-w-lg mx-auto w-full">
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={userData.avatar}
          alt="User Avatar"
          className="w-24 h-24 rounded-full border-2 border-indigo-600"
        />
        <div>
          <h1 className="text-2xl font-semibold">{userData.fullName}</h1>
          <p className="text-gray-600">{userData.email}</p>
        </div>
      </div>

      {successMessage && <div className="text-green-600 mb-4">{successMessage}</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}

      {/* Update Username */}
      <form onSubmit={handleUpdateUserDetails} className="space-y-4 w-full">
        <input
          type="text"
          value={userData.fullName}
          onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
          placeholder="Full Name"
          className="p-2 border rounded w-full"
        />
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded w-full">
          Update Username
        </button>
      </form>

      {/* Change Password */}
      <form onSubmit={handleChangePassword} className="space-y-4 mt-4 w-full">
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
          Change Password
        </button>
      </form>

      {/* Avatar Upload */}
      <form onSubmit={handleAvatarUpload} className="space-y-4 mt-4 w-full">
        <input
          type="file"
          onChange={(e) => setAvatarFile(e.target.files[0])}
          className="p-2 border rounded w-full"
        />
        <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded w-full">
          Upload Avatar
        </button>
      </form>

      {/* Button to Create New Request */}
      {user?.role === "customer" && ( // Fixed condition to check if the role is "customer"
        <button
          onClick={() => navigate("/customer/request-creation")}
          className="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200 w-full mt-4"
        >
          Create New Request
        </button>
      )}
    </div>
  );
};

export default Profile;
