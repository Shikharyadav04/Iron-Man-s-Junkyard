import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BillCard from "./BillCard";
import axios from "axios";

const BillPage = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(bills.length === 0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchBills = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/request/get-user-request",
        {},
        {
          withCredentials: true,
        }
      );
      const fetchedBills = response.data.data;
      setBills(fetchedBills);
      localStorage.setItem("bills", JSON.stringify(fetchedBills)); // Store bills in local storage
    } catch (err) {
      console.error("Error fetching bills:", err);
      setError("Error fetching bills.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (bills.length === 0) {
      fetchBills(); // Fetch only if there are no bills in local storage
    }
  }, []);

  const handleBack = () => {
    navigate("/customer");
  };

  if (loading) {
    return <div>Loading bills...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <button
        onClick={handleBack}
        className="mb-4 py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
      >
        Back
      </button>
      <div className="bg-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {bills.length > 0 ? (
          bills.map((bill, index) => (
            <BillCard key={`${bill.id}-${index}`} bill={bill} />
          ))
        ) : (
          <div>No bills available.</div>
        )}
      </div>
    </div>
  );
};

export default BillPage;
