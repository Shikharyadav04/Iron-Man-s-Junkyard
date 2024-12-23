import React from "react";
import { useAuth } from "@/context/AuthProvider.jsx";
import Profile from "../components/Profile.jsx";
import { useNavigate } from "react-router-dom";

// Sidebar Component for Navigation
const Sidebar = ({ onNavigate }) => {
  return (
    <div className="bg-transparent text-white w-1/4 p-6 space-y-4">
      <button
        onClick={() => onNavigate("/dealer")}
        className="block w-full text-left py-2 px-4 rounded hover:bg-gray-700"
      >
        Profile
      </button>
      <button
        onClick={() => onNavigate("/dealer/requests")}
        className="block w-full text-left py-2 px-4 rounded hover:bg-gray-700"
      >
        View Available Requests
      </button>
      <button
        onClick={() => onNavigate("/dealer/acceptedRequests")}
        className="block w-full text-left py-2 px-4 rounded hover:bg-gray-700"
      >
        View Accepted Requests
      </button>
      <button
        onClick={() => onNavigate("/chats")}
        className="block w-full text-left py-2 px-4 rounded hover:bg-gray-700"
      >
        Chat
      </button>
      {/* Add more buttons as needed */}
    </div>
  );
};

// Dealer Component
const Dealer = () => {
  const { user } = useAuth(); // Access user information from Auth context
  const navigate = useNavigate(); // Navigation hook to redirect the user

  const handleNavigate = (path) => {
    navigate(path); // Navigate to different paths based on the sidebar button clicked
  };

  return (
    <div className="flex min-h-screen bg-[url(https://i.pinimg.com/originals/fb/36/b6/fb36b6ee0ba43a905d7d6db76c21a9bf.gif)] bg-cover backdrop-blur-xl">
      {/* Sidebar for Dealer Navigation */}
      <Sidebar onNavigate={handleNavigate} />

      {/* Profile Content Section */}
      <div className="flex-1 p-6 ">
        <div className="flex items-center ml-20 space-x-4">
          <img
            src={user?.avatar || "/default-avatar.png"}
            alt="User Avatar"
            className={`w-24 h-24 rounded-full border-1 border-white ${
              user?.isSubscribed
                ? "ring-4 ring-yellow-500 shadow-[0_0_15px_5px_rgba(255,223,0,0.6)]"
                : ""
            }`}
          />
          <div className="text-black">
            <h1 className="text-2xl font-semibold glow-text">
              {user?.fullName}
            </h1>
            <p className="text-md font-serif glow-text">{user?.email}</p>
          </div>
        </div>
        <Profile user={user} />{" "}
        {/* Pass the user data to the Profile component */}
      </div>
    </div>
  );
};

export default Dealer;
