import React from 'react';
import Header from '../components/Header';
import ShareButtons from '@/components/ShareButton';
import Feedbackcard from '../components/Feedbackcard';
import BackgroundBeams from '@/components/BackgroundBeams';
import { assets } from '@/assets/assets';

const Home = () => {
  const url = 'http://localhost:5173/'; // Replace with your actual URL
  const title = 'Check out this amazing platform!'; // Optional title

  // Example dynamic content for feedback cards
  const feedbacks = [
    { heading: 'Great Experience!', content: 'I had a wonderful time using this platform. Highly recommend!' },
    { heading: 'Amazing Features!', content: 'The features offered are fantastic and very user-friendly.' },
    { heading: 'Supportive Community!', content: 'The community here is very helpful and supportive.' },
    { heading: 'Easy to Navigate!', content: 'The interface is clean and easy to navigate.' },
    // Add more feedback items as needed
  ];

  return (
    <div className="bg-transparent overflow-hidden min-h-screen">
      <Header />
      
      <div className="min-h-screen min-w-screen flex justify-center items-center bg-transparent">
        <div className="flex space-x-4 w-4/5">
          {/* DP1 - FOR RESIDENTIAL */}
          <div className="relative border border-gray-300 shadow-lg rounded-md overflow-hidden w-1/2">
            <img src={assets.dp1} className="w-full h-[80vh] object-cover rounded-md" />
            {/* Overlay Text */}
            <div className="absolute inset-0 bg-black bg-opacity-5 backdrop-blur-[1px] flex flex-col items-center justify-center space-y-2">
              <h2 className="text-white text-3xl font-bold uppercase">For Residential</h2>
              <a href="/about">
                <button className="bg-red-600 text-white px-3 py-1 rounded-md shadow-lg text-lg hover:bg-red-700 transition">
                  Read More
                </button>
              </a>
            </div>
          </div>
          
          {/* DP2 - FOR INDUSTRIAL */}
          <div className="relative border border-gray-300 shadow-lg rounded-md overflow-hidden w-1/2">
            <img src={assets.dp2} className="w-full h-[80vh] object-cover rounded-md" />
            {/* Overlay Text */}
            <div className="absolute inset-0 bg-black bg-opacity-5 backdrop-blur-[1px] flex flex-col items-center justify-center space-y-2">
              <h2 className="text-white text-3xl font-bold uppercase">For Industrial</h2>
              <a href="/about">
                <button className="bg-red-600 text-white px-3 py-1 rounded-md shadow-lg text-lg hover:bg-red-700 transition">
                  Read More
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Charity Events Section */}
      <div className="w-full">
        <h1 className="text-6xl text-center text-white mb-4 font-bold">
          EVENTS
        </h1>
        
        {/* Full-width images stacked without spacing */}
        <div>
          <img src={assets.event3} className="w-full h-60vh object-fit" alt="Charity Event 1" />
          <img src={assets.event2} className="w-full h-60vh object-fit" alt="Charity Event 2" />
          <img src={assets.event1} className="w-full h-60vh object-fit" alt="Charity Event 3" />
        </div>
      </div>

      <div className="w-full mx-auto p-6 bg-transparent rounded-lg">
        <h1 className="text-3xl text-center text-gray-800 mb-4 font-playfair font-custom-weight">
          Welcome to My Website
        </h1>
        <p className="text-gray-600 text-lg text-center mb-6 font-playfair font-custom-weight">
          This is a great platform to do amazing things. Discover features, connect with friends, and more!
        </p>

        <h2 className="text-2xl font-semibold text-center text-gray-700 mt-8 mb-4">Share this with your friends!</h2>
        
        <div className="flex justify-center">
          <ShareButtons url={url} title={title} />
        </div>
        
        {/* Apply the Tailwind animation class here */}
        <div className="animate-slide-in bg-transparent flex gap-5">
          {feedbacks.map((feedback, index) => (
            <Feedbackcard key={index} heading={feedback.heading} content={feedback.content} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
