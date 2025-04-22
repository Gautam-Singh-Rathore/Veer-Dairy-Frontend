import React, { useState, useEffect, useContext } from "react";
import {
  FaTag,
  FaClipboardList,
  FaDollarSign,
  FaListAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router";
import { BACKEND_URL } from "../utils/Constants";
import axios from "axios";
import { UserContext } from "../context/UserProvider";
import toast from "react-hot-toast";

const AddProductForm = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    url:"",
    price: "",
    categoryId: null,
    adminId: user.uid,
  });

  const getCategories = async () => {
    try {
      const response = await axios.get(BACKEND_URL + "/category/all");
      console.log("API Response:", response);

      if (response.status === 200) {
        setCategories(response.data);
      } else {
        console.log("Data not found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Convert categoryId to number
    setProduct({
        ...product,
        [name]: name === "categoryId" ? Number(value) : 
                name === "price" ? parseFloat(value) : value,
      });
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!product.name || !product.description || !product.price || !product.categoryId) {
      toast.error("All fields are required ..")
      return;
    }
    try{
        const response = await axios.post(`${BACKEND_URL}/product/add` , product);
        if(response.status==201){
            toast.success("Product added")
            navigate("/profile");
        }else{
            toast.error("Product not added");
        }
    }catch(error){
        console.log(error)
        toast.error("Error adding product")
    }


    console.log(product);
  };

  return (
    <div className="pt-[12vh] flex justify-center items-center min-h-screen px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-200 backdrop-blur-md bg-opacity-80 p-6">
        {/* Header */}
        <h2 className="text-2xl font-extrabold text-[#00B86C] text-center mb-5">
          Add New Product
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
          <div className="flex items-center gap-3 bg-white/80 p-3 rounded-lg shadow-md">
            <FaTag className="text-[#00B86C] text-xl" />
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={product.name}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500"
              required
            />
          </div>

          {/* Description (Text Area) */}
          <div className="flex gap-3 bg-white/80 p-3 rounded-lg shadow-md">
            <FaClipboardList className="text-[#00B86C] text-xl mt-2" />
            <textarea
              name="description"
              placeholder="Description"
              value={product.description}
              onChange={handleChange}
              rows="3"
              className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500 resize-none"
              required
            ></textarea>
          </div>
          {/* Image url  */}
          <div className="flex items-center gap-3 bg-white/80 p-3 rounded-lg shadow-md">
            <FaTag className="text-[#00B86C] text-xl" />
            <input
              type="text"
              name="url"
              placeholder="Image Url"
              value={product.url}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500"
              required
            />
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 bg-white/80 p-3 rounded-lg shadow-md">
            <FaDollarSign className="text-[#00B86C] text-xl" />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={product.price}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500"
              required
            />
          </div>

          {/* Category Select */}
          <div className="flex items-center gap-3 bg-white/80 p-3 rounded-lg shadow-md">
            <FaListAlt className="text-[#00B86C] text-xl" />
            <select
              name="categoryId"
              value={product.categoryId}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500"
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit & Back Buttons */}
          <div className="flex justify-between mt-5">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-5 rounded-lg transition duration-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
