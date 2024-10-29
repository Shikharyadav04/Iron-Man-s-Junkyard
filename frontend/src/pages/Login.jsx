import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  useEffect(() => {
    // Redirect if user is already logged in
    if (user) {
      if (user.role === "admin") navigate("/admin/dashboard");
      else if (user.role === "dealer") navigate("/dealer/dashboard");
      else navigate("/customer/dashboard");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(credentials);
      const { role } = response.user;

      // Redirect based on role
      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "dealer") navigate("/dealer/dashboard");
      else navigate("/customer/dashboard");

      alert("Login successful");
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" onChange={handleChange} placeholder="Username" required />
      <input type="password" name="password" onChange={handleChange} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
