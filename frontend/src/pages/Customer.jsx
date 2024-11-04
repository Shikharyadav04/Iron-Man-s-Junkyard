import React from "react";
import { useAuth } from "../context/AuthProvider.jsx";
import Profile from "../components/Profile.jsx";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ onNavigate }) => {
  return (
    <div className="bg-gray-800 text-white w-1/4 p-6 space-y-4">
      <button
        onClick={() => onNavigate("/customer")}
        className="block w-full text-left py-2 px-4 rounded hover:bg-gray-700"
      >
        Profile
      </button>
      <button
        onClick={() => onNavigate("/customer/request-creation")}
        className="block w-full text-left py-2 px-4 rounded hover:bg-gray-700"
      >
        Create Request
      </button>
      <button
        onClick={() => onNavigate("/customer/bills")}
        className="block w-full text-left py-2 px-4 rounded hover:bg-gray-700"
      >
        View Bills
      </button>
      <button
        onClick={() => onNavigate("/customer/acceptedRequests")}
        className="block w-full text-left py-2 px-4 rounded hover:bg-gray-700"
      >
        View Accepted Requests
      </button>
      <button
        onClick={() => onNavigate("/customer/completedRequests")}
        className="block w-full text-left py-2 px-4 rounded hover:bg-gray-700"
      >
        View Completed Requests
      </button>
    </div>
  );
};

const Customer = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar onNavigate={handleNavigate} />

      {/* Profile Content */}
      <div className="flex-1 p-6">
        <Profile user={user} />
      </div>
    </div>
  );
};

export default Customer;
