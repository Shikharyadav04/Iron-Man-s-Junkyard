import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider.jsx";

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

const ScrapManagement = () => {
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
      <div className="flex justify-between">
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

          {priceData.scrapCategory && (
            <select
              name="scrapSubCategory"
              value={priceData.scrapSubCategory}
              onChange={(e) =>
                setPriceData({ ...priceData, scrapSubCategory: e.target.value })
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
          )}

          <input
            type="number"
            name="newPrice"
            placeholder="New Price"
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
            Change Scrap Price
          </button>
        </form>
      )}
    </div>
  );
};

const Admin = () => {
  return (
    <div className="space-y-6">
      <ScrapManagement />
    </div>
  );
};

export default Admin;
