import { assets } from '@/assets/assets';
import React from 'react';

const WasteDisposalSection = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between py-12 px-6 lg:px-16 bg-white">
      {/* Left Side - Image */}
      <div className="relative flex justify-center items-center lg:w-1/2 mb-8 lg:mb-0">
        <img
          src={assets.SERVICE}// Replace with the actual path to the image
          alt="Waste Disposal"
          className="w-80 lg:w-full object-cover"
        />
        {/* Emergency Contact Box */}
       
       
       
       
       
       
       
       
       
      </div>

      {/* Right Side - Content */}
      <div className="lg:w-1/2 lg:pl-10 text-gray-800">
        <h3 className="text-green-600 text-sm font-semibold">Why Choose Us</h3>
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2">
          Why choose our waste disposal services
        </h2>
        <p className="text-gray-600 mt-4 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur. Nam quis bibendum lacinia eu id in.
          Quisque porttitor tortor blandit nunc sed ac id. Mattis in nunc libero
          viverra. Consectetur leo nibh ac at amet.
        </p>

        {/* Features */}
        <div className="mt-6 space-y-4">
          <div className="flex items-start space-x-4">
            <span className="bg-green-100 text-green-600 p-2 rounded-full">
              <i className="fas fa-truck"></i>
            </span>
            <div>
              <h4 className="text-lg font-semibold text-gray-800">Residential waste pickup</h4>
              <p className="text-gray-600 text-sm">
                Amet minim mollit no duis deserunt lamo sit enim aliqua dolor do amet sint velit.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <span className="bg-green-100 text-green-600 p-2 rounded-full">
              <i className="fas fa-dumpster"></i>
            </span>
            <div>
              <h4 className="text-lg font-semibold text-gray-800">Roll-off dumpsters</h4>
              <p className="text-gray-600 text-sm">
                Amet minim mollit no duis deserunt lamo sit enim aliqua dolor do amet sint velit.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Button */}
        <button className="mt-8 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition">
          Contact Us
        </button>
      </div>
    </section>
  );
};

export default WasteDisposalSection;
