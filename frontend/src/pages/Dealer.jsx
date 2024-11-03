import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dealer = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    avatar: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [updateFormOpen, setUpdateFormOpen] = useState(false);
  const [passwordFormOpen, setPasswordFormOpen] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUserData({
        fullName: user.fullName,
        email: user.email,
        avatar: user.avatar || "",
      });
      setLoading(false);
    } else {
      setError("User not found");
      setLoading(false);
    }
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
        JSON.stringify(payload),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setUserData(response.data.data);
      setSuccessMessage("User details updated successfully!");
    } catch (error) {
      setError(
        error.response?.data.message ||
          "An error occurred while updating user details."
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
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/change-password",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setSuccessMessage("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      setError(
        error.response?.data.message ||
          "An error occurred while changing the password."
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
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setUserData(response.data.data);
      setSuccessMessage("Avatar updated successfully!");
    } catch (error) {
      setError(
        error.response?.data.message ||
          "An error occurred while updating the avatar."
      );
    }
  };

  if (loading) {
    return <div>Loading user data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center bg-gray-50 p-6 rounded-lg shadow-md max-w-lg mx-auto w-full">
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
      {successMessage && (
        <div className="text-green-600 mb-4">{successMessage}</div>
      )}
      {error && <div className="text-red-600 mb-4">{error}</div>}

      <button
        onClick={() => setUpdateFormOpen(!updateFormOpen)}
        className="mb-4 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 w-full"
      >
        {updateFormOpen ? "Close Update User Form" : "Update User Details"}
      </button>

      {updateFormOpen && (
        <form onSubmit={handleUpdateUserDetails} className="space-y-4 w-full">
          <input
            type="text"
            value={userData.fullName}
            onChange={(e) =>
              setUserData({ ...userData, fullName: e.target.value })
            }
            placeholder="Full Name"
            className="p-2 border rounded w-full"
            required
          />
          <input
            type="email"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            placeholder="Email"
            className="p-2 border rounded w-full"
            required
          />
          <button
            type="submit"
            className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200 w-full"
          >
            Update User
          </button>
        </form>
      )}

      <button
        onClick={() => setPasswordFormOpen(!passwordFormOpen)}
        className="mb-4 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 w-full"
      >
        {passwordFormOpen ? "Close Change Password Form" : "Change Password"}
      </button>

      {passwordFormOpen && (
        <form onSubmit={handleChangePassword} className="space-y-4 w-full">
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Old Password"
            className="p-2 border rounded w-full"
            required
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            className="p-2 border rounded w-full"
            required
          />
          <button
            type="submit"
            className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200 w-full"
          >
            Change Password
          </button>
        </form>
      )}

      <form onSubmit={handleAvatarUpload} className="space-y-4 w-full">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setAvatarFile(e.target.files[0])}
          className="p-2 border rounded w-full"
        />
        <button
          type="submit"
          className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200 w-full"
        >
          Upload Avatar
        </button>
      </form>
      <button
        onClick={() => navigate("/dealer/requests")}
        className="mb-4 mt-4 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 w-full"
      >
        View Available Requests
      </button>
      <button
        onClick={() => navigate("/dealer/acceptedRequests")}
        className="mb-4 mt-4 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 w-full"
      >
        View Accepted Requests
      </button>
      
    </div>
  );
};

export default Dealer;
