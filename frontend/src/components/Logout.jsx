import React from 'react';
import { useAuth } from '../context/AuthProvider';
import { toast } from 'react-hot-toast';

const Logout = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully!');
    } catch (error) {
      console.error("Logout error:", error);
      toast.error('Logout failed: ' + (error.response?.data?.message || 'An error occurred'));
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-200 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
    >
      Logout
    </button>
  );
};

export default Logout;
