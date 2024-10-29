'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const ShopCard = ({ shop }) => {
    // Initialize based on shop.important

    return (
        <>
            <Link href={`/shop/${shop.shop_name}`}><div className='flex flex-col hover:bg-gray-100 pb-4 rounded-md'>
                <div className="border rounded-lg border-gray-300 overflow-hidden relative">
                    <Image
                        src={'/img2.webp'}
                        height={200}
                        width={400}
                        layout="responsive"
                        alt="Shop Image"
                        className='z-0'
                    />
                    <div className='absolute bg-gradient-to-b from-transparent via-transparent to-neutral-800 items-baseline flex text-white inset-0 z-20 bg-opacity-75 p-4'>
                        <div className='bottom-0 absolute flex min-w-[90%]'>
                            <div className='flex flex-grow items-center'>
                                <div>
                                    <div className='flex text-sm font-semibold text-gray-100'>
                                        <p>Open : {shop.timings ? shop.timings :"No timing mentioned"}</p>
                                    </div>
                                    <div className='flex gap-1 font-semibold items-center mb-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star">
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                        </svg>
                                        <p className='text-gray-100 text-sm'>{shop.rating}</p>
                                        &nbsp;&bull;&nbsp;
                                        <p className='text-sm'>{shop.delivery_time ? shop.delivery_time :"No estimated deleivery time"}</p>
                                    </div>
                                </div>

                            </div>
                            <div className="cursor-pointer">
                                {shop.wishlisted ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7 text-red-500">
                                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7 text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                    </svg>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='flex flex-col mt-2 px-3'>
                        <h1 className='text-md font-bold text-black'>{shop?.shop_name || "Shop Name"}</h1>
                        <h3 className='text-sm font-semibold text-black'>{shop?.city || "No Address"}</h3>
                        <h3 className='text-xs font-semibold text-gray-700'>{shop?.location || "No Location"}</h3>

                    </div>
                </div>
            </div>
            </Link>
        </>
    );
};

export default ShopCard;
