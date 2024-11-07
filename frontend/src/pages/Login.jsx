import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader"; // Import the Loader component

const Login = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    if (user) {
      navigate(`/${user.role}`); // Redirect based on user role
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true before login attempt

    try {
      await login(credentials); // Call the login function
    } catch (error) {
      console.error("Error logging in:", error);
      alert(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after the attempt
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F2FBF6]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

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
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            />

            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Login
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default Login;
