import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineLocalPhone } from "react-icons/md";
import { IoLogoInstagram } from "react-icons/io5";
import { TiSocialFacebookCircular } from "react-icons/ti";
import { AiOutlineLinkedin } from "react-icons/ai";



const Footer = () => {
  return (
    <div className="w-full bg-[#F0F0F5] text-[#616673]">
      {/* Main Footer Section */}
      <div className="w-full flex flex-col md:flex-row justify-between px-10 md:px-52 py-10 gap-6 md:gap-0">
        {/* Address Section */}
        {/* <div className="space-y-2">
          <p className="text-black font-semibold text-lg">Address</p>
          <p className="text-sm">
            414, Near Divine Hotel, Adarsh Nagar, Jaipur 302004
          </p>
        </div> */}

        {/* Contact Us Section */}
        <div className="space-y-2">
          <p className="text-black font-semibold text-lg">Contact Us</p>
          <div className="flex items-center space-x-2">
            <MdOutlineEmail className="text-xl" />
            <p className="text-sm">veerdairyofficial@gmail.com</p>
          </div>
          {/* <div className="flex items-center space-x-2">
            <MdOutlineLocalPhone className="text-xl" />
            <p className="text-sm">+91 8174868174</p>
          </div> */}
        </div>

        {/* Follow Us Section */}
        <div className="space-y-2">
          <p className="text-black font-semibold text-lg">Follow Us</p>
          <div className="flex gap-3">
            <a
              href="https://www.instagram.com/veer.dairy?igsh=MTdsaHkyNm83bXFkeQ=="
              className="text-[#616673] hover:text-black text-2xl transition"
              aria-label="Instagram"
            >
              <IoLogoInstagram />
            </a>
            {/* <a
              href="https://www.facebook.com/profile.php?id=61562755782725"
              className="text-[#616673] hover:text-black text-2xl transition"
              aria-label="Facebook"
            >
              <TiSocialFacebookCircular />
            </a> */}
            <a
              href="https://www.linkedin.com/company/veer-dairy/"
              className="text-[#616673] hover:text-black text-2xl transition"
              aria-label="LinkedIn"
            >
              <AiOutlineLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="bg-[#E6E6EB] py-4 text-center">
        <p className="text-sm">
          &copy; 2025 Veer Dairy. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
