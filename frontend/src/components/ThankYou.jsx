import { assets } from "@/assets/assets";
import React from "react";

const ThankYou = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-10 max-w-2xl w-full text-center">
        <div className="flex justify-center mb-4">
          <img src={assets.notice} alt="Notice Icon" className="w-20 h-20" />
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold text-green-600 mb-4">
          Thank You for Becoming a Premium Member!
        </h1>
        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
          Congratulations on becoming a premium member! We are excited to have
          you on board and are committed to offering you the best possible
          experience on our platform.
        </p>
        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
          Your premium membership unlocks a wide range of exclusive benefits and
          features designed to enhance your experience and provide you with
          added value. Get ready to explore everything that comes with your new
          premium status.
        </p>
        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
          From priority access to new features, to personalized customer
          support, your membership ensures you are always one step ahead. We
          can’t wait for you to make the most of all the perks available to you.
        </p>
        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
          We appreciate your trust in us and are thrilled to have you as part of
          our growing premium community. Rest assured, we are continuously
          working to improve and add new features to make your experience even
          better.
        </p>
        <p className="text-gray-700 text-sm md:text-base font-semibold mt-6">
          If you have any questions or need assistance, our support team is
          always here to help!
        </p>
      </div>
    </div>
  );
};

export default ThankYou;
