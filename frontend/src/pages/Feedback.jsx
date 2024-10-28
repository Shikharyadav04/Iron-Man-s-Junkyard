// FeedbackForm.js
import React, { useState } from "react";

const Feedback = () => {
  const [transactionId, setTransactionId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    const feedbackData = {
      transactionId,
      customerId,
      message,
      rating,
    };

    try {
      const response = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData),
      });
      if (response.ok) {
        setSuccessMessage("Feedback submitted successfully!");
        setTransactionId("");
        setCustomerId("");
        setMessage("");
        setRating(1);
      } else {
        setErrorMessage("Error submitting feedback");
      }
    } catch (error) {
      setErrorMessage("An error occurred");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Submit Feedback</h2>
      {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Transaction ID</label>
          <input
            type="text"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Customer ID</label>
          <input
            type="text"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700">Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Feedback;
