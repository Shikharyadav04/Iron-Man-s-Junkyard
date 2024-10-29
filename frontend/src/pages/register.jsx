import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { user, register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    role: "customer", // default role
    address: "",
    avatar: null, // Initialize avatar
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
    const { name, value, files } = e.target;
    if (name === "avatar") {
      setFormData({ ...formData, avatar: files[0] }); // Store the file in formData
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, fullName, role, address, avatar } =
      formData;

    // Create FormData
    const data = new FormData();
    data.append("username", username);
    data.append("email", email);
    data.append("password", password);
    data.append("fullName", fullName);
    data.append("role", role);
    data.append("address", address);
    if (avatar) {
      data.append("avatar", avatar);
    }

    console.log("Submitting registration with data:", data); // Log data for debugging

    try {
      const response = await register(data);
      console.log("Registration response:", response); // Log response for debugging

      // Check if response is as expected
      if (response && response.data && response.data.user) {
        // Handle successful registration
        alert("Registration successful!"); // Notify the user of success
      } else {
        alert("Registration failed: Unexpected response from server");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      let message = "Registration failed. Please try again.";
      if (error.response) {
        message = error.response.data.message || "Unknown error";
      }
      alert(message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        onChange={handleChange}
        placeholder="Username"
        required
      />
      <input
        type="email"
        name="email"
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="text"
        name="fullName"
        onChange={handleChange}
        placeholder="Full Name"
        required
      />
      <input
        type="password"
        name="password"
        onChange={handleChange}
        placeholder="Password"
        required
      />

      {/* Avatar Upload */}
      <input
        type="file"
        name="avatar"
        accept="image/*" // Only allow image files
        onChange={handleChange}
        required
      />

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
