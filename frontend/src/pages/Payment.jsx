import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Payment = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { amount } = location.state || { amount: 0 };
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    if (!requestId) {
      setError("Request ID is missing.");
    }
  }, [requestId]);

  const handleCompletePayment = async () => {
    if (!requestId || amount <= 0) {
      setError("Invalid request ID or amount.");
      return;
    }
    setIsSubmitting(true);
    setError("");

    const payload = { requestId, amount, paymentMethod };

    try {
      const response = await fetch("http://localhost:8000/api/v1/payment/complete-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to complete payment");
      }

      const data = await response.json();
      console.log("Payment completed successfully:", data);
      navigate("/success");
    } catch (err) {
      console.error("Payment error:", err);
      setError(err.message || "An error occurred while processing the payment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInitialPayment = async () => {
    if (!transactionId || amount <= 0) {
      setError("Invalid transaction ID or amount.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    const payload = {
      transactionId,
      paymentDetails: { amount, paymentMethod },
    };

    try {
      const response = await fetch("http://localhost:8000/api/v1/payment/complete-initial-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to make initial payment");
      }

      const data = await response.json();
      console.log("Initial payment completed successfully:", data);
      navigate("/success");
    } catch (err) {
      console.error("Initial payment error:", err);
      setError(err.message || "An error occurred while processing the initial payment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Complete Your Payment</h1>
        {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
        
        <p className="text-lg text-gray-700 font-medium mb-6 text-center">Amount to Pay: <span className="text-indigo-600 font-bold">${amount}</span></p>
        
        <div className="mb-6">
          <label htmlFor="paymentMethod" className="block text-gray-700 font-medium mb-2">Payment Method</label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-3 border rounded-md shadow-sm focus:ring focus:ring-indigo-200"
          >
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>
        
        <div className="mb-6">
          <label htmlFor="transactionId" className="block text-gray-700 font-medium mb-2">Transaction ID</label>
          <input
            type="text"
            id="transactionId"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            placeholder="Enter Transaction ID for Initial Payment"
            className="w-full p-3 border rounded-md shadow-sm focus:ring focus:ring-indigo-200"
          />
        </div>
        
        <div className="space-y-4">
          <button
            onClick={handleInitialPayment}
            className={`w-full py-3 text-white font-semibold rounded-md transition-colors ${
              isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing Initial Payment..." : "Make Initial Payment"}
          </button>
          <button
            onClick={handleCompletePayment}
            className={`w-full py-3 text-white font-semibold rounded-md transition-colors ${
              isSubmitting ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing Complete Payment..." : "Complete Payment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
