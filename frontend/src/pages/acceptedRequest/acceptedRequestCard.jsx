import React, { useState } from "react";
import axios from "axios";

const AcceptedRequestCard = ({ request }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

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

  const completePayment = async (transactionId, paymentMethod) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/payment/complete-payment",
        {
          transactionId,
          paymentMethod,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setSuccessMessage(response.data.message);
      setError(null);
      setShowPaymentOptions(false);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred";
      setError(`{ success: "false", message: "${errorMessage}" }`);
      setSuccessMessage("");
    }
  };

  const closeRequest = async (transactionId) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/request/close-request",
        {
          transactionId,
        },
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
        <span className="font-bold">Total Amount:</span> ₹{request.totalAmount}
      </p>
      <h3 className="text-lg font-semibold">
        <span className="font-bold">Customer's Name :</span>{" "}
        {request.userId.fullName}
      </h3>
      <p className="text-gray-700">
        <span className="font-bold">Request Id :</span> {request.requestId}
      </p>
      <p className="text-gray-700">
        <span className="font-bold">Pickup Location:</span>{" "}
        {request.pickupLocation}
      </p>
      <p className="text-gray-700">
        <span className="font-bold">Scheduled Pickup Date:</span>{" "}
        {new Date(request.scheduledPickupDate).toLocaleString()}
      </p>
      <p
        className={`font-bold uppercase ${getConditionStyle(
          request.condition
        )} shadow-lg`}
      >
        Condition: {request.condition}
      </p>
      <h4 className="text-md font-semibold mt-4">Scraps:</h4>
      <ul className="list-disc ml-6">
        {request.scraps.map((scrap) => (
          <li key={scrap._id} className="text-gray-700">
            <span className="font-bold">
              {scrap.category} - {scrap.subCategory}:
            </span>{" "}
            {scrap.quantity} units
          </li>
        ))}
      </ul>

      <button
        onClick={() => setShowPaymentOptions(!showPaymentOptions)}
        className="mt-4 py-1 px-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 w-full"
      >
        Complete Payment
      </button>

      {showPaymentOptions && (
        <div className="mt-4">
          <label htmlFor="paymentMethod" className="block font-semibold mb-2">
            Select Payment Method:
          </label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="block w-full p-2 border rounded-lg mb-4"
          >
            <option value="">-- Choose a method --</option>
            <option value="UPI">UPI</option>
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
          <button
            onClick={() =>
              completePayment(request.transactionId, paymentMethod)
            }
            className="py-1 px-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200 w-full"
          >
            Complete Payment
          </button>
        </div>
      )}
      <button
        onClick={() => closeRequest(request.transactionId)}
        className="py-1 px-2 bg-red-600 mt-4 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200 w-full"
      >
        Close Request
      </button>
    </div>
  );
};

export default AcceptedRequestCard;
