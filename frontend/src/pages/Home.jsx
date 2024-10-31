import React from 'react';
import Header from '../components/Header';
import ShareButtons from '@/components/ShareButton';
import BackgroundBeams from '@/components/BackgroundBeams';

const Home = () => {
  const url = 'http://localhost:5173/'; // Replace with your actual URL
  const title = 'Check out this amazing platform!'; // Optional title

  return (
    <div className="bg-transparent min-h-screen">
      <Header />
      <div className="max-w-3xl mx-auto p-6 bg-transparent rounded-lg shadow-md mt-10">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Welcome to My Website</h1>
        <p className="text-gray-600 text-lg text-center mb-6">
          This is a great platform to do amazing things. Discover features, connect with friends, and more!
        </p>

        <h2 className="text-2xl font-semibold text-center text-gray-700 mt-8 mb-4">Share this with your friends!</h2>
        
        <div className="flex justify-center">
          <ShareButtons url={url} title={title} />
        </div>
        
        
        
      </div>
    </div>
  );
}

export default Home;
