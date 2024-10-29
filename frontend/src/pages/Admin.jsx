import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if the user is not an admin
    if (!user || user.role !== "admin") {
      navigate("/unauthorized"); // Redirect to unauthorized page or login
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {user && (
        <div>
          <p>Welcome, {user.fullName}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      {/* Add Admin-specific content here */}
    </div>
  );
};

export default Admin;