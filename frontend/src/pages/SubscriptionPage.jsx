import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubscriptionPage = () => {
  const [duration, setDuration] = useState("1m"); // Default subscription duration
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(199); // Default amount for 1 month (in paise)

  // Set amount based on selected duration
  const handleDurationChange = (e) => {
    const selectedDuration = e.target.value;
    setDuration(selectedDuration);
    if (selectedDuration === "1m") {
      setAmount(199); // 1 month = 500 INR
    } else if (selectedDuration === "6m") {
      setAmount(1199); // 1 year = 5000 INR
    } else if (selectedDuration === "1y") {
      setAmount(1999); // 1 year = 5000 INR
    }
  };


  // Dynamically load the Razorpay script when the component mounts
  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);

      // Clean up the script on unmount
      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  const handlePayment = async () => {
    try {
      setLoading(true);

      // Make API call to create Razorpay order, passing the selected amount and duration
      const { data } = await axios.post('http://localhost:8000/order', {
        amount: amount, // Amount passed from frontend
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
        notes: {
          duration,
        },
      });

      // Initialize Razorpay checkout
      const options = {
        key: "rzp_test_SsMrULmHcOIOt1",  // Use your Razorpay key here
        amount: data.amount,
        currency: data.currency,
        name: "ScrapMan",
        description: "Subscription Payment",
        image: "/logo.png", // Your logo
        order_id: data.id,
        handler: async function (response) {
          // Payment successful, send validation request
          try {
            const { data: validationData } = await axios.post('http://localhost:8000/order/validate', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (validationData.msg === "success") {
              await axios.post(
                'http://localhost:8000/api/v1/users/subscribe',
                { duration },
                {
                  withCredentials: true, // Ensure credentials are sent with the request
                }
              );             

              alert("Subscription successful!");
            } else {
              alert("Payment validation failed. Please try again.");
            }
          } catch (err) {
            console.log(err);
            alert("Error validating payment.");
          }
        },
        prefill: {
          name: "John Doe", // User's name
          email: "john@example.com", // User's email
        },
        theme: {
          color: "#F37254",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.log(err);
      alert("Error initiating payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto py-10 p-4 bg-white rounded-lg shadow-md mt-8">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Subscription Page</h1>
      <p className="text-lg text-gray-700 mb-4">Select subscription duration:</p>
      <select
        onChange={handleDurationChange}
        value={duration}
        className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="1m">1 Month</option>
        <option value="1m">6 Month</option>
        <option value="1y">1 Year</option>
      </select>

      <p className="text-xl font-semibold text-gray-800 mb-6">Amount: ₹{amount}</p>

      <button
        onClick={handlePayment}
        disabled={loading}
        className={`w-full py-3 px-4 text-white font-semibold rounded-lg ${
          loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
        } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
      >
        {loading ? 'Processing...' : `Pay for ${duration}`}
      </button>
    </div>
  );
};

export default SubscriptionPage;
