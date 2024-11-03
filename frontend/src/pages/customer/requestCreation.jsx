import React, { useState } from "react";
import axios from "axios";

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

function RequestCreation() {
  const [scraps, setScraps] = useState([
    { category: "", subCategory: "", quantity: 1 },
  ]);
  const [pickupLocation, setPickupLocation] = useState("");
  const [scheduledPickupDate, setScheduledPickupDate] = useState("");
  const [condition, setCondition] = useState("");
  const [message, setMessage] = useState("");
  const [summary, setSummary] = useState(null);

  const handleScrapChange = (index, e) => {
    const { name, value } = e.target;
    const newScraps = [...scraps];
    newScraps[index][name] = value;

    // Reset subCategory when category changes
    if (name === "category") {
      newScraps[index].subCategory = "";
    }
    setScraps(newScraps);
  };

  const addScrap = () => {
    setScraps([...scraps, { category: "", subCategory: "", quantity: 1 }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate scraps
    if (scraps.some((scrap) => scrap.quantity <= 0)) {
      setMessage("Quantity must be greater than 0 for all scraps.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/request/request-creation",
        {
          scraps,
          pickupLocation,
          scheduledPickupDate,
          condition,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setSummary(response.data.request);
        setMessage("Request created successfully.");
      } else {
        // Handle backend error message
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error creating request:", error);
      setMessage("Error creating request. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create Request
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {scraps.map((scrap, index) => (
            <div key={index} className="space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  name="category"
                  value={scrap.category}
                  onChange={(e) => handleScrapChange(index, e)}
                  required
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-500"
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {Object.keys(categorySubcategoryMap).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Sub-Category
                </label>
                <select
                  name="subCategory"
                  value={scrap.subCategory}
                  onChange={(e) => handleScrapChange(index, e)}
                  required
                  disabled={!scrap.category}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-500"
                >
                  <option value="" disabled>
                    Select a sub-category
                  </option>
                  {scrap.category &&
                    categorySubcategoryMap[scrap.category].map(
                      (subCategory) => (
                        <option key={subCategory} value={subCategory}>
                          {subCategory}
                        </option>
                      )
                    )}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={scrap.quantity}
                  onChange={(e) => handleScrapChange(index, e)}
                  required
                  min="0"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-500"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addScrap}
            className="w-full py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 transition duration-200"
          >
            Add More Scrap
          </button>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pickup Location
            </label>
            <input
              type="text"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Scheduled Pickup Date
            </label>
            <input
              type="datetime-local"
              value={scheduledPickupDate}
              onChange={(e) => setScheduledPickupDate(e.target.value)}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Condition
            </label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-500"
            >
              <option value="" disabled>
                Select condition
              </option>
              <option value="Good">Good</option>
              <option value="Old">Old</option>
              <option value="Damaged">Damaged</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Create Request
          </button>
        </form>
        {message && (
          <div
            className={`mt-4 p-2 rounded-md text-center ${
              message.includes("Error")
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {message}
          </div>
        )}
        {summary && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Request Summary</h3>
            <ul className="mt-2 space-y-2">
              {summary.scraps.map((item, index) => (
                <li key={index} className="bg-gray-100 p-2 rounded-md">
                  {item.category} - {item.subCategory} | Quantity:{" "}
                  {item.quantity} | Per Unit Price: {item.pricePerUnit} |
                  Subtotal: {item.scrapTotalAmount}
                </li>
              ))}
            </ul>
            <p className="font-bold mt-2">Total: {summary.totalAmount}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RequestCreation;
