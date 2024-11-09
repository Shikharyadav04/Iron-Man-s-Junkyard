import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthProvider.jsx";
import Profile from "../components/Profile.jsx";
import { useNavigate } from "react-router-dom";
import { assets } from "@/assets/assets.js";
import Sidebar from "../components/Sidebar.jsx"; // Import Sidebar component

const Customer = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null); // Reference for the sidebar
  const menuIconRef = useRef(null); // Reference for the menu icon

  const toggleSidebar = (state) => {
    setIsSidebarOpen(state); // Toggle sidebar visibility
  };

  // Close sidebar if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current && !sidebarRef.current.contains(event.target) &&
        menuIconRef.current && !menuIconRef.current.contains(event.target)
      ) {
        setIsSidebarOpen(false); // Close the sidebar if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-screen w-screen bg-gray-100 overflow-hidden">
      {/* Sidebar Component */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        sidebarRef={sidebarRef} // Pass ref to Sidebar
      />

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="relative h-40">
          <img
            src={assets.userbanner}
            alt="User Banner"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
            {/* Menu icon at the top-left, hide when sidebar is open */}
            {!isSidebarOpen && (
              <button
                onClick={() => toggleSidebar(true)} // Open sidebar
                className="absolute top-4 left-4 z-50 p-2 bg-transparent"
                ref={menuIconRef} // Reference for the menu icon
              >
                <img
                  src={assets.menu_icon}
                  alt="Menu"
                  className="w-6 h-6"
                />
              </button>
            )}
            <div className="text-center">
              <img
                src={user?.avatar || "/default-avatar.png"}
                alt="User Avatar"
                className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-white"
              />
              <h1 className="text-xl font-semibold">{user?.fullName}</h1>
              <p className="text-sm">{user?.email}</p>
            </div>
          </div>
        </div>
        <div className="flex-1 p-6 overflow-y-auto">
          <Profile user={user} />
        </div>
      </div>
    </div>
  );
};

export default Customer;
