import React from "react";
import { useAuth } from "../context/AuthProvider.jsx";
import Profile from "../components/Profile.jsx";
import { useNavigate } from "react-router-dom";

// Sidebar Component for Navigation
const Sidebar = ({ onNavigate }) => {
  return (
    <div className="bg-gray-800 text-white w-1/4 p-6 space-y-4">
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
        onClick={() => onNavigate("/dealerChats")}
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
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar for Dealer Navigation */}
      <Sidebar onNavigate={handleNavigate} />

      {/* Profile Content Section */}
      <div className="flex-1 p-6">
        <Profile user={user} />{" "}
        {/* Pass the user data to the Profile component */}
      </div>
    </div>
  );
};

export default Dealer;
