import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dealer = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if the user is not a dealer
    if (!user || user.role !== "dealer") {
      navigate("/unauthorized"); // Redirect to unauthorized page or login
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <div>
      <h1>Dealer Dashboard</h1>
      {user && (
        <div>
          <p>Welcome, {user.fullName}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      {/* Add Dealer-specific content here */}
    </div>
  );
};

export default Dealer;
