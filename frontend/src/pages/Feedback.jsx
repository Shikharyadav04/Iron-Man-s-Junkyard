import { useState } from "react";
import axios from "axios";
import Alert from '@mui/joy/Alert';
import BackgroundBeams from "@/components/BackgroundBeams";


const Feedback = () => {
  const [transactionId, setTransactionId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(1);
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const submitFeedback = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/v1/feedback", {
  
        transactionId,
        customerId,
        message,
        rating,
      });
      setFeedbackMsg(response.data.message);
      setTransactionId("");
      setCustomerId("");
      setMessage("");
      setRating(1);
    } catch (error) {
      setFeedbackMsg(<Alert variant="solid">"Error submitting feedback."</Alert>);
    }
  };

  return (
   
        <form onSubmit={submitFeedback} className="p-4 max-w-md mx-auto bg-white shadow-md rounded-md">
          <h2 className="text-lg font-bold mb-4">Submit Feedback</h2>

        <input
          type="text"
          placeholder="Transaction ID"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          placeholder="Customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded"
          required
        />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded"
        ></textarea>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full p-2 mb-3 border border-gray-300 rounded"
          required
        />

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Submit Feedback
        </button>
        {feedbackMsg && (
         <p className={`mt-2 text-center ${feedbackMsg === "Error submitting feedback." ? "text-red-500" : "text-green-500"}`}>
           {feedbackMsg}
         </p>

        )}

      </form>
      
    
  );
};

export default Feedback;
