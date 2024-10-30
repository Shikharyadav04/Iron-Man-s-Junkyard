import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Location from "@/components/location";

const Dealer = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return <div className="flex items-center justify-center h-screen text-xl">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-gray-800 text-white flex flex-col">
        <h2 className="text-2xl font-bold p-6 text-center border-b border-gray-700">
          Dealer Dashboard
        </h2>
        <nav className="flex flex-col mt-4 space-y-2">
          <button
            onClick={() => setActiveTab("profile")}
            className={`p-4 text-lg transition-colors duration-200 ease-in-out ${
              activeTab === "profile" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("scrap")}
            className={`p-4 text-lg transition-colors duration-200 ease-in-out ${
              activeTab === "scrap" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            Scrap
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-full md:w-3/4 p-10 flex flex-col items-center md:items-start bg-white shadow-md">
        <div className="mb-10 flex flex-col items-center md:items-start">
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-4 border-indigo-500 mb-4 shadow-md"
          />
          <h1 className="text-3xl font-semibold text-center md:text-left">{user.fullName}</h1>
          <p className="text-gray-500 text-center md:text-left">{user.email}</p>
        </div>

        {activeTab === "profile" && (
          <div className="w-full">
            <h2 className="text-3xl font-semibold mb-6">Profile</h2>
            <p className="text-lg text-gray-600">Dealer profile information and settings go here.</p>
          </div>
        )}

        {activeTab === "scrap" && (
          <div className="w-full">
            <h2 className="text-3xl font-semibold mb-6">Scrap</h2>
            <p className="text-lg text-gray-600">Manage scrap requests and transactions here.</p>
          </div>
        )}

        {/* Location Component */}
        <div className="w-full mt-10">
          <Location />
        </div>
      </div>
    </div>
  );
};

export default Dealer;
