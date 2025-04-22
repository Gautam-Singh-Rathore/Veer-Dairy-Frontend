import React, { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { FaUserCircle } from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import { useNavigate } from "react-router";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  console.log(user);

  return (
    <div className="pt-[12vh] flex justify-center items-center min-h-screen px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-200 backdrop-blur-md bg-opacity-80">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-500 to-green-700 p-8 text-white text-center rounded-t-3xl relative">
          <FaUserCircle className="text-white text-7xl mx-auto mb-3 drop-shadow-lg" />
          <h2 className="text-2xl font-extrabold">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-sm opacity-90 tracking-wide">{user.role}</p>
        </div>

        {/* User Details Section */}
        <div className="p-6 space-y-5">
          <div className="flex items-center gap-3 p-4 bg-white/80 rounded-xl shadow-md">
            <MdEmail className="text-green-600 text-xl" />
            <p className="text-gray-800 text-base font-medium">{user.email}</p>
          </div>

          <div className="flex items-center gap-3 p-4 bg-white/80 rounded-xl shadow-md">
            <MdPhone className="text-green-600 text-xl" />
            <p className="text-gray-800 text-base font-medium">{user.phone}</p>
          </div>

          <div className="flex items-center gap-3 p-4 bg-white/80 rounded-xl shadow-md">
            <MdLocationOn className="text-green-600 text-xl" />
            <p className="text-gray-800 text-base font-medium">
              {user.address}
            </p>
          </div>

          {/* Admin Feature - Buttons */}
          {user.role === "ADMIN" && (
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition duration-300 transform hover:scale-105 w-full sm:w-auto"
                onClick={() => navigate("/add-product")}
              >
                + Add Product
              </button>

              <button
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition duration-300 transform hover:scale-105 w-full sm:w-auto"
                onClick={() => navigate("/admin/products")}
              >
                📦 My Products
              </button>

              <button
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition duration-300 transform hover:scale-105 w-full sm:w-auto"
                onClick={() => navigate("/admin/orders")}
              >
                My Orders
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
