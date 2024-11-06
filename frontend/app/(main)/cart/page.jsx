'use client'
import Medcard from '@/components/Medcard';
import React, { useEffect, useState } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

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

  return (
    <div className='min-h-screen w-full bg-gray-50'>
      <h1 className='font-bold lg:py-3 py-5 text-3xl text-neutral-800 px-4 fixed top-0 w-full bg-lime-200 rounded-b-md shadow-sm z-10'>Your Cart</h1>
      <div className='flex gap-2 h-100'>
        <div className='pt-24 px-4 grid grid-cols-1 gap-4'>
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
            <p className='h-100 lg:left-1/2 lg:top-1/2 lg:absolute flex items-center justify-center text-gray-500'>Your cart is empty</p>
          )}
        </div>
        <div className=''></div>
      </div>
    </div>
  );
};

export default Cart;
