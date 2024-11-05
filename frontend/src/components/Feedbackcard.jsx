import React from 'react';

const Feedbackcard = ({ heading, content }) => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-[#F7ECE8] rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4 font-playfair ">
        {heading}
      </h1>
      <p className="text-gray-600 text-lg text-center mb-6 font-playfair font-custom-weight">
        {content}
      </p>
    </div>
  );
};

export default Feedbackcard;
