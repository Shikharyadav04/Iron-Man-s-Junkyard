import React, { useEffect, useState } from "react";
import axios from "axios";
import AcceptedRequestCard from "./AcceptedRequestCard"; // Ensure the path and casing are correct
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLoader } from "@/context/LoaderContext"; // Use your global loader context

const GetAcceptedRequest = () => {
  const [requests, setRequests] = useState([]);
  const { showLoader, hideLoader } = useLoader(); // Use loader context
  const [error, setError] = useState(null);

  const fetchRequests = async () => {
    showLoader(); // Show loader at the start of request
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/request/get-accepted-request",
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log("Fetched Requests:", response.data);
      setRequests(response.data.data); // Set the requests
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching requests.");
      console.error("Error fetching requests:", err);
      toast.error(error); // Display error message using Toastify
    } finally {
      hideLoader(); // Hide loader after the operation
    }
  };

  useEffect(() => {
    fetchRequests(); // Fetch requests when component mounts
  }, []);

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  if (requests.length === 0) {
    return <div>No requests available...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {requests.length > 0 ? (
        requests.map((request, index) => (
          <AcceptedRequestCard
            key={`${request.id}-${index}`} // Unique key for each request
            request={request}
          />
        ))
      ) : (
        <div>No accepted requests yet...</div>
      )}

      {/* Toast container for displaying messages */}
      <ToastContainer />
    </div>
  );
};

export default GetAcceptedRequest;
