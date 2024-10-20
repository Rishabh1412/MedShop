'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { Skeleton } from "@/components/ui/skeleton";
import Medicines from '@/components/Medicines';

const ShopPage = () => {
    const router = useRouter();
    const params = useParams();
    const [shopDet, setShopdet] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [hearted, setHearted] = useState(false); // Track if the shop is wishlisted
    const [loading, setLoading] = useState(false); // Loading state

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            try {
                const response = await axios.get(`http://localhost:5000/get-shop-data?shop_name=${params.name}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const shopData = response.data.shop_data;
                setShopdet(shopData);
                setHearted(shopData.wishlisted); // Set the initial heart state based on shop data
            } catch (error) {
                console.error('Error fetching shop data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (params.name) {
            fetchData();
        }
    }, [router, params.name]);

    const toggleHeart = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        const newHeartedState = !hearted; // Toggle state
        setHearted(newHeartedState); // Update state immediately for UI feedback
        setLoading(true); // Start loading state
        console.log(shopDet.shop_id);
        try {
            const response = await axios.post(`http://localhost:5000/toggle-wishlist`, {
                shop_id: shopDet.shop_id, // Use the shop ID from the state
                wishlisted: newHeartedState,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status !== 200) {
                throw new Error('Failed to update wishlist');
            }

        } catch (error) {
            console.error('Error updating wishlist:', error);
            alert('An error occurred while updating your wishlist. Please try again.');
            // Revert the state if the request fails
            setHearted(hearted); // Revert to the previous state
        } finally {
            setLoading(false); // End loading state
        }
    };

    return (
        <div className='flex flex-col h-screen relative overflow-hidden'>
            <div className='absolute overflow-hidden inset-0 max-h-80'>
                <Image src={'/medimg.jpeg'} fill objectFit="cover" alt='' />
            </div>

            <div className='absolute inset-0 max-h-80 bg-gradient-to-t from-neutral-950/80 via-neutral-950/50 to-transparent z-0 text-gray-100'>
                <Link href={'/home'}>
                    <div className='bg-neutral-950/50 hover:bg-neutral-950/60 w-fit m-2 p-3 rounded-full flex items-center justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </div>
                </Link>

                <div className='flex items-end justify-between bottom-24 px-4 pb-0 absolute w-full'>
                    <div>
                        {isLoading ? <Skeleton className="w-40 h-8" /> : <p className='font-bold text-5xl py-3'>{`${shopDet.shop_name || 'Shop'}`}</p>}
                        {isLoading ? <Skeleton className="w-32 h-4" /> : <p className='font-semibold text-sm px-1'>{shopDet.location}, {shopDet.city}, {shopDet.state}</p>}
                    </div>
                    <div onClick={toggleHeart} className='cursor-pointer py-3 text-5xl'>
                        {loading ? (
                            <div className="animate-spin"> {/* Loading spinner or similar animation */}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="size-10">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={2} />
                                </svg>
                            </div>
                        ) : hearted ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10 text-red-500">
                                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                        )}
                    </div>
                </div>
            </div>

            <div className='relative z-10 translate-y-60 border border-gray-200 shadow-md lg:bg-zinc-50 bg-white rounded-t-2xl w-full h-full mt-auto overflow-y-auto'>
                <div className='justify-center px-5 py-1 w-16 h-1 top-0 sticky z-20 left-1/2 translate-x-[-50%] bg-neutral-800 rounded-full mx-auto mt-2'></div>
                <p className='tracking-[4px] pt-2 text-gray-600 text-sm font-semibold px-4 w-full flex items-center gap-2'>PRODUCTS<span className=' border-b flex-grow'></span></p>

                <div className='lg:mb-64 mb-80'>
                    <Medicines medicine_data={shopDet.medicines || []} />
                </div>
            </div>
        </div>
    );
};

export default ShopPage;
