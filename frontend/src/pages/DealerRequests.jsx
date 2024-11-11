import React, { useState, useEffect } from "react";
import axios from "axios";

const DealerRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch pending dealer requests from the backend
    const fetchDealerRequests = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/users/get-dealer-request");
        setRequests(response.data.data); // Assuming the data is in the 'data' field
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch dealer requests.");
        setLoading(false);
      }
    };

    fetchDealerRequests();
  }, []);

  // Handle accept dealer registration
  const acceptRequests = async () => {
    try {
      // Send a request to accept all pending dealer registrations
      const response = await axios.post("/api/v1/dealer/accept-dealer");
      
      // Update the UI by removing all accepted requests
      setRequests([]); // Clear the list since all pending requests are accepted
      console.log("All requests accepted:", response.data);
    } catch (err) {
      setError("Failed to accept the requests.");
      console.error("Error accepting requests:", err.response ? err.response.data : err.message);
    }
  };
  
  
  
  
  
  
  
  
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pending Dealer Requests</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !requests.length && <p>No pending requests found.</p>}

      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Full Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Address</th>
            <th className="border border-gray-300 px-4 py-2">Contact</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request._id}>
              <td className="border border-gray-300 px-4 py-2">{request.fullName}</td>
              <td className="border border-gray-300 px-4 py-2">{request.email}</td>
              <td className="border border-gray-300 px-4 py-2">{request.address}</td>
              <td className="border border-gray-300 px-4 py-2">{request.contact}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => acceptRequests(request._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Accept
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DealerRequests;
