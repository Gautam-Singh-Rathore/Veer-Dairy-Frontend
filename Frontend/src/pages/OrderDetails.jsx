import React, { useContext, useEffect, useState } from "react";
import { CheckCircle, Clock, Package, MapPin, Phone, ChevronDown, ChevronUp } from "lucide-react";
import { BACKEND_URL } from "../utils/Constants";
import { UserContext } from "../context/UserProvider";
import axios from "axios";

const OrderList = () => {
  const[orders , setOrders] = useState([]);
  const {user} = useContext(UserContext);

  const getOrders = async ()=>{
    try {
        const response = await axios.get(`${BACKEND_URL}/order/customer/get/${user.uid}`)
        console.log(response)
        console.log(response.data)
        if(response.status==200){
            setOrders(response.data);
        }
    } catch (error) {
        console.log(error); 
    }
  }

  useEffect(()=>{
    getOrders();
  },[])

  // Function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  // Order status icons
  const statusIcons = {
    PENDING: <Clock className="text-yellow-500" size={20} />,
    ACCEPTED: <Clock className="text-yellow-500" size={20} />,
    DELIVERED: <CheckCircle className="text-green-600" size={20} />,
    SHIPPED: <Package className="text-blue-500" size={20} />,
  };

  // State for expanded orders
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Toggle order details
  const toggleOrderDetails = (id) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  return (
    <div className="w-full min-h-screen flex justify-center  pt-[12vh] px-4 py-8">
      <div className="max-w-3xl w-full bg-white  rounded-lg p-6 lg:p-8">
        {/* Order List Heading */}
        <h2 className="text-2xl font-bold text-[#00B86C] text-center mb-6">
          My Orders
        </h2>

        {/* Order List */}
        {orders.map((order) => (
          <div key={order.id} className="bg-gray-50 p-4 rounded-lg mb-4 shadow-md">
            {/* Order Summary */}
            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleOrderDetails(order.id)}>
              <div>
                <p className="text-lg font-semibold text-gray-700">
                  Order ID: <span className="text-gray-900">#{order.id}</span>
                </p>
                <p className="text-gray-600">
                  Date: <span className="font-medium">{formatDate(order.orderDate)}</span>
                </p>
                <p className="flex items-center gap-2 text-gray-600">
                  Status: {statusIcons[order.status]} <span className="font-semibold">{order.status}</span>
                </p>
              </div>
              <div>
                {expandedOrder === order.id ? <ChevronUp size={24} className="text-gray-600" /> : <ChevronDown size={24} className="text-gray-600" />}
              </div>
            </div>

            {/* Order Details (Expanded View) */}
            {expandedOrder === order.id && (
              <div className="mt-4 border-t border-gray-300 pt-4">
                {/* Delivery Details */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Delivery Details</h3>
                  <p className="flex items-center gap-2 text-gray-600">
                    <MapPin size={18} className="text-red-500" /> {order.deliveryAddress}
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <Phone size={18} className="text-blue-500" /> {order.customerMobile}
                  </p>
                </div>

                {/* Order Items */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Items Ordered</h3>
                  <ul className="divide-y divide-gray-300">
                    {order.items.map((item) => (
                      <li key={item.productId} className="py-2 flex justify-between items-center">
                        <span className="text-gray-700 font-medium">{item.productName}</span>
                        <span className="text-gray-500">x{item.quantity}</span>
                        <span className="text-green-600 font-semibold">₹{item.priceAtPurchase}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Total Price */}
                <div className="flex justify-between items-center text-xl font-bold text-gray-900 bg-green-100 p-4 rounded-lg shadow-md">
                  <span>Total Price:</span>
                  <span className="text-[#00B86C]">₹{order.totalPrice}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
