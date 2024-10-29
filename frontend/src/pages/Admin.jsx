import React from 'react';

const Admin = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold p-4 text-center border-b border-blue-600">Admin Panel</h1>

          {/* Sidebar Links */}
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
          </nav>
        </div>

        {/* Logout Button */}
        <button className="w-full p-4 bg-red-600 hover:bg-red-700 text-center">
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h2 className="text-3xl font-semibold mb-6">Welcome, Admin!</h2>
        {/* Content for each section */}
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
