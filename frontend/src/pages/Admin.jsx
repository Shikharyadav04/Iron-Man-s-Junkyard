// ./src/AdminPage.js
import React, { useState } from 'react';

const Admin = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "Customer":
        return <div>Customer Management Section</div>;
      case "Dealer":
        return <div>Dealer Management Section</div>;
      case "Set Price":
        return <div>Set Price Section</div>;
      case "Trending Products":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Trending Products</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Dummy Trending Products */}
              <div className="p-4 bg-white shadow-md rounded-lg">Product 1</div>
              <div className="p-4 bg-white shadow-md rounded-lg">Product 2</div>
              <div className="p-4 bg-white shadow-md rounded-lg">Product 3</div>
              <div className="p-4 bg-white shadow-md rounded-lg">Product 4</div>
            </div>
          </div>
        );
      default:
        return <div>Dashboard Overview</div>;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-800 text-white flex flex-col items-center py-10">
        <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
        <nav className="w-full">
          <button
            onClick={() => setActiveSection("Dashboard")}
            className={`w-full py-2 px-4 text-left hover:bg-gray-700 ${
              activeSection === "Dashboard" ? "bg-gray-700" : ""
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveSection("Customer")}
            className={`w-full py-2 px-4 text-left hover:bg-gray-700 ${
              activeSection === "Customer" ? "bg-gray-700" : ""
            }`}
          >
            Customer
          </button>
          <button
            onClick={() => setActiveSection("Dealer")}
            className={`w-full py-2 px-4 text-left hover:bg-gray-700 ${
              activeSection === "Dealer" ? "bg-gray-700" : ""
            }`}
          >
            Dealer
          </button>
          <button
            onClick={() => setActiveSection("Set Price")}
            className={`w-full py-2 px-4 text-left hover:bg-gray-700 ${
              activeSection === "Set Price" ? "bg-gray-700" : ""
            }`}
          >
            Set Price
          </button>
          <button
            onClick={() => setActiveSection("Trending Products")}
            className={`w-full py-2 px-4 text-left hover:bg-gray-700 ${
              activeSection === "Trending Products" ? "bg-gray-700" : ""
            }`}
          >
            Trending Products
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-10">
        <h2 className="text-3xl font-semibold mb-6">{activeSection}</h2>
        <div className="bg-white p-6 shadow-lg rounded-lg">{renderContent()}</div>
      </main>
    </div>
  );
};

export default Admin;
