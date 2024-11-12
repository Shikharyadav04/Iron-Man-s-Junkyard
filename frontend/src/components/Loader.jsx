import React from 'react';
import { useLoader } from '../context/LoaderContext';

const Loader = () => {
  const { loading } = useLoader();

  return loading ? (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <img
          src="https://i.pinimg.com/originals/2a/c2/2c/2ac22c37e3b1b63259e830e1e00d9184.gif"
          alt="Loading..."
          className="w-20 h-20" // Adjust size as needed
        />
        <p className="text-white mt-4">Loading...</p>
      </div>
    </div>
  ) : null;
};

export default Loader;
