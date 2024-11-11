import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthProvider.jsx";
import Profile from "../components/Profile.jsx";
import { useNavigate } from "react-router-dom";
import { assets } from "@/assets/assets.js";
import Sidebar from "../components/Sidebar.jsx";
import NotificationBell from "@/components/NotificationBell.jsx";

const Customer = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const menuIconRef = useRef(null);

  // Get userId from local storage
  const userId = localStorage.getItem("userId");

  const toggleSidebar = (state) => {
    setIsSidebarOpen(state);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        menuIconRef.current &&
        !menuIconRef.current.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSeeChats = () => {
    navigate("/customer/chats");
  };

  return (
    <div className="flex h-screen w-screen bg-gray-100 overflow-hidden">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        sidebarRef={sidebarRef}
      />

      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="relative h-40">
          <img
            src={assets.userbanner}
            alt="User Banner"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
            {!isSidebarOpen && (
              <button
                onClick={() => toggleSidebar(true)}
                className="absolute top-4 left-4 z-50 p-2 bg-transparent"
                ref={menuIconRef}
              >
                <img src={assets.menu_icon} alt="Menu" className="w-6 h-6" />
              </button>
            )}
            <div className="text-center">
              <img
                src={user?.avatar || "/default-avatar.png"}
                alt="User Avatar"
                className="w-24 h-24 rounded-full mx-auto mb-2 border-4 border-white"
              />
              <h1 className="text-2xl font-semibold">{user?.fullName}</h1>
              <p className="text-md">{user?.email}</p>
            </div>
          </div>

          {/* Notification Bell */}
          <div className="absolute top-4 right-4">
            <NotificationBell userId={userId} />
          </div>
        </div>

        <div className="flex flex-col items-center py-10 px-6">
          <Profile user={user} />

          {/* See Chats Button */}
          <button
            onClick={handleSeeChats}
            className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
          >
            See Chats
          </button>
        </div>
      </div>
    </div>
  );
};

export default Customer;
