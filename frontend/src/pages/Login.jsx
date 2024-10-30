import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.jsx";
import Loader from "../components/Loader"; // Import the Loader component

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    identifier: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true before login attempt

    const loginData = {
      password: credentials.password,
      ...(credentials.identifier.includes("@")
        ? { email: credentials.identifier }
        : { username: credentials.identifier }),
    };

    try {
      const user = await login(loginData);
      console.log("Logged in user:", user);
      if (user && user.role) {
        navigate(`/${user.role}`); // Navigate based on user role
      } else {
        setError("User role is undefined.");
      }
    } catch (err) {
      setError(err.message); // Set the error message from the backend
    } finally {
      setLoading(false); // Set loading to false after the attempt
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-transparent">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {loading ? ( // Show loader while loading
          <Loader />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="identifier"
              placeholder="Username or Email"
              onChange={handleChange}
              value={credentials.identifier}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={credentials.password}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
