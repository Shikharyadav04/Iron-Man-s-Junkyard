import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useLoader } from "@/context/LoaderContext";

const Register = () => {
  const { user, register } = useAuth();
  const { showLoader, hideLoader } = useLoader();
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
  const [alert, setAlert] = useState(null);

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
    showLoader();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      await register(data); // Call the register function
      setAlert({
        type: "success",
        message: "Registration successful! Redirecting to login...",
      });
      setTimeout(() => navigate("/login"), 2000); // Redirect to login after 2 seconds
    } catch (error) {
      console.error("Error registering user:", error);
      setAlert({
        type: "error",
        message: error.message || "Registration failed. Please try again.",
      });
    } finally {
      hideLoader(); // Hide the loader after the attempt
    }
  };

  return (
    <div className="bg-[url('https://i.pinimg.com/564x/80/d9/c0/80d9c0b74a6402241de02b16fc9df20c.jpg')] bg-cover backdrop-blur-xl flex justify-center items-center min-h-screen bg-[#F2FBF6]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Register
        </h2>

        {alert && (
          <div
            className={`p-4 mb-4 text-sm ${
              alert.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            } rounded-md`}
            role="alert"
          >
            {alert.message}
          </div>
        )}

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
      </form>
    </div>
  );
};

export default Register;
