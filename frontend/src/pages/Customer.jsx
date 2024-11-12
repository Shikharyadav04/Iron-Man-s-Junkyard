import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider.jsx";
import Profile from "../components/Profile.jsx";
import { useNavigate } from "react-router-dom";
import { assets } from "@/assets/assets.js";
import NotificationBell from "@/components/NotificationBell.jsx";

const Customer = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

  // Get userId from local storage
  const userId = localStorage.getItem("userId");

  const handleSeeChats = () => {
    navigate("/customer/chats");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsSidebarOpen(false); // Close sidebar after navigation
  };

  return (
    <div className="flex h-screen bg-[url(https://i.pinimg.com/originals/fb/36/b6/fb36b6ee0ba43a905d7d6db76c21a9bf.gif)] bg-cover backdrop-blur-xl">
      {/* Inline Sidebar for Customer */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-0"
        } overflow-hidden`}
      >
        <div className="w-64 h-full bg-white p-6 shadow-lg">
          <div className="space-y-4">
            <button
              onClick={() => handleNavigate("/customer")}
              className="block w-full text-left py-2 px-4 rounded hover:bg-slate-200"
            >
              Profile
            </button>
            <button
              onClick={() => handleNavigate("/customer/request-creation")}
              className="block w-full text-left py-2 px-4 rounded hover:bg-slate-200"
            >
              Create Request
            </button>
            <button
              onClick={() => handleNavigate("/customer/bills")}
              className="block w-full text-left py-2 px-4 rounded hover:bg-slate-200"
            >
              View Bills
            </button>
            <button
              onClick={() => handleNavigate("/customer/acceptedRequests")}
              className="block w-full text-left py-2 px-4 rounded hover:bg-slate-200"
            >
              View Accepted Requests
            </button>
            <button
              onClick={() => handleNavigate("/customer/completedRequests")}
              className="block w-full text-left py-2 px-4 rounded hover:bg-slate-200"
            >
              View Completed Requests
            </button>
            <button
              onClick={() => handleNavigate("/chats")}
              className="block w-full text-left py-2 px-4 rounded hover:bg-slate-200"
            >
              See Chats
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="relative h-40">
          
          
          
          
          
          <div className="absolute inset-0 flex items-center justify-center  text-black font-bold font-playfair">
            <div className="text-center">
              <img
                src={user?.avatar || "/default-avatar.png"}
                alt="User Avatar"
                className="w-24 h-24 rounded-full mx-auto mb-2 border-4 border-white"
              />
              <h1 className="text-2xl font-semibold">{user?.fullName}</h1>
              <p className="text-md font-serif">{user?.email}</p>
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
