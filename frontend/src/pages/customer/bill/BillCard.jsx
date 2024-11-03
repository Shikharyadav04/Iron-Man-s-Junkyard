import React from "react";

const BillCard = ({ bill }) => {
  // Function to determine the status style based on the status value
  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "text-yellow-500 shadow-yellow-500/50"; // Yellow for pending
      case "accepted":
        return "text-green-500 shadow-green-500/50"; // Green for accepted
      case "completed":
        return "text-blue-500 shadow-blue-500/50"; // Blue for completed
      case "canceled":
        return "text-red-500 shadow-red-500/50"; // Red for canceled
      default:
        return "text-gray-500"; // Default color for unknown status
    }
  };

  return (
    <div className="bg-transparent shadow-md rounded-lg p-4 mb-4 transition-transform duration-300 transform hover:scale-105">
      <h3 className="text-lg font-semibold">
        Bill ID: <span className="font-bold">{bill.requestId}</span>
      </h3>
      <p className="text-gray-700">
        <span className="font-bold">Pickup Location:</span>{" "}
        {bill.pickupLocation}
      </p>
      <p className="text-gray-700">
        <span className="font-bold">Scheduled Pickup Date:</span>{" "}
        {new Date(bill.scheduledPickupDate).toLocaleString()}
      </p>
      <p className="text-gray-700">
        <span className="font-bold">Condition:</span> {bill.condition}
      </p>
      <p
        className={`font-bold uppercase ${getStatusStyle(
          bill.status
        )} shadow-lg`}
      >
        Status: {bill.status}
      </p>
      <p className="text-gray-700">
        <span className="font-bold">Total Amount:</span> ₹{bill.totalAmount}
      </p>
      <h4 className="text-md font-semibold mt-4">Scraps:</h4>
      <ul className="list-disc ml-6">
        {bill.scraps.map((scrap) => (
          <li key={scrap._id} className="text-gray-700">
            <span className="font-bold">
              {scrap.category} - {scrap.subCategory}:
            </span>{" "}
            {scrap.quantity} units
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BillCard;
