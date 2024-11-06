'use client'
import Medcard from '@/components/Medcard';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem('token')
      try {
        const response = await fetch('http://localhost:5000/cart/cart-items', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Retrieve the JWT from local storage
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCartItems(data.cart); // Set the cart items in state
        } else {
          console.error('Failed to fetch cart items');
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <div className='min-h-screen max-h-screen overflow-auto w-full bg-gray-50'>
      <h1 className='font-bold lg:py-3 py-5 text-3xl text-neutral-800 px-4 fixed top-0 w-full bg-lime-200 rounded-b-md shadow-sm z-10'>Your Cart</h1>
      <div className=' pt-24 flex gap-2 h-100'>
        <div className='px-4 grid w-3/7 mb-24 lg:mb-0 grid-cols-1 gap-4'>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (

              <Medcard
                key={item.id}
                medicine={{
                  id: item.medicine_id,
                  name: item.medicine_name, // Modify this to show the medicine's actual name if available
                  category: 'Medicine Category',         // Provide the category if available
                  rating: 4.5,                           // Provide the rating if available
                  price: item.price_per_unit,
                  description: 'Medicine description',   // Provide the description if available
                  manufacturer: 'Manufacturer Name',     // Provide the manufacturer if available
                }}
                quantity={item.quantity} // Pass the quantity for display
              />
            ))
          ) : (
            <p className='h-full w-full lg:absolute flex items-center text-center justify-center text-gray-500'>Your cart is empty</p>
          )}
        </div>
        <div className='proceed-to-pay border bg-white lg:block hidden rounded-md px-4 py-2 fixed right-12'>
          <div className='relative'>
            <div className="w-full h-full  p-4 flex flex-col items-center min-w-96 max-h-[500px] overflow-auto">
              <strong className="text-xl font-bold mb-4 text-center">Total Items</strong>

              {cartItems.length > 0 ? (
                <div className="w-full ">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex text-sm items-center justify-between px-3 py-2 border-b border-gray-300 "
                    >
                      <div className='flex flex-col'>
                        <span className="font-medium text-gray-800">{item.medicine_name}</span>
                        <span className="text-gray-600">Qty: {item.quantity}</span>
                        <span className="text-gray-600">Price: Rs.{item.price_per_unit}</span>
                      </div>
                      <span className="font-semibold text-gray-900">Total: Rs.{item.total_price}</span>
                    </div>
                  ))}
                  <div className='absolute bottom-0 min-w-full px-3 -translate-x-4 py-3 bg-white'>
                    <div className="flex justify-between items-center p-2 mt-4 ">
                      <span className="font-bold text-lg text-gray-800">Total Price</span>
                      <span className="font-bold text-lg text-green-600">
                        Rs.{cartItems.reduce((acc, item) => acc + item.total_price, 0).toFixed(2)}
                      </span>
                    </div>
                    <div className='w-full'>
                      <Button className='w-full bg-yellow-300 rounded-[3px] hover:bg-yellow-600 font-bold'>Proceed to pay { }</Button>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No items in cart</p>
              )}
            </div>
            
          </div>
        </div>
        <div className="fixed bottom-20 z-50 w-full left-0 right-0 bg-red p-1 lg:hidden bloc">
          <Button
            onClick={toggleDrawer}
            className="w-full bg-yellow-300 rounded-[3px] py-4 hover:bg-yellow-600 font-bold"
          >
            Proceed to Pay
          </Button>
        </div>

        {/* Drawer for Mobile */}
        {isDrawerOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-md p-4 w-11/12 max-w-md">
              <strong className="text-xl font-bold mb-4 text-center">Total Items</strong>

              {cartItems.length > 0 ? (
                <div className="w-full">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex text-sm max-h-min overflow-auto items-center justify-between px-3 py-2 border-b border-gray-300"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-800">{item.medicine_name}</span>
                        <span className="text-gray-600">Qty: {item.quantity}</span>
                        <span className="text-gray-600">Price: Rs.{item.price_per_unit}</span>
                      </div>
                      <span className="font-semibold text-gray-900">Total: Rs.{item.total_price}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center p-2 mt-4">
                    <span className="font-bold text-lg text-gray-800">Total Price</span>
                    <span className="font-bold text-lg text-green-600">
                      Rs.{cartItems.reduce((acc, item) => acc + item.total_price, 0).toFixed(2)}
                    </span>
                  </div>
                  <Button className="w-full bg-yellow-300 rounded-[3px] hover:bg-yellow-600 font-bold mt-4">
                    Confirm Payment
                  </Button>
                </div>
              ) : (
                <p className="text-gray-500">No items in cart</p>
              )}
              <Button
                onClick={toggleDrawer}
                className="w-full mt-4 text-gray-600 border bg-white rounded-[3px] active:bg-gray-400 hover:bg-white font-bold"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
