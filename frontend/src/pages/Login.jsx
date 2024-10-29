import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.jsx";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Pass the credentials object directly
      const user = await login(credentials);
      console.log("Logged in user:", user); // Log the user to verify
      if (user && user.role) {
        // Check if user and role are defined
        if (user.role === "admin") navigate("/admin");
        else if (user.role === "customer") navigate("/customer");
        else if (user.role === "dealer") navigate("/dealer");
      } else {
        setError("User role is undefined.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username or Email"
          onChange={handleChange}
          value={credentials.username} // Controlled input
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={credentials.password} // Controlled input
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
