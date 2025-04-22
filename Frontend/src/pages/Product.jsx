import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { ImWhatsapp } from "react-icons/im";
import { useNavigate, useParams } from "react-router";
import { BACKEND_URL } from "../utils/Constants";
import { CartContext } from "../context/CartProvider";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import toast from "react-hot-toast";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const findProductDetails = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/product/${id}`);
      if (response.status === 200) {
        setProduct(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    findProductDetails();
  }, []);

  if (!product) {
    return <div className="text-center pt-[12vh] text-xl font-semibold">Loading...</div>;
  }

  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleShare = async () => {
    try {
      if (navigator.share) {
        // Using the Web Share API for supported browsers
        await navigator.share({
          title: product.name,
          text: `Check out this amazing product: ${product.name}`,
          url: window.location.href,
        });
      } else {
        // Fallback for unsupported browsers (Share URL via email or link)
        toast.error("Share feature is not supported on this browser.");
      }
    } catch (error) {
      toast.error("Failed to share product. Please try again.");
    }
  };

  return (
    <div className="pt-[12vh] min-h-screen">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 px-6 py-10">
        {/* Product Image */}
        <div className="w-full md:w-1/2">
          <img
            src={product.url}
            alt={product.name}
            className="w-full h-[450px] object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6">
          <h2 className="text-4xl font-bold text-gray-900">{product.name}</h2>
          <p className="text-lg text-gray-700 leading-relaxed overflow-hidden">{product.description}</p>
          <div className="text-2xl font-semibold text-green-600">₹{product.price}</div>
          <div className="text-md bg-green-200 text-green-800 px-4 py-1 rounded-full w-fit">
            {product.category}
          </div>

          {/* Cart Actions */}
          {quantity === 0 ? (
            <button
              className="mt-5 w-full md:w-2/3 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 text-lg"
              onClick={() => addToCart(product)}
            >
              <FaShoppingCart  size={20} /> Add to Cart
            </button>
          ) : (
            <div className="mt-5 flex items-center gap-8">
              <button
                className="bg-red-500 hover:bg-red-600 text-white py-3 px-5 rounded-lg transition-all duration-300 text-lg"
                onClick={() => removeFromCart(product)}
              >
                <FaMinus  size={22} />
              </button>
              <span className="text-3xl font-semibold">{quantity}</span>
              <button
                className="bg-green-600 hover:bg-green-700 text-white py-3 px-5 rounded-lg transition-all duration-300 text-lg"
                onClick={() => addToCart(product)}
              >
                <FaPlus size={22} />
              </button>
            </div>
          )}

          {/* Share Button */}
          <div className="mt-5 flex items-center gap-6">
            <button
              onClick={handleShare}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-3 rounded-full flex items-center gap-2 transition-all duration-300 text-lg"
            >
              <FaShareAlt  size={20} /> 
            </button>
            <button
              onClick={()=> {window.location.href="https://wa.me/message/CBFQT25QMVDQC1"}}
              className="bg-green-600 hover:bg-green-700 text-white py-3 px-3 rounded-full flex items-center gap-2 transition-all duration-300 text-lg"
            >
              <ImWhatsapp    size={20} /> 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
