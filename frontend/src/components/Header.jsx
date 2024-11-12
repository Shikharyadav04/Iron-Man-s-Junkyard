import React from 'react';
import ReactTypingEffect from 'react-typing-effect';
import { assets } from '../assets/assets'; // Ensure this path is correct for your assets
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router

function Header() {
  const navigate = useNavigate(); // React Router's navigation hook

  return (
    <div>
      {/* Header Section */}
      <section className="relative w-full h-[100vh]">
        {/* Background Image */}
        <img 
          src={assets.hero} // Replace with your image URL
          alt="Background"
          className="w-full h-full object-cover"
        />
      </section>

      {/* About Us Section */}
      <div className="about-us-section absolute top-14 left-10 flex justify-between items-center py-40 bg-transparent">
        <div className="text-section w-1/2">
          <p className="text-green-600 font-semibold">About Us</p>
          <h1 className="text-4xl font-bold mb-4">
            <ReactTypingEffect
              text={[
                "Experience in waste disposal management services",
              ]}
              speed={50}
              eraseSpeed={25}
              typingDelay={100}
            />
          </h1>
          <p className="text-gray-600 mb-4 font-playfair h-20">
            Lorem ipsum dolor sit amet consectetur. Nam quis bibendum lacinia eu id in.
            Quisque porttitor tortor blandit nunc sed ac id. Mattis in nunc libero viverra.
            Consectetur leo nibh ac at amet.
          </p>
          <ul className="list-none text-gray-800 mb-4">
            <li>✔ Giant Fishes Farming</li>
            <li>✔ Water & Plants Filtration Systems</li>
            <li>✔ Seafood Import Export</li>
          </ul>
          <button
            onClick={() => navigate('/contact')} // Redirect to /contact
            className="bg-green-600 text-white px-6 py-2 rounded-lg transition-transform transform hover:scale-105 hover:bg-green-700"
          >
            Contact Us
          </button>
        </div>
        <div className="image-section w-1/2 flex justify-center items-center relative">
          {/* Add your images here */}
        </div>
      </div>
    </div>
  );
}

export default Header;
