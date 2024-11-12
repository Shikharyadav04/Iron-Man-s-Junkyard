import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLoader } from "@/context/LoaderContext";

function UserCard({ user }) {
  const { showLoader, hideLoader } = useLoader();
  const [message, setMessage] = useState("");

  const ban = async (username) => {
    showLoader();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/admin/ban",
        { username },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response && response.data && response.data.message) {
        setMessage(response.data.message);
        toast.success(response.data.message);
      } else {
        setMessage("Action completed, but no response message.");
        toast.warn("Action completed, but no response message.");
      }

      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred";
      setMessage(errorMessage);
      toast.error(errorMessage);
    } finally {
      hideLoader();
    }
  };

  return (
    <div className="bg-gray-100 rounded-lg p-4 shadow-md flex flex-col space-y-4 transform transition duration-200 hover:shadow-lg hover:bg-gray-200">
      {}
      {message && (
        <div className="p-2 bg-blue-100 text-blue-800 font-semibold rounded text-center">
          {message}
        </div>
      )}

      <div className="flex items-center space-x-4">
        <img
          src={user.avatar}
          alt="avatar"
          className="w-16 h-16 rounded-full transition-transform duration-200 hover:scale-105"
        />
        <div>
          <h2 className="text-xl font-bold">{user.username}</h2>
          <p className="text-sm text-gray-600">Full Name: {user.fullName}</p>
          <p className="text-sm text-gray-600">Email: {user.email}</p>
          <p className="text-sm text-gray-600">Role: {user.role}</p>
          <p className="text-sm text-gray-600">
            Subscription: {user.isSubscribed ? "Subscribed" : "Not Subscribed"}
          </p>
          <button
            onClick={() => ban(user.username)}
            className="mt-2 py-1 px-4 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition duration-200 w-full hover:shadow-md"
          >
            Ban User
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
