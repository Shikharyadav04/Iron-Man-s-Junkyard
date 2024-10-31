import React from "react";
import { BackgroundBeams } from "../components/BackgroundBeams";

export function Contact() {
  return (
    <div className="h-[40rem] w-full  bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
          Join the waitlist
        </h1>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
            Welcome to ScrapMan, the leading platform for efficient scrap management and recycling 
            solutions. We empower businesses and individuals to manage their scrap materials 
            effectively, providing seamless services that are both reliable and environmentally 
            friendly. Whether you're looking to schedule scrap pickups, track transactions, or 
            contribute to a circular economy, ScrapMan has you covered. Join us in making recycling 
            easier and more accessible for everyone!          
                    
        </p>
        <input
          type="email"
          placeholder=""
          className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full relative z-10 mt-4 bg-neutral-950 placeholder:text-neutral-700"
        />
        <button className="mt-4 align  bg-teal-500 text-white rounded-lg px-4 py-2 hover:bg-teal-600 transition-colors">
          Subscribe
        </button>
      </div>
      <BackgroundBeams />
    </div>
  );
}

export default Contact;
