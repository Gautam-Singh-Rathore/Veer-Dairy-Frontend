import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils/Constants";
import c1 from "../../public/assets/categories/c1.jpg";
import c2 from "../../public/assets/categories/c2.jpg";
import c3 from "../../public/assets/categories/c3.jpg";
import { useNavigate } from "react-router";

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const getCategories = async () => {
    try {
      const response = await axios.get(BACKEND_URL + "/category/all");
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

  const getCategoryImage = (id) => {
    const images = { 1: c1, 2: c2, 3: c3 };
    return images[id] || c1;
  };

  return (
    <div className="w-full lg:w-[80vw] lg:ml-[10vw] px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-[#00B86C]">
        Categories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="w-[85%] sm:w-[90%] md:w-full bg-white rounded-3xl overflow-hidden text-center cursor-pointer shadow-md hover:shadow-xl hover:scale-[1.03] transition-transform duration-300"
            onClick={() => navigate(`/products/${cat.name}`)}
          >
            <div className="overflow-hidden rounded-t-3xl">
              <img
                src={getCategoryImage(cat.id)}
                alt={cat.name}
                className="w-full h-40 object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <h3 className="py-4 text-lg md:text-xl font-semibold text-gray-800">
              {cat.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
