import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BACKEND_URL } from "../utils/Constants";
import { UserContext } from "../context/UserProvider";
import { Trash2 } from "lucide-react";

const AdminProducts = () => {
  const [myProducts, setMyProducts] = useState([]);
  const { user } = useContext(UserContext);

  // Fetch products
  const getMyProducts = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/product/admin/${user.uid}`);
      setMyProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/product/${id}`);
      setMyProducts(myProducts.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    getMyProducts();
  }, []);

  return (
    <div className="w-full min-h-screen flex justify-center pt-[12vh] px-4 py-8">
      <div className="max-w-4xl w-full bg-white  rounded-lg p-6 lg:p-8">
        {/* Page Heading */}
        <h2 className="text-2xl font-bold text-[#00B86C] text-center mb-6">
          My Products
        </h2>

        {/* If no products */}
        {myProducts.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {myProducts.map((product) => (
              <div key={product.id} className="bg-gray-50 p-4 rounded-lg shadow-md flex flex-col">
                {/* Product Name & Category */}
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">Category: {product.category}</p>

                {/* Description */}
                <p className="text-gray-700 mb-4 line-clamp-2">{product.description}</p>

                {/* Price & Delete Button */}
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-xl font-bold text-green-600">₹{product.price}</span>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="bg-red-500 text-white px-3 py-2 rounded-lg flex items-center gap-1 hover:bg-red-600 transition"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
