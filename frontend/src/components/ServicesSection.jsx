import React from 'react';
import { assets } from '@/assets/assets';



const services = [
  {
    title: 'Garbage Pickup',
    description: 'Lorem ipsum dolor sit amet consectetur. Dolor nunc tincidunt tempor dignissim faucibus molestie.',
    imageSrc:assets.e1
  },
  {
    title: 'Dumpster Rental',
    description: 'Lorem ipsum dolor sit amet consectetur. Dolor nunc tincidunt tempor dignissim faucibus molestie.',
    imageSrc:assets.e2
  },
  {
    title: 'Waste Collection',
    description: 'Lorem ipsum dolor sit amet consectetur. Dolor nunc tincidunt tempor dignissim faucibus molestie.',
    imageSrc:assets.e3
  },
];

const ServiceCard = ({ title, description, imageSrc }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-xs">
    {/* Top Icon */}
    
    
    
    
    

    {/* Image */}
    <div className="h-40 overflow-hidden rounded-t-lg ">
      <img src={imageSrc} alt={title} className="object-cover w-full h-full" />
    </div>

    {/* Text Container */}
    <div className="p-6 text-center">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>

    {/* Button */}
    <div className="flex justify-center pb-4">
      <button className="bg-white border rounded-full p-2 shadow-md hover:bg-gray-100 transition">
        <span className="text-xl">➔</span>
      </button>
    </div>
  </div>
);

const ServicesSection = () => (
  <section className="py-12 bg-transparent">
    <div className="text-center mb-8">
      <p className="text-green-600 font-medium">Service Industry</p>
      <h2 className="text-3xl font-bold text-gray-800">
        A wide range of waste disposal services
      </h2>
    </div>
    <div className="flex flex-col md:flex-row gap-8 justify-center hover:zoom-in-50">
      {services.map((service, index) => (
        <ServiceCard
          key={index}
          title={service.title}
          description={service.description}
          imageSrc={service.imageSrc}
        />
      ))}
    </div>
  </section>
);

export default ServicesSection;
