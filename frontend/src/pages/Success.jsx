import { assets } from '@/assets/assets';
import React from 'react';

const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-10 max-w-2xl w-full text-center">
        <div className="flex justify-center mb-4">
          <img src={assets.notice} alt="Notice Icon" className="w-20 h-20"/>
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold text-green-600 mb-4">Thank You for Registering as a Dealer!</h1>
        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
          Thank you for choosing to join our platform as a valued dealer! We are thrilled to have you as part of our growing network dedicated to making recycling and sustainable waste management more accessible to everyone.
        </p>
        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
          Your registration has been successfully received, and our team is currently reviewing your details to ensure a smooth onboarding process. You’ll soon receive a confirmation email with the next steps once your account is fully set up and ready to go.
        </p>
        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
          As a registered dealer, you’ll have exclusive access to requests for scrap pickups, customer engagement tools, and the ability to make a direct impact on our environment. Together, we’re creating a more sustainable future, one transaction at a time.
        </p>
        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
          Should you have any questions or need further assistance, please don't hesitate to reach out to our support team. We’re here to help you succeed on this journey with us.
        </p>
        <p className="text-gray-700 text-sm md:text-base font-semibold mt-6">Warm regards</p>
      </div>
    </div>
  );
};

export default Success;
