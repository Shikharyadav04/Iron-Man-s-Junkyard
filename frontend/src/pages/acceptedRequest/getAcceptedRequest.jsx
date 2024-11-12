import React, { useEffect, useState } from "react";
import axios from "axios";
import AcceptedRequestCard from "./AcceptedRequestCard"; // Ensure the path and casing are correct
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GetAcceptedRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
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
      setRequests(response.data.data);
    } catch (err) {
      // Display backend error message using Toastify
      const errorMessage =
        err.response?.data?.message || "Error fetching request.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) {
    return <div>Loading requests...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {requests.length > 0 ? (
        requests.map((request, index) => (
          <AcceptedRequestCard // Capitalized correctly here
            key={`${request.id}-${index}`}
            request={request}
          />
        ))
      ) : (
        <div>No requests available...</div>
      )}

      {/* Toast container for displaying messages */}
      <ToastContainer />
    </div>
  );
};

export default GetAcceptedRequest;
