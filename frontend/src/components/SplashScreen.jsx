import { assets } from "@/assets/assets";
import React from "react";

const SplashScreen = ({ onVideoEnd }) => (
  <div className="flex items-center justify-center h-screen bg-black">
    <video
      src={assets.loader1}
      autoPlay
      muted
      onEnded={onVideoEnd}
      className="w-full h-full object-cover"
    />
  </div>
);

export default SplashScreen;
