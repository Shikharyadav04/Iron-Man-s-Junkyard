import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider.jsx";
import Profile from "../components/Profile.jsx";
import { useNavigate } from "react-router-dom";
import { assets } from "@/assets/assets.js";
import NotificationBell from "@/components/NotificationBell.jsx";

const Customer = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Get userId from local storage
  const userId = localStorage.getItem("userId");

  const handleSeeChats = () => {
    navigate("/customer/chats");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-[url(https://i.pinimg.com/originals/fb/36/b6/fb36b6ee0ba43a905d7d6db76c21a9bf.gif)] bg-cover backdrop-blur-xl">
      {/* Inline Sidebar for Customer */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-0"
        } overflow-hidden`}
      >
        <div className="w-64 h-full bg-transparent p-6 shadow-lg">
          <div className="space-y-4">
            <button
              onClick={() => handleNavigate("/customer")}
              className="block text-white w-full text-left py-2 px-4 rounded transform transition-transform ease-in-out duration-300 hover:scale-125"
            >
              Profile
            </button>
            <button
              onClick={() => handleNavigate("/customer/request-creation")}
              className="block text-white w-full text-left py-2 px-4 rounded transform transition-transform ease-in-out duration-300 hover:scale-125"
            >
              Create Request
            </button>
            <button
              onClick={() => handleNavigate("/customer/bills")}
              className="block text-white w-full text-left py-2 px-4 rounded transform transition-transform ease-in-out duration-300 hover:scale-125"
            >
              View Bills
            </button>
            <button
              onClick={() => handleNavigate("/customer/acceptedRequests")}
              className="block text-white w-full text-left py-2 px-4 rounded transform transition-transform ease-in-out duration-300 hover:scale-125"
            >
              View Accepted Requests
            </button>
            <button
              onClick={() => handleNavigate("/customer/completedRequests")}
              className="block text-white w-full text-left py-2 px-4 rounded transform transition-transform ease-in-out duration-300 hover:scale-125"
            >
              View Completed Requests
            </button>
            <button
              onClick={() => handleNavigate("/chats")}
              className="block text-white w-full text-left py-2 px-4 rounded transform transition-transform ease-in-out duration-300 hover:scale-125"
            >
              See Chats
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="relative h-40">
          <div className="absolute inset-0 flex items-center justify-center text-black font-bold font-playfair">
            <div className="flex items-center space-x-4">
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
            {/* Button to toggle sidebar */}
            <button
              onClick={toggleSidebar}
              className="absolute top-4 left-4 z-50 p-2 bg-transparent"
            >
              <img src={assets.menu_icon} alt="Menu" className="w-6 h-6" />
            </button>
          </div>

          {/* Notification Bell */}
          <div className="absolute top-4 right-4">
            <NotificationBell userId={userId} />
          </div>
        </div>

        <div className="flex flex-col items-center py-10 px-6">
          <Profile user={user} />
        </div>
      </div>
    </div>
  );
};

export default Customer;
