import { assets } from '@/assets/assets';
import React from 'react';

const PricingCard = ({ title, price, description, features, bgColor, textColor, btnColor, imageSrc }) => (
  <div
    className={`w-90 h-[500px] p-8 rounded-lg shadow-lg ${bgColor} flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105`}
  >
    <img src={imageSrc} alt={`${title} plan`} className="w-25 h-20 mb-4" />
    <div className="text-4xl mb-4">{title}</div>
    <div className={`text-5xl font-bold mb-4 ${textColor}`}>${price}</div>
    <div className="mb-4">{description}</div>
    <ul className="mb-6 overflow-y-auto max-h-32 px-4">
      {features.map((feature, index) => (
        <li key={index} className="text-lg mb-2">{feature}</li>
      ))}
    </ul>
    <button className={`px-8 py-3 mt-auto rounded ${btnColor} text-white font-bold`}>Buy Now</button>
  </div>
);

const PricingPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen space-x-8 p-4">
      <PricingCard
        title="Monthly"
        price="100"
        description="Ideal for individuals or small households"
        features={[
          'Monthly Scrap Pickup',
          'Basic Recycling Options',
          'Customer Support (Email)',
        ]}
        bgColor="bg-green-700 text-white"
        textColor="text-white"
        btnColor="bg-green-800"
        imageSrc={assets.seedling} // Replace with the actual path or URL of the image
      />
      <PricingCard
        title="6 Months"
        price="200"
        description="Suitable for small businesses and communities"
        features={[
          'Weekly Scrap Pickup',
          'Recycling and Composting Options',
          'Customer Support (Phone & Email)',
        ]}
        bgColor="bg-green-500 text-gray-800"
        textColor="text-gray-800"
        btnColor="bg-green-600"
        imageSrc={assets.tree} // Replace with the actual path or URL of the image
      />
      <PricingCard
        title="Annually"
        price="500"
        description="Perfect for large organizations and municipalities"
        features={[
          'Daily Waste Pickup',
          'Dedicated Account Manager',
          '24/7 Support',
        ]}
        bgColor="bg-green-300 text-green-900"
        textColor="text-green-900"
        btnColor="bg-green-700"
        imageSrc={assets.forest} // Replace with the actual path or URL of the image
      />
    </div>
  );
};

export default PricingPage;
