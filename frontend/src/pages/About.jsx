import React from 'react';

import { video } from '@/videos/video';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-transparent p-6">
      <h1 className="text-4xl font-bold mb-4">About Us</h1>
      <p className="text-lg text-gray-700 mb-6">
        Sustainable development and scrap management share a common goal: minimizing waste and promoting resource efficiency. Sustainable development focuses on meeting the needs of the present without compromising the ability of future generations to meet their own needs. It encompasses environmental protection, social equity, and economic growth, striving for a balanced approach to resource utilization.
      </p>
      <p className="text-lg text-gray-700 mb-6">
        Scrap management companies play a vital role in this framework by facilitating the recycling and repurposing of materials that would otherwise end up in landfills. By efficiently collecting, sorting, and processing scrap, these companies contribute to reducing the overall demand for new raw materials, thus conserving natural resources and minimizing energy consumption. They promote circular economy principles, where materials are kept in use for as long as possible, creating a closed-loop system that benefits both the environment and the economy.
      </p>
      <p className="text-lg text-gray-700 mb-6">
        Additionally, scrap management companies often engage in community initiatives, raising awareness about recycling and responsible waste disposal. Their operations not only help in managing waste but also generate employment opportunities, fostering economic growth while aligning with sustainable development goals. Ultimately, both sustainable development and scrap management aim to create a more resilient and eco-friendly society, where resources are used wisely, and environmental impact is minimized.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Watch Our Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
        <video className="w-full h-auto rounded-lg" controls muted loop>
          <source src={video.video2} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video className="w-full h-auto rounded-lg" controls muted loop>
          <source src={video.video1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video className="w-full h-auto rounded-lg" controls muted loop>
          <source src={video.video3} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default About;
