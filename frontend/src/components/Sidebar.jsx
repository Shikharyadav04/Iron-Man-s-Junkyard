import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isSidebarOpen, toggleSidebar, userRole }) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    toggleSidebar(false); // Close sidebar after navigation
  };

  return (
    <>
      {isSidebarOpen && (
        <div className="w-64 h-full bg-white p-6 shadow-lg">
          <div className="space-y-4">
            {userRole === "customer" && (
              <>
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
                  onClick={() => handleNavigate("/customer/chats")}
                  className="block w-full text-left py-2 px-4 rounded hover:bg-slate-200"
                >
                  See Chats
                </button>
              </>
            )}
            {userRole === "dealer" && (
              <>
                <button
                  onClick={() => handleNavigate("/dealer")}
                  className="block w-full text-left py-2 px-4 rounded hover:bg-slate-200"
                >
                  Profile
                </button>
                <button
                  onClick={() => handleNavigate("/dealer/requests")}
                  className="block w-full text-left py-2 px-4 rounded hover:bg-slate-200"
                >
                  View Requests
                </button>
                <button
                  onClick={() => handleNavigate("/dealer/acceptedRequests")}
                  className="block w-full text-left py-2 px-4 rounded hover:bg-slate-200"
                >
                  View Accepted Requests
                </button>
                <button
                  onClick={() => handleNavigate("/dealer/chats")}
                  className="block w-full text-left py-2 px-4 rounded hover:bg-slate-200"
                >
                  See Chats
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
