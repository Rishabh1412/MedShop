'use client';
import React from 'react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-indigo-800 to-black flex justify-start w-full items-center p-4">
      <div className='flex-col ms-10'>
        <h1 className="text-white text-4xl md:text-9xl font-bold mb-8 text-start"><span className='text-neutral-200'>CureCart</span> – Bringing<br /> healing to your doorstep.</h1>

        <div className="gap-6 flex items-center">
          <Link href="/loginshop">
            <button className="bg-tranparent border border-white text-white py-3 px-8 rounded-lg text-xl hover:bg-green-700 transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-green-500">
              Login as Shopkeeper
            </button>
          </Link>

          <Link href="/login">
            <button className="bg-white text-black py-3 px-8 rounded-lg text-xl hover:bg-blue-700 transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500">
              Login as User
            </button>
          </Link>

        </div>
      </div>
      <footer className="absolute bottom-4 text-white flex justify-center left-1/2 -translate-x-1/2">
        <p>&copy; 2024 Our Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
