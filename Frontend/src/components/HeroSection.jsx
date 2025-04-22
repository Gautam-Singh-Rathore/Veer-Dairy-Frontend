import React from 'react';
import banner from "../../public/assets/banner.jpg";
import mobile from "../../public/assets/mobile-banner.jpg";

const HeroSection = () => {
  return (
    <div className="w-full px-4 lg:w-[80vw] mx-auto flex justify-center items-center">
      {/* Desktop banner (visible on md and up) */}
      <img
        src={banner}
        alt="Banner"
        className="hidden md:block w-full h-auto rounded-2xl object-cover"
      />

      {/* Mobile banner (visible below md) */}
      <img
        src={mobile}
        alt="Mobile Banner"
        className="block md:hidden w-full h-[85vh] rounded-2xl object-cover"
      />
    </div>
  );
};

export default HeroSection;
