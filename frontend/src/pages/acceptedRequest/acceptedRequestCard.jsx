import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLoader } from "@/context/LoaderContext";

const AcceptedRequestCard = ({ request }) => {
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);
  const { showLoader, hideLoader } = useLoader(); // Access loader functions

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
      showLoader(); // Show the loader before initiating payment
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
            const validateRes = await axios.post(
              "http://localhost:8000/order/validate",
              response,
              {
                headers: { "Content-Type": "application/json" },
              }
            );
            setSuccessMessage("Payment successful");
            setPaymentCompleted(true); // Set payment as completed
            setError(null);
          } catch (err) {
            setError("Payment validation failed");
            console.error("Validation error:", err);
          } finally {
            hideLoader(); // Hide loader after payment validation
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
        hideLoader(); // Hide loader if payment failed
      });
      rzp1.open();
    } catch (err) {
      setError("Payment initiation error");
      console.error("Payment initiation error:", err);
      hideLoader(); // Hide loader if there's an error
    }
  };

  const closeRequest = async (transactionId) => {
    try {
      showLoader(); // Show the loader before closing the request
      const response = await axios.post(
        "http://localhost:8000/api/v1/request/close-request",
        { transactionId },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setSuccessMessage(response.data.message);
      setError(null);
    } catch (err) {
      setError("Failed to close request");
      console.error("Close request error:", err);
    } finally {
      hideLoader(); // Hide loader after request is closed or failed
    }
  };

  return (
    <div
      style={{
        backgroundColor: request.isSubscriber ? "#ffdc73" : "white",
      }}
      className="shadow-md rounded-lg p-4 mb-4 transition-transform duration-300 transform hover:scale-105 relative overflow-hidden pb-16"
    >
      {successMessage && (
        <div className="text-green-600 mb-4">{successMessage}</div>
      )}
      {error && <div className="text-red-600 mb-4">{error}</div>}

      <p className="text-2xl font-bold text-gray-800 shadow-glow mb-2">
        <span className="font-bold">Total Amount:</span> ₹{request.totalAmount}
      </p>
      <h3 className="text-lg font-semibold">
        <span className="font-bold">Customer's Name :</span>{" "}
        {request.userId?.fullName}
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
