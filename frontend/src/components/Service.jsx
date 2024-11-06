import React from 'react';

const Service = () => {
  const services = [
    {
      icon: 'fas fa-dumpster',
      title: 'Dumpster Sizes',
      description: 'Lorem ipsum dolor sit amet consectetur elit.',
    },
    {
      icon: 'fas fa-recycle',
      title: 'Waste Collection',
      description: 'Lorem ipsum dolor sit amet consectetur elit.',
    },
    {
      icon: 'fas fa-calendar-check',
      title: 'Pickup Schedule',
      description: 'Lorem ipsum dolor sit amet consectetur elit.',
    },
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-green-100 to-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 lg:px-0">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300"
          >
            <div className="text-green-500 text-4xl mb-4">
              <i className={service.icon}></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
            <p className="text-gray-500">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Service;
