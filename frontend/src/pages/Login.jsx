import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useLoader } from "../context/LoaderContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const Login = () => {
  const { user, login } = useAuth();
  const { showLoader, hideLoader } = useLoader();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    identifier: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  useEffect(() => {
    if (user) {
      navigate(`/${user.role}`);
      toast.success(`Welcome back, ${user.role}!`);
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoader();

    const loaderTimeout = setTimeout(() => {
      hideLoader();
      toast.warning("Request taking longer than expected, please try again.");
    }, 4000);

    try {
      await login(credentials);
      clearTimeout(loaderTimeout);
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(error.message || "Login failed. Please try again.");
    } finally {
      hideLoader();
    }
  };

  return (
    <div className="bg-[url('https://i.pinimg.com/originals/12/58/59/1258595725c0fb95b2255f678c1afead.gif')] bg-cover backdrop-blur-xl flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-transparent glow-text rounded-lg shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center ">Login</h2>

        <input
          type="text"
          name="identifier"
          onChange={handleChange}
          placeholder="Username or Email"
          required
          className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"} // Toggle between "text" and "password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle icon */}
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
        >
          Login
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
