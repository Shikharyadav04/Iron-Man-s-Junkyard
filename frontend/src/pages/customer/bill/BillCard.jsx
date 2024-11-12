import React, { useState } from "react";
import axios from "axios";

const BillCard = ({ bill }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "text-yellow-500 shadow-yellow-500/50";
      case "accepted":
        return "text-green-500 shadow-green-500/50";
      case "completed":
        return "text-blue-500 shadow-blue-500/50";
      case "canceled":
        return "text-red-500 shadow-red-500/50";
      default:
        return "text-gray-500";
    }
  };

  const CancelRequest = async (requestId) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/request/cancel-request",
        { requestId },
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
    <div
      style={{
        backgroundColor: bill.isSubscriber ? "#ffdc73" : "white",
      }}
      className="shadow-md rounded-lg p-4 mb-4 transition-transform duration-300 transform hover:scale-105 relative overflow-hidden pb-16"
    >
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

      {/* Separate Date and Time */}
      <p className="text-gray-700">
        <span className="font-bold">Scheduled Pickup Date:</span>{" "}
        {new Date(bill.scheduledPickupDate).toLocaleDateString()}{" "}
      </p>
      <p className="text-gray-700">
        <span className="font-bold">Scheduled Pickup Time:</span>{" "}
        {bill.scheduledPickupTime}
      </p>

      <p className="text-gray-700">
        <span className="font-bold">Condition:</span> {bill.condition}
      </p>
      <p className="text-gray-700">
        <span className="font-bold">Created At:</span>{" "}
        {new Date(bill.createdAt).toLocaleString()}
      </p>
      <p
        className={`font-bold uppercase mt-1 ${getStatusStyle(
          bill.status
        )} shadow-lg`}
      >
        Status: {bill.status}
      </p>

      <h4 className="text-md font-semibold mt-4">Scraps:</h4>
      <ul className="list-disc ml-6 mb-12">
        {/* Adds margin to avoid overlapping with button */}
        {bill.scraps.map((scrap) => (
          <li key={scrap._id} className="text-gray-700">
            <span className="font-bold">
              {scrap.category} - {scrap.subCategory}:
            </span>{" "}
            {scrap.quantity} units
          </li>
        ))}
      </ul>

      {/* Show Cancel button only if status is not "canceled" or "completed" */}
      {bill.status.toLowerCase() !== "canceled" &&
        bill.status.toLowerCase() !== "completed" && (
          <button
            onClick={() => CancelRequest(bill.requestId)}
            className="py-2 px-4 absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200 w-11/12"
          >
            Cancel Request
          </button>
        )}
    </div>
  );
};

export default BillCard;
