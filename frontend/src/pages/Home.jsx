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
    {
      heading: 'Great Experience!',
      content: 'I had a wonderful time using this platform. Highly recommend!',
    },
    {
      heading: 'Amazing Features!',
      content: 'The features offered are fantastic and very user-friendly.',
    },
    {
      heading: 'Supportive Community!',
      content: 'The community here is very helpful and supportive.',
    },
    {
      heading: 'Easy to Navigate!',
      content: 'The interface is clean and easy to navigate.',
    },
    {
      heading: 'Great Experience!',
      content: 'I had a wonderful time using this platform. Highly recommend!',
    },
    {
      heading: 'Amazing Features!',
      content: 'The features offered are fantastic and very user-friendly.',
    },
    {
      heading: 'Supportive Community!',
      content: 'The community here is very helpful and supportive.',
    },
    {
      heading: 'Easy to Navigate!',
      content: 'The interface is clean and easy to navigate.',
    },
    {
      heading: 'Great Experience!',
      content: 'I had a wonderful time using this platform. Highly recommend!',
    },
    {
      heading: 'Amazing Features!',
      content: 'The features offered are fantastic and very user-friendly.',
    },
    {
      heading: 'Supportive Community!',
      content: 'The community here is very helpful and supportive.',
    },
    {
      heading: 'Easy to Navigate!',
      content: 'The interface is clean and easy to navigate.',
    },
    {
      heading: 'Great Experience!',
      content: 'I had a wonderful time using this platform. Highly recommend!',
    },
    {
      heading: 'Amazing Features!',
      content: 'The features offered are fantastic and very user-friendly.',
    },
    {
      heading: 'Supportive Community!',
      content: 'The community here is very helpful and supportive.',
    },
    {
      heading: 'Easy to Navigate!',
      content: 'The interface is clean and easy to navigate.',
    },
  ];

  return (
    <div className="bg-transparent overflow-hidden min-h-screen">
      <Header />
      <div>
        
        <div className='min-h-screen min-w-screen flex justify-evenly  items-center bg-transparent'>
      

          <div className='flex justify-evenly space-x-4 '>
            <div className='border border-gray-300 w-[60vh] h-[70vh]  shadow-lg rounded-md'>
              <img src={assets.dp1} className='w-[70vh] h-[70vh] object-fit rounded-md' />
            </div>
            <div className='border border-gray-300 w-[60vh] h-[70vh] shadow-lg rounded-md'>
              <img src={assets.dp2} className='w-[70vh] h-[70vh] object-fit rounded-md' />
            </div>
            <div className='border border-gray-300 w-[60vh] h-[70vh] shadow-lg rounded-md'>
              <img src={assets.dp3} className='w-[60vh] h-[70vh] object-fit rounded-md' />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mx-auto p-6 bg-transparent rounded-lg ">
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
        <div className="animate-slide-in bg-transparent flex gap-5 ">
          {feedbacks.map((feedback, index) => (
            <Feedbackcard key={index} heading={feedback.heading} content={feedback.content} />
          ))}
        </div>
        <BackgroundBeams />
      </div>
    </div>
  );
};

export default Home;
