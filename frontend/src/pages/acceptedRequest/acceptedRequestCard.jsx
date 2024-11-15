import React, { useState, useEffect } from "react";
import axios from "axios";

const AcceptedRequestCard = ({ request } , {customer}) => {
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);
  console.log(request)
  useEffect(() => {
    // Ensure Razorpay script is loaded
    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const getConditionStyle = (condition) => {
    switch (condition) {
      case "Old":
        return "text-yellow-500 shadow-yellow-500/50";
      case "Good":
        return "text-green-500 shadow-green-500/50";
      case "Damaged":
        return "text-red-500 shadow-red-500/50";
      default:
        return "text-gray-500";
    }
  };

  const initiatePayment = async () => {
    try {
      const amountInPaise = request.totalAmount * 100;
      const response = await axios.post("http://localhost:8000/order", {
        amount: amountInPaise,
        currency: "INR",
        receipt: "receipt_id_1",
      });

      const order = response.data;
      const options = {
        key: "rzp_test_SsMrULmHcOIOt1",
        amount: order.amount,
        currency: "INR",
        name: "Acme Corp",
        description: "Complete Payment",
        image: "https://example.com/your_logo",
        order_id: order.id,
        handler: async (response) => {
          try {
            const validateRes = await axios.post("http://localhost:8000/order/validate", response, {
              headers: { "Content-Type": "application/json" },
            });
            setSuccessMessage("Payment successful");
            setPaymentCompleted(true);  // Set payment as completed
            setError(null);
          } catch (err) {
            setError("Payment validation failed");
            console.error("Validation error:", err);
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", (response) => {
        setError(`Payment failed: ${response.error.description}`);
        console.error("Payment failed details:", response.error);
      });
      rzp1.open();
    } catch (err) {
      setError("Payment initiation error");
      console.error("Payment initiation error:", err);
    }
  };

  const closeRequest = async (transactionId) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/request/close-request",
        { transactionId },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      setSuccessMessage(response.data.message);
      setError(null);
    } catch (err) {
      setError("Failed to close request");
      console.error("Close request error:", err);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 transition-transform duration-300 transform hover:scale-105">
      {successMessage && <div className="text-green-600 mb-4">{successMessage}</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}

      <p className="text-2xl font-bold text-gray-800 shadow-glow mb-2">
        <span className="font-bold">Total Amount:</span> ₹{request.totalAmount}
      </p>
      <h3 className="text-lg font-semibold">
        <span className="font-bold">Customer's Name :</span> {request.customerName? request.customerName : "S"}
      </h3>
      <p className="text-gray-700">
        <span className="font-bold">Request Id :</span> {request._id}
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

      {!paymentCompleted ? (
        <button
          onClick={initiatePayment}
          className="mt-4 py-1 px-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 w-full"
        >
          Complete Payment
        </button>
      ) : (
        <button
          onClick={() => closeRequest(request.transactionId)}
          className="py-1 px-2 bg-red-600 mt-4 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200 w-full"
        >
          Close Request
        </button>
      )}
    </div>
  );
};

export default AcceptedRequestCard;
