import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Customer = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if the user is not a customer
    if (!user || user.role !== "customer") {
      navigate("/unauthorized"); // Redirect to unauthorized page or login
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <div>
      <h1>Customer Dashboard</h1>
      {user && (
        <div>
          <p>Welcome, {user.fullName}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      {/* Add Customer-specific content here */}
    </div>
  );
};

export default Customer;
