import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const categorySubcategoryMap = {
  Metals: ["Aluminum", "Copper", "Steel", "Brass"],
  Plastics: ["PET", "HDPE", "PVC", "LDPE"],
  Electronics: [
    "Laptops",
    "Desktops",
    "Computer Accessories",
    "Smartphones",
    "Tablets",
  ],
  Glass: ["Bottles", "Windows", "Jars"],
  Paper: ["Office Paper", "Cardboard Boxes", "Newspaper"],
};

const Admin = () => {
  const [scrapData, setScrapData] = useState({
    scrapCategory: "",
    scrapSubCategory: "",
    pricePerUnit: "",
  });

  const [priceData, setPriceData] = useState({
    scrapCategory: "",
    scrapSubCategory: "",
    newPrice: "",
  });

  const [showAddScrapForm, setShowAddScrapForm] = useState(false);
  const [showChangePriceForm, setShowChangePriceForm] = useState(false);

  const [subCategories, setSubCategories] = useState([]);
  const [stats, setStats] = useState({
    totalScraps: 0,
    totalRequestsMade: 0,
    totalRequestsCancelled: 0,
    totalRequestsCompleted: 0,
    totalPriceChanges: 0,
    activeRequests: 0,
  });

  // Simulating data fetching
  useEffect(() => {
    // You can replace this with actual API calls to get stats from your backend
    const fetchStats = async () => {
      // Example stats data
      const response = {
        totalScraps: 50,
        totalRequestsMade: 200,
        totalRequestsCancelled: 50,
        totalRequestsCompleted: 150,
        totalPriceChanges: 10,
        activeRequests: 20,
      };
      setStats(response);
    };

    fetchStats();
  }, []);

  const handleAddScrapClick = () => {
    setShowAddScrapForm(!showAddScrapForm);
    setShowChangePriceForm(false); // Hide the change price form if it's open
  };

  const handleChangePriceClick = () => {
    setShowChangePriceForm(!showChangePriceForm);
    setShowAddScrapForm(false); // Hide the add scrap form if it's open
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setScrapData({ ...scrapData, scrapCategory: selectedCategory });
    setPriceData({ ...priceData, scrapCategory: selectedCategory }); // Sync with change price form
    setSubCategories(categorySubcategoryMap[selectedCategory] || []);
  };

  const addScrap = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/admin/addScrap",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(scrapData),
        }
      );
      const result = await response.json();
      alert(result.message);
      setScrapData({
        scrapCategory: "",
        scrapSubCategory: "",
        pricePerUnit: "",
      });
    } catch (error) {
      alert("Failed to add scrap: " + error.message);
    }
  };

  const changeScrapPrice = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/admin/changeScrapPrice",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(priceData),
        }
      );
      const result = await response.json();
      alert(result.message);
      setPriceData({ scrapCategory: "", scrapSubCategory: "", newPrice: "" });
    } catch (error) {
      alert("Failed to change scrap price: " + error.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="bg-indigo-600 text-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center">
          <h3 className="text-xl font-semibold">Total Scraps</h3>
          <p className="text-3xl">{stats.totalScraps}</p>
        </div>
        <div className="bg-yellow-600 text-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center">
          <h3 className="text-xl font-semibold">Total Requests Made</h3>
          <p className="text-3xl">{stats.totalRequestsMade}</p>
        </div>
        <div className="bg-red-600 text-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center">
          <h3 className="text-xl font-semibold">Requests Cancelled</h3>
          <p className="text-3xl">{stats.totalRequestsCancelled}</p>
        </div>
        <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center">
          <h3 className="text-xl font-semibold">Requests Completed</h3>
          <p className="text-3xl">{stats.totalRequestsCompleted}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={handleAddScrapClick}
          className="py-3 px-8 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none transform transition-all duration-300 hover:scale-105"
        >
          {showAddScrapForm ? "Hide Add Scrap Form" : "Show Add Scrap Form"}
        </button>
        <button
          onClick={handleChangePriceClick}
          className="py-3 px-8 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none transform transition-all duration-300 hover:scale-105"
        >
          {showChangePriceForm
            ? "Hide Change Price Form"
            : "Show Change Price Form"}
        </button>
      </div>

      {/* Add Scrap Form */}
      {showAddScrapForm && (
        <form
          onSubmit={addScrap}
          className="space-y-6 max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg"
        >
          <input
            type="text"
            name="scrapCategory"
            placeholder="Enter Scrap Category (e.g., Metals)"
            value={scrapData.scrapCategory}
            onChange={(e) =>
              setScrapData({ ...scrapData, scrapCategory: e.target.value })
            }
            required
            className="p-4 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />

          <input
            type="text"
            name="scrapSubCategory"
            placeholder="Enter Scrap Subcategory (e.g., Aluminum)"
            value={scrapData.scrapSubCategory}
            onChange={(e) =>
              setScrapData({ ...scrapData, scrapSubCategory: e.target.value })
            }
            required
            className="p-4 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />

          <input
            type="number"
            name="pricePerUnit"
            placeholder="Price Per Unit"
            value={scrapData.pricePerUnit}
            onChange={(e) =>
              setScrapData({ ...scrapData, pricePerUnit: e.target.value })
            }
            required
            className="p-4 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />

          <button
            type="submit"
            className="py-3 px-8 bg-indigo-600 text-white font-semibold rounded-lg w-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
          >
            Add Scrap
          </button>
        </form>
      )}

      {/* Change Scrap Price Form */}
      {showChangePriceForm && (
        <form
          onSubmit={changeScrapPrice}
          className="space-y-6 max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg"
        >
          <select
            name="scrapCategory"
            value={priceData.scrapCategory}
            onChange={handleCategoryChange}
            required
            className="p-4 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            <option value="">Select Category</option>
            {Object.keys(categorySubcategoryMap).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

      {/* Scrap Management Component */}
      <ScrapManagement />
      <div className="cursor-pointer">
        <NavLink to='/unverified-dealer'>Verification</NavLink>
      </div>
          <select
            name="scrapSubCategory"
            value={priceData.scrapSubCategory}
            onChange={(e) =>
              setPriceData({
                ...priceData,
                scrapSubCategory: e.target.value,
              })
            }
            required
            className="p-4 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            <option value="">Select Subcategory</option>
            {subCategories.map((subCategory) => (
              <option key={subCategory} value={subCategory}>
                {subCategory}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="newPrice"
            placeholder="New Price Per Unit"
            value={priceData.newPrice}
            onChange={(e) =>
              setPriceData({ ...priceData, newPrice: e.target.value })
            }
            required
            className="p-4 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />

          <button
            type="submit"
            className="py-3 px-8 bg-indigo-600 text-white font-semibold rounded-lg w-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
          >
            Change Price
          </button>
        </form>
      )}

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white text-center py-4 mt-12">
        <p>&copy; 2024 Iron Man's Junkyard | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Admin;
