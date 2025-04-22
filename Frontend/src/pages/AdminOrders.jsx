import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../utils/Constants";
import axios from "axios";

const AdminOrders = () => {
  const [pending, setPending] = useState([]);
  const [all, setAll] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);

  const getPending = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/order/all/pending`);
      if (response.status === 200) {
        setPending(response.data);
      }
    } catch (error) {
      console.error("Error fetching pending orders:", error);
    }
  };

  const getAll = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/order/all/other`);
      if (response.status === 200) {
        setAll(response.data);
      }
    } catch (error) {
      console.error("Error fetching other orders:", error);
    }
  };

  const acceptOrder = async (orderId) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/order/accept/${orderId}`);
      console.log(response)
      console.log(response.data);
      if (response.status === 200) {
        getPending();
        getAll();
      }
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  useEffect(() => {
    getAll();
    getPending();
  }, []);

  return (
    <div className="pt-[12vh] w-full max-w-6xl mx-auto min-h-screen p-4">
      <h2 className="text-2xl font-bold text-[#00B86C] text-center mb-6">
          My Orders
        </h2>
      {/* Pending Orders Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Pending Orders</h2>
        {pending.length === 0 ? (
          <p className="text-gray-500 text-center">No pending orders.</p>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {pending.map((order) => (
              <div key={order.id} className="p-4 border rounded-lg bg-gray-100 shadow-md">
                <div className="flex flex-col lg:flex-row justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Order ID: {order.id}</h3>
                    <p className="text-gray-600 text-sm">Date: {new Date(order.orderDate).toLocaleString()}</p>
                    <p className="text-gray-600 text-sm">Total: ₹{order.totalPrice}</p>
                    <p className="text-gray-600 text-sm">Address: {order.deliveryAddress}</p>
                    <p className="text-gray-600 text-sm">Mobile: {order.customerMobile}</p>
                  </div>
                  <div className="flex flex-col lg:items-end mt-3 lg:mt-0">
                    <button
                      onClick={() => acceptOrder(order.id)}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition text-sm mb-2 lg:mb-0"
                    >
                      Accept Order
                    </button>
                    <button
                      onClick={() => toggleOrderDetails(order.id)}
                      className="text-blue-600 text-sm underline"
                    >
                      {expandedOrder === order.id ? "Hide Items" : "View Items"}
                    </button>
                  </div>
                </div>
                {expandedOrder === order.id && (
                  <div className="mt-3 p-3 border-t">
                    <h4 className="font-semibold">Order Items:</h4>
                    {order.items.map((item) => (
                      <div key={item.productId} className="p-2 border-b">
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                        <p className="text-gray-600 text-sm">Price: ₹{item.priceAtPurchase}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Other Orders Section */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">All Orders</h2>
        {all.length === 0 ? (
          <p className="text-gray-500 text-center">No other orders.</p>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {all.map((order) => (
              <div key={order.id} className="p-4 border rounded-lg bg-gray-50 shadow-md">
                <div className="flex flex-col lg:flex-row justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Order ID: {order.id}</h3>
                    <p className="text-gray-600 text-sm">Date: {new Date(order.orderDate).toLocaleString()}</p>
                    <p className="text-gray-600 text-sm">Total: ₹{order.totalPrice}</p>
                    <p className="text-gray-600 text-sm">Address: {order.deliveryAddress}</p>
                    <p className="text-gray-600 text-sm">Mobile: {order.customerMobile}</p>
                    <p className="text-gray-600 text-sm">Status: {order.status}</p>
                  </div>
                  <button
                    onClick={() => toggleOrderDetails(order.id)}
                    className="text-blue-600 text-sm underline mt-3 lg:mt-0"
                  >
                    {expandedOrder === order.id ? "Hide Items" : "View Items"}
                  </button>
                </div>
                {expandedOrder === order.id && (
                  <div className="mt-3 p-3 border-t">
                    <h4 className="font-semibold">Order Items:</h4>
                    {order.items.map((item) => (
                      <div key={item.productId} className="p-2 border-b">
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                        <p className="text-gray-600 text-sm">Price: ₹{item.priceAtPurchase}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
