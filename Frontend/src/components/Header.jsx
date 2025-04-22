import React, { useContext, useState } from "react";
import logo from "../../public/assets/dairy-logo.jpg";
import toast from "react-hot-toast";
import { IoMdCart } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosClose } from "react-icons/io"; // Close icon
import { UserContext } from "../context/UserProvider";
import { CartContext } from "../context/CartProvider";

const Header = () => {
  const {setCart} = useContext(CartContext)
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false); // State to toggle menu visibility

  // Toggle the visibility of the mobile menu
  const toggleMenu = () => setIsVisible(!isVisible);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    setCart([]);
    setIsLoggedIn(false);
    navigate("/");
    toast.success("User Logged Out");
  };

  return (
      <div className="bg-transparent w-full lg:w-[80vw] lg:ml-[10vw] h-[12vh] px-10 py-4 flex justify-between items-center absolute bg-white round">
        {/* Logo */}
        <div className="h-full cursor-pointer hover:scale-105 ">
          <div
            className="h-full rounded-full cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={logo} className="h-full rounded-full" alt="Logo" />
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="h-full bg-white px-16  hidden md:flex">
          <ul className="flex gap-10 items-center justify-center h-full text-[16px] font-semibold text-gray-700">
            <li
              className="cursor-pointer hover:scale-105 hover:text-[#00B86C]"
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className="cursor-pointer hover:scale-105 hover:text-[#00B86C]"
              onClick={() => navigate("/products")}
            >
              Products
            </li>
            <li
              className="cursor-pointer hover:scale-105 hover:text-[#00B86C]"
              onClick={() => {isLoggedIn?navigate("/orders"):navigate("/login")}}
            >
              Orders
            </li>
            <li
              className="cursor-pointer hover:scale-105 hover:text-[#00B86C]"
              onClick={() => navigate("/about")}
            >
              About Us
            </li>
            {/* <li
              className="cursor-pointer hover:scale-105 hover:text-[#00B86C]"
              onClick={() => navigate("/")}
            >
              About Us
            </li>
            <li
              className="cursor-pointer hover:scale-105 hover:text-[#00B86C]"
              onClick={() => navigate("/")}
            >
              Contact Us
            </li> */}
          </ul>
        </div>

        {/* Desktop Buttons */}
        <div className="h-full gap-10 text-[16px] font-semibold hidden md:flex md:items-center">
          {isLoggedIn ? (
            <div
              className="bg-[#00B86C] text-white px-3 py-1 rounded-lg flex justify-center items-center gap-5 cursor-pointer hover:scale-105  my-1"
              onClick={() => handleLogout()}
            >
              <li className="list-none">Logout</li>
            </div>
          ) : (
            <div
              className="bg-[#00B86C] text-white px-3 py-1  rounded-lg flex justify-center items-center gap-5 cursor-pointer hover:scale-105  my-1"
              onClick={() => navigate("/login")}
            >
              <li className="list-none">Log in</li>
            </div>
          )}

          {!isLoggedIn ? (
            <div
              className="bg-[#00B86C] text-white px-3 py-1 rounded-lg flex justify-center items-center gap-5 cursor-pointer hover:scale-105  my-1"
              onClick={() => navigate("/register")}
            >
              <li className="list-none">Sign up</li>
            </div>
          ):(
            <div className="">
              <FaUserCircle 
              size={35}
              className="text-[#00B86C] cursor-pointer hover:scale-105"
              onClick={() => navigate("/profile")}
              />
            </div>
          )
          }

          <IoMdCart
            size={35}
            className="text-[#00B86C] cursor-pointer hover:scale-105"
            onClick={() => navigate("/cart")}
          />
        </div>

        {/* Hamburger Icon (Mobile) */}
        <div
          className="h-full cursor-pointer md:hidden flex justify-center items-center text-[#00B86C]  w-[50px]"
          onClick={toggleMenu} // Toggle the mobile menu
        >
          <GiHamburgerMenu size={20} />
        </div>

        {/* Mobile Menu */}
        {isVisible && (
          <div className="fixed top-0 right-0 w-full bg-white  z-10 shadow-lg pb-5 rounded-bl-[150px]">
            {/* Close Button */}
            <div
              className="flex justify-end p-4 cursor-pointer"
              onClick={toggleMenu}
            >
              <IoIosClose size={30} className="text-[#00B86C]" />
            </div>

            {/* Menu Items */}
            <ul className="flex flex-col items-center py-4">
              <li
                className="cursor-pointer py-2 hover:scale-105 hover:text-[#00B86C]"
                onClick={() => {
                  navigate("/");
                  setIsVisible(false); // Close the menu after navigation
                }}
              >
                Home
              </li>
              <li
                className="cursor-pointer py-2 hover:scale-105 hover:text-[#00B86C]"
                onClick={() => {
                  navigate("/products");
                  setIsVisible(false);
                }}
              >
                Products
              </li>
              <li
                className="cursor-pointer py-2 hover:scale-105 hover:text-[#00B86C]"
                onClick={() => {
                  navigate("/cart");
                  setIsVisible(false);
                }}
              >
                Cart
              </li>
              <li
                className="cursor-pointer py-2 hover:scale-105 hover:text-[#00B86C]"
                onClick={() => {
                  isLoggedIn?navigate("/orders"):navigate("/login")
                  setIsVisible(false);
                }}
              >
                Order
              </li>
              <li
                className="cursor-pointer py-2 hover:scale-105 hover:text-[#00B86C]"
                onClick={() => {
                  navigate("/about");
                  setIsVisible(false);
                }}
              >
                About Us
              </li>
              {/* <li
                className="cursor-pointer py-2 hover:scale-105 hover:text-[#00B86C]"
                onClick={() => {
                  navigate("/");
                  setIsVisible(false);
                }}
              >
                About Us
              </li>
              <li
                className="cursor-pointer py-2 hover:scale-105 hover:text-[#00B86C]"
                onClick={() => {
                  navigate("/");
                  setIsVisible(false);
                }}
              >
                Contact Us
              </li> */}
            </ul>

            {/* Buttons for mobile */}
            <div className="flex flex-col items-center gap-4 py-4">
              {isLoggedIn ? (
                <div
                  className="bg-white px-7 rounded-full flex justify-center items-center gap-5 cursor-pointer hover:scale-105 hover:text-[#00B86C]"
                  onClick={() => {
                    handleLogout();
                    setIsVisible(false);
                    navigate("/");
                  }}
                >
                  <li className="list-none">Logout</li>
                </div>
              ) : (
                <div
                  className="bg-white px-7 rounded-full flex justify-center items-center gap-5 cursor-pointer hover:scale-105 hover:text-[#00B86C]"
                  onClick={() => {
                    navigate("/login");
                    setIsVisible(false);
                  }}
                >
                  <li className="list-none">Log in</li>
                </div>
              )}

              {!isLoggedIn ? (
                <div
                  className="bg-white px-6 rounded-full flex justify-center items-center gap-5 cursor-pointer hover:scale-105 hover:text-[#00B86C]"
                  onClick={() => {
                    setIsVisible(false);
                    navigate("/");
                  }}
                >
                  <li className="list-none">Sign up</li>
                </div>
              ) : (
                <div
                  className="bg-white px-6 rounded-full flex justify-center items-center gap-5 cursor-pointer hover:scale-105 hover:text-[#00B86C]"
                  onClick={() => {
                    setIsVisible(false);
                    navigate("/profile");
                  }}
                >
                  <li className="list-none">Profile</li>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    
  );
};

export default Header;
