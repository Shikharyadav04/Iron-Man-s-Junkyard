import { assets } from '@/assets/assets';
import Card from '@/components/Cards';
import React from 'react';

const Buy = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <div>
        <h1 className="text-center text-2xl">E-waste</h1>
        <div className="flex justify-evenly">
          <Card imageUrl={assets.ewaste} title="eWaste Project" buttonText="Buy Now" />
          <Card imageUrl={assets.ewaste1} title="eWaste Project" buttonText="Buy Now" />
          <Card imageUrl={assets.ewaste2} title="eWaste Project" buttonText="Buy Now" />
          <Card imageUrl={assets.ewaste3} title="eWaste Project" buttonText="Buy Now" />
        </div>
      </div>

      <div>
        <h1 className="text-center text-2xl">E-waste</h1>
        <div className="flex justify-evenly">
          <Card imageUrl={assets.work} title="eWaste Project" buttonText="Buy Now" />
          <Card imageUrl={assets.work} title="eWaste Project" buttonText="Buy Now" />
          <Card imageUrl={assets.work} title="eWaste Project" buttonText="Buy Now" />
          <Card imageUrl={assets.work} title="eWaste Project" buttonText="Buy Now" />
        </div>
      </div>

      <div>
        <h1 className="text-center text-2xl">E-waste</h1>
        <div className="flex justify-evenly">
          <Card imageUrl={assets.work} title="eWaste Project" buttonText="Buy Now" />
          <Card imageUrl={assets.work} title="eWaste Project" buttonText="Buy Now" />
          <Card imageUrl={assets.work} title="eWaste Project" buttonText="Buy Now" />
          <Card imageUrl={assets.work} title="eWaste Project" buttonText="Buy Now" />
        </div>
      </div>

      <div>
        <h1 className="text-center text-2xl">E-waste</h1>
        <div className="flex justify-evenly">
          <Card imageUrl={assets.work} title="eWaste Project" buttonText="Buy Now" />
          <Card imageUrl={assets.work} title="eWaste Project" buttonText="Buy Now" />
          <Card imageUrl={assets.work} title="eWaste Project" buttonText="Buy Now" />
          <Card imageUrl={assets.work} title="eWaste Project" buttonText="Buy Now" />
        </div>
      </div>

      <br />
      
      
      
      <br />
      <hr className="bg-black" />
    </div>
  );
};

export default Buy;
