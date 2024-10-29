import React from 'react';
import { useAuth } from '../context/AuthProvider';
import { toast } from 'react-hot-toast';

const Logout = () => {
  const { logout } = useAuth(); // Use logout function from Auth context

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully!');
    } catch (error) {
      console.error("Logout error:", error); // Log any logout errors
      toast.error('Logout failed: ' + (error.response?.data?.message || 'An error occurred'));
    }
  };
  
  
  
  
  
  
  
  
  

  return (
    <button onClick={handleLogout} className='text-red-500'>
      Logout
    </button>
  );
};

export default Logout;
