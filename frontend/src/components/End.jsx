import { assets } from "@/assets/assets";
import React from "react";

const End = () => {
  return (
    <footer className="bg-gray-800 text-white py-5 px-5">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-10">
        {/* Logo and Description */}
        <div className="space-y-3">
          <div className="flex items-center">
            <h1 className="text-white text-center font-bold">SCRAPMAN</h1>
            
          </div>
          <p className="text-sm leading-relaxed">
            Lorem ipsum dolor sit amet consectetur diam ultricies leo etiam nibh
            tristique.
          </p>
          <p className="text-sm leading-relaxed mt-2">
            Odio feugiat vitae libero vestibulum viverra elementum luctus.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Links</h3>
          <ul className="space-y-2">
            <li>About Us</li>
            <li>Services</li>
            <li>Case</li>
            <li>Request Pickup</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* Working Hours */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Working Hours</h3>
          <p className="text-sm leading-relaxed">
            Tincidunt neque pretium lectus donec risus.
          </p>
          <p className="text-sm leading-relaxed mt-2">
            Mon - Fri: 9:00AM - 6:00PM
          </p>
          <p className="text-sm leading-relaxed">Sat - Sun: 8:00AM - 4:00PM</p>
        </div>

        {/* Get In Touch */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Get In Touch</h3>
          <p className="text-sm leading-relaxed">
            <span role="img" aria-label="Location">📍</span> Add: New Hyde Park, NY 11040
          </p>
          <p className="text-sm leading-relaxed mt-2">
            <span role="img" aria-label="Email">📧</span> Email: example@info.com
          </p>
          <p className="text-sm leading-relaxed">
            <span role="img" aria-label="Phone">📞</span> Phone: 333 666 0000
          </p>
          <div className="flex space-x-5 mt-4">
            <span className="bg-gray-700 p-2 rounded-lg">
              {/* Social Icons (use Font Awesome or similar icons) */}
              <i className="fab fa-facebook-f"></i>
            </span>
            <span className="bg-gray-700 p-2 rounded-lg">
              <i className="fab fa-twitter"></i>
            </span>
            <span className="bg-gray-700 p-2 rounded-lg">
              <i className="fab fa-instagram"></i>
            </span>
            <span className="bg-gray-700 p-2 rounded-lg">
              <i className="fab fa-linkedin-in"></i>
            </span>
          </div>
        </div>
      </div>
      <div className="text-center text-sm mt-10">
        <p>Copyright 2023 by wastix template All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default End;
