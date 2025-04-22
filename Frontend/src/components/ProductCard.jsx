import { useContext } from "react";
import { CartContext } from "../context/CartProvider";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const truncatedDescription =
    product.description.length > 60
      ? product.description.substring(0, 60) + "..."
      : product.description;

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer">
      {/* Product Image */}
      <img
        src={product.url}
        alt={product.name}
        className="w-full h-48 object-cover"
      />

      {/* Product Details */}
      <div className="p-4 flex flex-col items-center ">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>

        {/* Description Box - Ensures Proper Overflow Handling */}
        <div className="w-full">
          <p className="text-sm text-gray-600 text-center bg-white px-2 overflow-hidden py-1 rounded-md">
            {truncatedDescription}
          </p>
        </div>

        {/* Price */}
        <span className="text-lg font-bold text-green-600 mt-2">
          ₹{product.price}
        </span>

        {/* View Product Button */}
        <button
          className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          View Product
        </button>

        {/* Cart Actions */}
        {quantity === 0 ? (
          <button
            className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
            onClick={() => addToCart(product)}
          >
            <ShoppingCart size={16} /> Add to Cart
          </button>
        ) : (
          <div className="mt-3 flex items-center gap-4">
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg transition-all duration-300"
              onClick={() => removeFromCart(product)}
            >
              <Minus size={16} />
            </button>
            <span className="text-lg font-semibold text-gray-800">
              {quantity}
            </span>
            <button
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-lg transition-all duration-300"
              onClick={() => addToCart(product)}
            >
              <Plus size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
