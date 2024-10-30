import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader"; // Import the Loader component

const Register = () => {
  const { user, register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    role: "customer",
    address: "",
    avatar: null,
  });
  const [loading, setLoading] = useState(false); // Loading state
  const [success, setSuccess] = useState(false); // Success state

  useEffect(() => {
    if (user) {
      if (user.role === "admin") navigate("/admin");
      else if (user.role === "dealer") navigate("/dealer");
      else navigate("/customer");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
      setFormData({ ...formData, avatar: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true before registration attempt
    const { username, email, password, fullName, role, address, avatar } =
      formData;

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

    try {
      await register(data); // Call the register function
      setSuccess(true); // Set success to true
      // Optionally redirect or show a success message
      setTimeout(() => navigate("/login"), 2000); // Redirect to login after 2 seconds
    } catch (error) {
      console.error("Error registering user:", error);
      let message = "Registration failed. Please try again.";
      if (error.response) {
        message = error.response.data.message || "Unknown error";
      }
      alert(message); // Keep alert for error messages
    } finally {
      setLoading(false); // Set loading to false after the attempt
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Register
        </h2>

        {loading ? ( // Show loader while loading
          <Loader />
        ) : (
          <>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              placeholder="Username"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            />

            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            />

            <input
              type="text"
              name="fullName"
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            />

            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            />

            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            />

            <select
              name="role"
              onChange={handleChange}
              value={formData.role}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            >
              <option value="customer">Customer</option>
              <option value="dealer">Dealer</option>
              <option value="admin">Admin</option>
            </select>

            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Register
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default Register;
