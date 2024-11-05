import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RequestCard from "./RequestCard";

const GetRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const fetchRequests = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/request/get-pending-request",
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log("Fetched Requests:", response.data); // Log the entire response
      const fetchedRequests = response.data.data;
      setRequests(fetchedRequests);
    } catch (err) {
      console.error("Error fetching request:", err);
      setError("Error fetching request."); // Set error state if there is an error
    } finally {
      setLoading(false); // Ensure loading is set to false after fetch
    }
  };

  useEffect(() => {
    fetchRequests(); // Call the fetch function when the component mounts
  }, []);

  if (loading) {
    return <div>Loading requests...</div>; // Loading state
  }

  if (error) {
    return <div>{error}</div>; // Error state
  }

  return (
    <div className="p-4 ">
      {/* Back button to navigate to dealer page */}
      <button
        onClick={() => navigate("/dealer")}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Back to Dealer Page
      </button>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {requests.length > 0 ? (
          requests.map((request, index) => (
            <RequestCard key={`${request.id}-${index}`} request={request} /> // Ensure unique key using id and index
          ))
        ) : (
          <div>No requests available...</div> // Message for no requests
        )}
      </div>
    </div>
  );
};

export default GetRequest;
