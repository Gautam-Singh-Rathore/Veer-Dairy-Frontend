import React from "react";
import about1 from "../../public/assets/about1.jpg";
import about4 from "../../public/assets/about4.jpg";
import { useNavigate } from "react-router";

const OurMission = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full lg:px-[20vw] mx-auto py-12 px-6  bg-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-xl md:text-3xl font-bold text-[#00B86C] mb-6">
          Our Mission & Vision
        </h2>
        <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto">
          Empowering farmers and local businesses by delivering fresh and
          high-quality dairy products directly to consumers with trust and care.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center mx-auto">
        <div>
          <img src={about1} alt="" className="rounded-lg" />
        </div>
        <div>
          <img src={about4} alt="" className="rounded-lg" />
        </div>
      </div>
      <div className=" w-full flex justify-center items-center py-4">
        <button className="bg-[#00B86C] text-white text-lg px-6 py-2 rounded-full" onClick={()=>{navigate("/about")}}>
          Learn More
        </button>
      </div>
    </div>
  );
};

export default OurMission;
