'use client';
import LoadingSpinner from '@/components/LoadingSpinner';
import React, { useEffect, useState } from 'react';

const YourOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:5000/order/user/orders', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setOrders(data.orders);
        } else {
          console.error('Failed to fetch orders');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen"><LoadingSpinner />&nbsp; &nbsp; &nbsp;<span className='text-xl font-semibold'> Loading...</span></div>;
  }

  return (
    <div className="container mx-auto p-4 lg:px-12 overflow-auto bg-lime-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center bg-lime-200 shadow-md rounded-md border py-3">Your Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order.order_id}
              className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition duration-200"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Order ID: <span className="font-normal">{order.order_id}</span>
              </h2>
              <p className="text-gray-600">
                Status: <span className="font-semibold text-green-600">{order.order_status}</span>
              </p>
              <p className="text-gray-600">
                Order Date: <span className="font-semibold">{new Date(order.ordered_at).toLocaleDateString()}</span>
              </p>
              <p className="text-gray-600">
                Total Amount: <span className="font-semibold">${order.total_amount}</span>
              </p>

              <h3 className="text-lg font-medium mt-4 mb-2 text-gray-700">Items:</h3>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row items-start md:items-center justify-between bg-gray-50 p-3 rounded-md border border-gray-100"
                  >
                    <div className="flex flex-col">
                      <p className="font-semibold text-gray-800">Medicine: {item.medicine_name}</p>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <div className="mt-2 md:mt-0 text-left md:text-right">
                      <p className="text-gray-600">Price per unit: ${item.price_per_unit}</p>
                      <p className="font-semibold text-gray-800">Total: ${item.total_price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YourOrder;
