import React, { useState } from "react";
import axios from "axios";
const BillCard = ({ bill }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);

  // Function to determine the status style based on the status value
  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "text-yellow-500 shadow-yellow-500/50"; // Yellow for pending
      case "accepted":
        return "text-green-500 shadow-green-500/50"; // Green for accepted
      case "completed":
        return "text-blue-500 shadow-blue-500/50"; // Blue for completed
      case "canceled":
        return "text-red-500 shadow-red-500/50"; // Red for canceled
      default:
        return "text-gray-500"; // Default color for unknown status
    }
  };

  const CancelRequest = async (requestId) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/request/cancel-request",
        { requestId }, // Sending as an object directly
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setSuccessMessage(response.data.message);
      setError(null);
    } catch (err) {
      console.log(err);
      const errorMessage = err.response?.data?.message || "An error occurred";
      setError(`{ success: "false", message: "${errorMessage}" }`);
      setSuccessMessage("");
    }
  };

  return (
    <div className="bg-transparent shadow-md rounded-lg p-4 mb-4 transition-transform duration-300 transform hover:scale-105">
      {successMessage && (
        <div className="text-green-600 mb-4">{successMessage}</div>
      )}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <p className="text-2xl font-bold text-gray-800 shadow-glow mb-2">
        <span className="font-bold">Total Amount:</span> ₹{bill.totalAmount}
      </p>
      <h3 className="text-lg font-semibold">
        <span className="font-bold">Bill ID:</span> {bill.requestId}
      </h3>
      <p className="text-gray-700">
        <span className="font-bold">Pickup Location:</span>{" "}
        {bill.pickupLocation}
      </p>
      <p className="text-gray-700">
        <span className="font-bold">Scheduled Pickup Date:</span>{" "}
        {new Date(bill.scheduledPickupDate).toLocaleString()}
      </p>
      <p className="text-gray-700">
        <span className="font-bold">Condition:</span> {bill.condition}
      </p>
      <p className="text-gray-700">
        <span className="font-bold">Created At </span>{" "}
        {new Date(bill.createdAt).toLocaleString()}
      </p>
      <p
        className={`font-bold uppercase mt-1  ${getStatusStyle(
          bill.status
        )} shadow-lg`}
      >
        Status: {bill.status}
      </p>

      <h4 className="text-md font-semibold mt-4">Scraps:</h4>
      <ul className="list-disc ml-6">
        {bill.scraps.map((scrap) => (
          <li key={scrap._id} className="text-gray-700">
            <span className="font-bold">
              {scrap.category} - {scrap.subCategory}:
            </span>{" "}
            {scrap.quantity} units
          </li>
        ))}
      </ul>
      <button
        onClick={() => CancelRequest(bill.requestId)}
        className="py-1 px-2 bg-red-600 mt-4 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200 w-full"
      >
        Cancel Request
      </button>
    </div>
  );
};

export default BillCard;
