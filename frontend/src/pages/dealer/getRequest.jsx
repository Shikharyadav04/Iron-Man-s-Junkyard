import React, { useEffect, useState } from "react";
import axios from "axios"; // Make sure to import axios
import RequestCard from "./RequestCard";
const getRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState("");

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {requests.length > 0 ? (
        requests.map((request, index) => (
          <RequestCard key={`${request.id}-${index}`} request={request} /> // Ensure unique key using id and index
        ))
      ) : (
        <div>No requests available...</div> // Message for no bills
      )}
    </div>
  );
};

export default getRequest;
