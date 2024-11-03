import React, { useEffect, useState } from "react";
import BillCard from "./BillCard"; // Ensure this component exists
import axios from "axios"; // Make sure to import axios

const BillPage = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBills = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/request/get-user-request",
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log("Fetched bills:", response.data); // Log the entire response
      const fetchedBills = response.data.data; // Store the fetched bills

      // Log IDs to check for duplicates
      const ids = fetchedBills.map((bill) => bill.id);
      console.log("Fetched bill IDs:", ids);

      setBills(fetchedBills); // Set state with the bills
    } catch (err) {
      console.error("Error fetching bills:", err);
      setError("Error fetching bills."); // Set error state if there is an error
    } finally {
      setLoading(false); // Ensure loading is set to false after fetch
    }
  };

  useEffect(() => {
    fetchBills(); // Call the fetch function when the component mounts
  }, []);

  if (loading) {
    return <div>Loading bills...</div>; // Loading state
  }

  if (error) {
    return <div>{error}</div>; // Error state
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {bills.length > 0 ? (
        bills.map((bill, index) => (
          <BillCard key={`${bill.id}-${index}`} bill={bill} /> // Ensure unique key using id and index
        ))
      ) : (
        <div>No bills available.</div> // Message for no bills
      )}
    </div>
  );
};

export default BillPage;
