import React, { useState } from "react";
import axios from "axios"; // Import axios

const ScrapManagement = () => {
  // State for scrap addition
  const [scrapData, setScrapData] = useState({
    category: "",
    subCategory: "",
    pricePerUnit: "",
  });

  // State for changing scrap price
  const [priceData, setPriceData] = useState({
    scrapCategory: "",
    scrapSubCategory: "",
    newPrice: "",
  });

  // State for dealer functionalities
  const [dealerData, setDealerData] = useState({
    itemId: "",
    action: "",
  });

  const handleScrapChange = (e) => {
    const { name, value } = e.target;
    setScrapData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDealerChange = (e) => {
    const { name, value } = e.target;
    setDealerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addScrap = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token is missing. Please log in again.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/v1/admin/addScrap", scrapData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        Credentials: true,
      });

      alert(response.data.message);
      setScrapData({ category: "", subCategory: "", pricePerUnit: "" });
    } catch (error) {
      alert("Failed to add scrap: " + (error.response ? error.response.data.message : error.message));
    }
  };

  const changeScrapPrice = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token is missing. Please log in again.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/v1/admin/changeScrapPrice", priceData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        Credentials: true,
      });

      alert(response.data.message);
      setPriceData({ scrapCategory: "", scrapSubCategory: "", newPrice: "" });
    } catch (error) {
      alert("Failed to change scrap price: " + (error.response ? error.response.data.message : error.message));
    }
  };

  
  
  
  
  

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Scrap</h2>
      <form onSubmit={addScrap} className="space-y-4">
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={scrapData.category}
          onChange={handleScrapChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="subCategory"
          placeholder="Sub Category"
          value={scrapData.subCategory}
          onChange={handleScrapChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          name="pricePerUnit"
          placeholder="Price Per Unit"
          value={scrapData.pricePerUnit}
          onChange={handleScrapChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200">
          Add Scrap
        </button>
      </form>

      <h2 className="text-2xl font-bold mt-8 mb-4">Change Scrap Price</h2>
      <form onSubmit={changeScrapPrice} className="space-y-4">
        <input
          type="text"
          name="scrapCategory"
          placeholder="Scrap Category"
          value={priceData.scrapCategory}
          onChange={handlePriceChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="scrapSubCategory"
          placeholder="Scrap Sub Category"
          value={priceData.scrapSubCategory}
          onChange={handlePriceChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          name="newPrice"
          placeholder="New Price"
          value={priceData.newPrice}
          onChange={handlePriceChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button type="submit" className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-200">
          Change Scrap Price
        </button>
      </form>

      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
    </div>
  );
};

export default ScrapManagement;
