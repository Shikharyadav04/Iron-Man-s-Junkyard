import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLoader } from "@/context/LoaderContext"; // Import the loader context

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
  const [scheduledPickupTime, setScheduledPickupTime] = useState("");
  const [condition, setCondition] = useState("");
  const [summary, setSummary] = useState(null);

  const navigate = useNavigate();
  const { loading, showLoader, hideLoader } = useLoader(); // Access the loader functions

  const handleScrapChange = (index, e) => {
    const { name, value } = e.target;
    const newScraps = [...scraps];
    newScraps[index][name] = value;

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

    if (scraps.some((scrap) => scrap.quantity <= 0)) {
      toast.error("Quantity must be greater than 0 for all scraps.");
      return;
    }

    showLoader(); // Show loader when form is submitted

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/request/request-creation",
        {
          scraps,
          pickupLocation,
          scheduledPickupDate,
          scheduledPickupTime,
          condition,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setSummary(response.data.request);
        toast.success("Request created successfully.");

        // Reset form data after successful submission
        setScraps([{ category: "", subCategory: "", quantity: 1 }]);
        setPickupLocation("");
        setScheduledPickupDate("");
        setScheduledPickupTime("");
        setCondition("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Error creating request. Please try again.";
      toast.error(errorMessage);
    } finally {
      hideLoader(); // Hide loader after request completes
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Loader (conditional display) */}
        {loading && <div className="loader">Loading...</div>}

        {/* Back button */}
        <button
          onClick={() => navigate("/customer")}
          className="text-gray-500 hover:text-gray-700 mb-4 inline-flex items-center"
        >
          ← Back
        </button>

        {/* Form title */}
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create Request
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {scraps.map((scrap, index) => (
            <div key={index} className="space-y-2">
              {/* Category Dropdown */}
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

              {/* Sub-Category Dropdown */}
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

              {/* Quantity Input */}
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

          {/* Add Scrap Button */}
          <button
            type="button"
            onClick={addScrap}
            className="w-full py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 transition duration-200"
          >
            Add More Scrap
          </button>

          {/* Pickup Location Input */}
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

          {/* Scheduled Pickup Date Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Scheduled Pickup Date
            </label>
            <input
              type="date"
              value={scheduledPickupDate}
              onChange={(e) => setScheduledPickupDate(e.target.value)}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-500"
            />
          </div>

          {/* Scheduled Pickup Time Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Scheduled Pickup Time
            </label>
            <select
              value={scheduledPickupTime}
              onChange={(e) => setScheduledPickupTime(e.target.value)}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-500"
            >
              <option value="" disabled>
                Select pickup time
              </option>
              <option value="9 AM - 7 PM">9 AM - 7 PM</option>
              <option value="7 AM - 10 PM">7 AM - 10 PM</option>
              <option value="2 PM - 6 PM">2 PM - 6 PM</option>
            </select>
          </div>

          {/* Condition Dropdown */}
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
          >
            Submit Request
          </button>
        </form>

        {/* Summary after successful submission */}
        {summary && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-md">
            <h3 className="font-semibold">Request Summary</h3>
            <p>Pickup Location: {summary.pickupLocation}</p>
            <p>
              Scheduled Pickup Date:{" "}
              {new Date(summary.scheduledPickupDate).toLocaleDateString()}
            </p>
            <p>Scheduled Pickup Time: {summary.scheduledPickupTime}</p>
            <ul>
              {summary.scraps.map((scrap, index) => (
                <li key={index}>
                  {scrap.quantity} {scrap.subCategory} ({scrap.category})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}

export default RequestCreation;
