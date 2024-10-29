import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer'); // Default to 'customer'
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const credentials = {
      email,
      username,
      password,
    };

    try {
      await login(credentials); // Call login function from Auth context

      // Redirect based on user role
      if (role === 'customer') {
        navigate('/customer');
      } else if (role === 'dealer') {
        navigate('/dealer');
      } else if (role === 'admin') {
        navigate('/admin');
      }
      
      toast.success('Login successful!');
    } catch (error) {
      console.error(error);
      toast.error('Login failed: ' + (error.response?.data?.message || 'An error occurred'));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Login</h2>
        
        <div className="mb-4">
          <label htmlFor="username" className="block mb-1">Username:</label>
          <input 
            type="text" 
            id="username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="border rounded p-2 w-full"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">Email:</label>
          <input 
            type="email" 
            id="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border rounded p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block mb-1">Password:</label>
          <input 
            type="password" 
            id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border rounded p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="role" className="block mb-1">Role:</label>
          <select 
            id="role" 
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border rounded p-2 w-full"
          >
            <option value="customer">Customer</option>
            <option value="dealer">Dealer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" className="bg-blue-500 text-white rounded py-2 w-full">Login</button>
      </form>
    </div>
  );
};

export default Login;
