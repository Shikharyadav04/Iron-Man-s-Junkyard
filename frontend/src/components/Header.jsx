
import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
  return (
    <section className="relative w-full h-[500px]">
      {/* Background Image */}
      <img 
        src={assets.hero} // Replace with your image URL
        alt="Background"
        className="w-full h-full object-cover"
      />
      
      {/* Text Overlay */}
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-40 text-white text-center">
        <h1 className="text-4xl font-bold mb-2 bg-transparent">Lorem ipsum dolor sit</h1>
        <p className="text-lg max-w-3xl bg-transparent">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, quasi tenetur deserunt repellendus ex amet nulla rem maxime sint officiis.
        </p>
      </div>
    </section>
  );
}

export default Header;
