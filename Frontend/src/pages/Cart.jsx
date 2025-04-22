import React, { useContext } from "react";
import { CartContext } from "../context/CartProvider";
import { Plus, Minus, Trash2 } from "lucide-react";
import { UserContext } from "../context/UserProvider";
import axios from "axios";
import { BACKEND_URL } from "../utils/Constants";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const Cart = () => {
  const { cart,setCart, addToCart, removeFromCart, clearCart } =
    useContext(CartContext);
  const { user , isLoggedIn} = useContext(UserContext);
  const navigate = useNavigate();

  // Calculate Total Price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Order Handler (To be implemented)
  const handleOrder = async () => {
    if(!isLoggedIn){
      navigate("/login")
        return;
    }
    const request = {
      customerId: user.uid,
      total: totalPrice,
      address: user.address,
      mobile: user.phone,
      items: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };
    try {
      const response = await axios.post(`${BACKEND_URL}/order/place-new`,request);
      console.log(request);
      if (response.status == 200) {
        toast.success("Order Placed");
        setCart([])
        navigate("/")
      }else{
        toast.error("Order not placed");
      }
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
    }
  };

  return (
    <div className="pt-[12vh]  min-h-screen px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg g">
        <h2 className="text-3xl font-bold text-[#00B86C] text-center mb-6">
          Your Cart
        </h2>

        {/* If cart is empty */}
        {cart.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            Your cart is empty.
          </p>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-gray-50 shadow rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/004-soymilk.jpg/120px-004-soymilk.jpg"
                      alt={item.name}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        ₹{item.price} x {item.quantity}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => removeFromCart(item)}
                      className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="text-lg font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total & Order Button */}
            <div className="mt-6 border-t pt-4 flex flex-col items-center">
              <h3 className="text-xl font-bold">Total: ₹{totalPrice}</h3>
              <button
                onClick={handleOrder}
                className="mt-4 w-full bg-[#00B86C] text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-all"
              >
                Place Order
              </button>
              <button
                onClick={clearCart}
                className="mt-2 text-red-500 hover:underline"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
