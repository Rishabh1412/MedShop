'use client'
import Medicines from '@/components/Medicines';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

const ShopPage = () => {
    const router = useRouter();
    const params= useParams(); // Get shop_name from query params
    const [shopDet, setShopdet] = useState({});
    console.log(params.name);
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
                setShopdet(response.data.shop_data); // Handle your shop data
            } catch (error) {
                console.error('Error fetching shop data:', error);
            }
        };

        if (params.name) {
            fetchData();
            console.log("Fetched data");
        }
    }, [router, params.name]);

    return (
        <>
            <div className='flex flex-col h-screen relative overflow-hidden'>
                <div className='absolute overflow-hidden inset-0 max-h-80'>
                    <Image src={'/medimg.jpeg'} fill objectFit="cover" className='' alt=''/>
                </div>

                {/* Overlay Gradient on Top of the Image */}
                <div className='absolute inset-0 max-h-80 bg-gradient-to-t from-neutral-950/80 flex flex-col justify-between via-neutral-950/50 to-transparent z-0 text-gray-100'>
                    <Link href={'/home'}>
                        <div className='bg-neutral-950/50 hover:bg-neutral-950/60 w-fit m-2 p-3 rounded-full flex items-center justify-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                        </div>
                    </Link>
                    <div className='flex items-end justify-between bottom-24 px-4 pb-0 absolute w-full'>
                        <div>
                            <p className='font-bold text-5xl py-3'>{shopDet.shop_name || 'Shop'}</p>
                            <p className='text-sm'>Area, Location, State, Jharkhand 827013</p>
                        </div>
                        <div className='py-3 text-5xl'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="size-10">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Swipeable Content Section */}
                <div className='relative z-10 translate-y-60 border border-gray-200 shadow-md lg:bg-zinc-50 bg-white rounded-t-2xl w-full h-full mt-auto overflow-y-auto'>
                    <div className='justify-center px-5 py-1 w-16 h-1 top-0 sticky z-20 left-1/2 translate-x-[-50%] bg-neutral-800 rounded-full mx-auto mt-2'></div>
                    <p className='tracking-[4px] pt-2 text-gray-600 text-sm font-semibold px-4 w-full flex items-center gap-2'>PRODUCTS<span className=' border-b flex-grow'></span></p>

                    {/* Pass shopDet.medicines to Medicines */}
                    <div className='lg:mb-64 mb-80'>
                        <Medicines medicine_data={shopDet.medicines || []} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShopPage;
