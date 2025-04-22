import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils/Constants";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "CUSTOMER",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/user/signup` , formData);
      if (response.status==201) {
        toast.success('User Registered')
        navigate("/login")
      } else {
        toast.error("User Not Registered..")
      }
    } catch (error) {
      toast.error("User Not Registered..")
      console.error("Registration failed:", error);
    }
    
  };

  return (
    <div className="pt-[12vh] flex justify-center items-center min-h-screen bg-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96 border border-gray-200"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[#00B86C]">
          Sign Up
        </h2>

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00B86C]"
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00B86C]"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00B86C]"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00B86C]"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00B86C]"
        />

        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00B86C]"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-[#00B86C] text-white p-3 rounded-md hover:bg-[#009e5c] transition duration-300"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Signup;
