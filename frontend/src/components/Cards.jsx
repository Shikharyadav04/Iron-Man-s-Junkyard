import { assets } from '@/assets/assets';
import React from 'react';

const Card = () => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <img
        className="w-full h-48 object-cover"
        src={assets.work} // Replace with your image URL
        alt="eWaste"
      />
      <div className="px-6 py-4 text-center">
        <div className="font-bold text-xl mb-2">eWaste</div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Buy
        </button>
      </div>
    </div>
  );
};

export default Card;
