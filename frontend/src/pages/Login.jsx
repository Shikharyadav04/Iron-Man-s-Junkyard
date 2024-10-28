

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Register from './register';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('customer'); // Default user type

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here based on userType
    console.log(`Logging in as ${userType} with email: ${email} and password: ${password}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-transparent">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center bg-transparent">Login</h2>
        <form onSubmit={handleSubmit} className='bg-white'>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 bg-white">User Type</label>
            <select
              className="mt-1 block w-full p-2 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
              <option value="dealer">Dealer</option>
            </select>
          </div>
          <div className="mb-4 bg-transparent">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium bg-transparent text-gray-700">Password</label>
            <input
              type="password"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
          >
            Login
          </button>
          <br></br>
          <p className='bg-transparent'>  Don't have account?<a href="/register" className="text-blue-500 bg-transparent hover:underline">
                Register
              </a>
          </p>
          <br></br>
          <p className='text-center text-sm'>
            I agree to the Terms & Conditions & 
            Privacy Policy
          </p>

        </form>
      </div>
    </div>
  );
};

export default Login;
