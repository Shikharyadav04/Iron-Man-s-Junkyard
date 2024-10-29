import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { user, register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullName: "",
    password: "",
    role: "customer", // default role
    address: "",
  });

  useEffect(() => {
    // Redirect if user is already logged in
    if (user) {
      if (user.role === "admin") navigate("/admin/dashboard");
      else if (user.role === "dealer") navigate("/dealer/dashboard");
      else navigate("/customer/dashboard");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(formData);
      const { role } = response.user;

      // Redirect based on role
      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "dealer") navigate("/dealer/dashboard");
      else navigate("/customer/dashboard");

      alert("Registration successful");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" onChange={handleChange} placeholder="Username" required />
      <input type="email" name="email" onChange={handleChange} placeholder="Email" required />
      <input type="text" name="fullName" onChange={handleChange} placeholder="Full Name" required />
      <input type="password" name="password" onChange={handleChange} placeholder="Password" required />

      {/* Role Selection */}
      <select name="role" onChange={handleChange} value={formData.role}>
        <option value="customer">Customer</option>
        <option value="dealer">Dealer</option>
        <option value="admin">Admin</option>
      </select>

      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
