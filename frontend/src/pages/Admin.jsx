import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Navigate } from "react-router-dom"; // Import Redirect from react-router-dom

const Admin = () => {
  const { user } = useAuth(); // Get user data from AuthContext

  // Redirect if the user is not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex h-screen bg-transparent">
      {/* Sidebar */}
      <aside style={{ backgroundColor: "#1F2937" }} className="w-64 text-white flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold p-4 text-center border-b bg-gray-800">
            Admin Panel
          </h1>
          <nav className="flex flex-col p-4 space-y-4">
            <a href="#profile" className="flex items-center p-2 rounded hover:bg-blue-600">
              <span className="ml-2">Profile</span>
            </a>
            <a href="#set-price" className="flex items-center p-2 rounded hover:bg-blue-600">
              <span className="ml-2">Set Price</span>
            </a>
            <a href="#customers" className="flex items-center p-2 rounded hover:bg-blue-600">
              <span className="ml-2">Customers</span>
            </a>
            <a href="#dealers" className="flex items-center p-2 rounded hover:bg-blue-600">
              <span className="ml-2">Dealers</span>
            </a>
            <a href="#purchases" className="flex items-center p-2 rounded hover:bg-blue-600">
              <span className="ml-2">Purchases</span>
            </a>
            <a href="#notifications" className="flex items-center p-2 rounded hover:bg-blue-600">
              <span className="ml-2">Send Notifications</span>
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
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

        {/* Profile Section */}
        <div id="profile" className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Profile</h3>
          <p>Profile section content...</p>
        </div>

        {/* Set Price Section */}
        <div id="set-price" className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Set Price</h3>
          <p>Set Price section content...</p>
        </div>

        {/* Customers Section */}
        <div id="customers" className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Customers</h3>
          <p>Customer section content...</p>
        </div>

        {/* Dealers Section */}
        <div id="dealers" className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Dealers</h3>
          <p>Dealer section content...</p>
        </div>

        {/* Purchases Section */}
        <div id="purchases" className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Purchases</h3>
          <p>Track daily purchases here. Option to analyze by:</p>
          <ul className="list-disc ml-5">
            <li>Day</li>
            <li>Week</li>
            <li>Month</li>
            <li>Year</li>
          </ul>
          <p>Purchases data visualization and insights would go here.</p>
        </div>

        {/* Notifications Section */}
        <div id="notifications" className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Send Notifications</h3>
          <p>Form to send notifications to customers and scrap dealers.</p>
          <form>
            <textarea
              className="w-full p-2 border border-gray-300 rounded mb-4"
              rows="4"
              placeholder="Enter notification message..."
            />
            <button className="w-full p-2 bg-green-600 hover:bg-green-700 text-white rounded">
              Send Notification
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Admin;
