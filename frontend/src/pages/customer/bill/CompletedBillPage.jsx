// CompletedBillPage.jsx
import React, { useEffect, useState } from "react";
import BillCard from "./BillCard"; // Ensure this component exists
import axios from "axios";
import { useLoader } from "@/context/LoaderContext"; // Use your global loader context

const CompletedBillPage = () => {
  const [bills, setBills] = useState([]);
  const { showLoader, hideLoader } = useLoader(); // Use global loader context

  const fetchBills = async () => {
    showLoader(); // Show global loader at start of request
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/request/get-completed-pickup",
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
    } finally {
      hideLoader(); // Hide the global loader after request completes
    }
  };

  useEffect(() => {
    fetchBills(); // Call the fetch function when the component mounts
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-white">
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

export default CompletedBillPage;
