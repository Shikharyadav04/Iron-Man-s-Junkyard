// Sidebar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isSidebarOpen, toggleSidebar, sidebarRef }) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    toggleSidebar(false); // Close sidebar after navigation
  };

  return (
    <>
      {isSidebarOpen && (
        <div
          ref={sidebarRef} // Attach the ref to the sidebar
          className="fixed top-0 left-0 z-40 w-1/4 h-full bg-white p-6 shadow-lg"
        >
          
          
          
          
          
          
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
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
