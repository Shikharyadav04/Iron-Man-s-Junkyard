import React from "react";
import { useAuth } from "../context/AuthProvider";

const Admin = () => {
  const { user } = useAuth(); // Get user data from AuthContext

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold p-4 text-center border-b border-blue-600">
            Admin Panel
          </h1>
          <nav className="flex flex-col p-4 space-y-4">
            <a
              href="#profile"
              className="flex items-center p-2 rounded hover:bg-blue-600"
            >
              <span className="ml-2">Profile</span>
            </a>
            <a
              href="#set-price"
              className="flex items-center p-2 rounded hover:bg-blue-600"
            >
              <span className="ml-2">Set Price</span>
            </a>
            <a
              href="#customers"
              className="flex items-center p-2 rounded hover:bg-blue-600"
            >
              <span className="ml-2">Customers</span>
            </a>
            <a
              href="#dealers"
              className="flex items-center p-2 rounded hover:bg-blue-600"
            >
              <span className="ml-2">Dealers</span>
            </a>
          </nav>
        </div>
        <button className="w-full p-4 bg-red-600 hover:bg-red-700 text-center">
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {user && (
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-24 h-24 rounded-full border-2 border-indigo-600"
            />
            <div>
              <h1 className="text-2xl font-semibold">{user.fullName}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
        )}
        <h2 className="text-3xl font-semibold mb-6">Welcome, Admin!</h2>
        <div id="profile" className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Profile</h3>
          <p>Profile section content...</p>
        </div>
        <div id="set-price" className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Set Price</h3>
          <p>Set Price section content...</p>
        </div>
        <div id="customers" className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Customers</h3>
          <p>Customer section content...</p>
        </div>
        <div id="dealers" className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Dealers</h3>
          <p>Dealer section content...</p>
        </div>
      </main>
    </div>
  );
};

export default Admin;
