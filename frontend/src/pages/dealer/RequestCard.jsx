import React, { useState } from "react";
import axios from "axios";

const RequestCard = ({ request }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);

  const getConditionStyle = (condition) => {
    switch (condition) {
      case "Old":
        return "text-yellow-500 shadow-yellow-500/50";
      case "Good":
        return "text-green-500 shadow-green-500/50";
      case "Damaged":
        return "text-red-500 shadow-red-500/50";
      default:
        return "text-gray-500"; // Default color for unknown status
    }
  };

  const AcceptRequest = async (requestId) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/request/accept-request`,
        { requestId },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setSuccessMessage("Request accepted successfully!");
      setError(null);
    } catch (error) {
      console.log(error);
      setError(
        error.response?.data.message ||
          "An error occurred while accepting the request."
      );
      setSuccessMessage("");
    }
  };

  return (
    <div
    style={{
      backgroundColor: request.isSubscriber ? "#ffdc73" : "white",
    }}  
    className="bg-white shadow-md rounded-lg p-4 mb-4 transition-transform duration-300 transform hover:scale-105 relative overflow-hidden pb-16">
      {successMessage && <div className="text-green-600 mb-4">{successMessage}</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}

      <p className="text-2xl font-bold text-gray-800 shadow-glow mb-2">
        <span className="font-bold">Total Amount:</span> ₹{request.totalAmount}
      </p>
      <h3 className="text-lg font-semibold">
        <span className="font-bold">Customer's Name :</span> {request.customerName? request.customerName : "S"}
      </h3>
      <p className="text-gray-700">
        <span className="font-bold">Request Id :</span> {request.requestId}
      </p>
      <p className="text-gray-700">
        <span className="font-bold">Pickup Location:</span> {request.pickupLocation}
      </p>
      <p className="text-gray-700">
        <span className="font-bold">Scheduled Pickup Date:</span> {new Date(request.scheduledPickupDate).toLocaleString()}
      </p>
      <p className={`font-bold uppercase ${getConditionStyle(request.condition)} shadow-lg`}>
        Condition: {request.condition}
      </p>

      <h4 className="text-md font-semibold mt-4">Scraps:</h4>
      <ul className="list-disc ml-6 mb-4">
        {request.scraps.map((scrap) => (
          <li key={scrap._id} className="text-gray-700">
            <span className="font-bold">
              {scrap.category} - {scrap.subCategory}:
            </span> {scrap.quantity} units
          </li>
        ))}
      </ul>

      {/* Accept Request Button fixed at the bottom */}
      <button
        onClick={() => AcceptRequest(request.requestId)}
        className="py-2 px-4 absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 w-11/12"
        >
        Accept Request
      </button>
    </div>
  );
};

export default RequestCard;
