'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Button } from '@/components/ui/button';



const Layout = ({ children }) => {

        const pathname = usePathname();
        return (
            <div className="flex bg-white h-screen">
                <section className='lg:hidden bg-transparent absolute bottom-2 left-1/2 transform -translate-x-1/2 shadow-md z-40 flex justify-center items-center w-full'>
                    <div className='bg-white rounded-full shadow-[0_0_10px_rgba(0,0,0,0.3)] flex gap-1 py-2 px-11 items-center w-fit'>
                        {/* First Icon for Home */}
                        <Link href={'/home'}><div
                            className={`${pathname === '/home' ? 'text-add bg-lime-300/30 text-bold active:border-black' : 'text-gray-500'
                                } transition-all duration-100 p-3 rounded-lg hover:bg-primary hover:bg-opacity-10 flex flex-col gap-2 px-5 items-center justify-start`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                                />
                            </svg>
                            <p className={`text-[9px] text-black ${pathname === '/home' ? 'font-semibold' : 'text-gray-500'}`}>Meds</p>
                        </div>
                        </Link>

                        {/* Second Icon for Your Orders */}
                        <Link href={'/yourorder'}><div
                            className={`${pathname === '/yourorder' ? 'text-add bg-lime-300/30 text-bold active:border-black' : 'text-gray-500'
                                } transition-all duration-100 p-3 rounded-lg hover:bg-primary hover:bg-opacity-10 flex flex-col gap-2 px-5 items-center justify-start`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
                                />
                            </svg>
                            <p className={`text-[9px] text-black ${pathname === '/yourorder' ? 'font-semibold' : 'text-gray-500'}`}>Orders</p>
                        </div>
                        </Link>

                        {/* Third Icon for Track Order */}
                        <Link href={'/track'}>
                            <div
                                className={`${pathname === '/track' ? 'text-add bg-lime-300/30 text-bold active:border-black' : 'text-gray-500'
                                    } transition-all duration-100 p-3 rounded-lg hover:bg-primary hover:bg-opacity-10 flex flex-col gap-2 px-5 items-center justify-start`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                                    />
                                </svg>
                                <p className={`text-[9px] text-black ${pathname === '/track' ? 'font-semibold' : 'text-gray-500'}`}>
                                    Track
                                </p>
                            </div>
                        </Link>
                        <Link href={'/cart'}>
                            <div
                                className={`${pathname === '/cart' ? 'text-add bg-lime-300/30 text-bold active:border-black' : 'text-gray-500'
                                    } transition-all duration-100 p-3 rounded-lg hover:bg-primary hover:bg-opacity-10 flex flex-col gap-2 px-5 items-center justify-start`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 3h2l.6 3m0 0h13.8l-.6-3H5.6M5.6 6l1.8 9h9l1.8-9M9 22a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z"
                                    />
                                </svg>

                                <p className={`text-[9px] text-black ${pathname === '/cart' ? 'font-semibold' : 'text-gray-500'}`}>
                                    Cart
                                </p>
                            </div>
                        </Link>
                    </div>
                </section>
                <section className='lg:flex hidden lg:flex-col bg-white max-h-screen m-1 rounded-full justify-between p-1 px-2 items-center '>
                    <div className='py-3 px-2 rounded-full w-full hover:bg-primary hover:bg-opacity-5 justify-center flex items-center transition-all duration-150'>LG</div>
                    <div className="flex flex-col space-y-2">
                        <p className='text-gray-500 text-xs w-full flex justify-start tracking-widest'>NAVIGATION</p>
                        {/* First Icon for Home */}
                        <Link href={'/home'}><div
                            className={`${pathname === '/home' ? 'text-add bg-lime-300/30 text-bold active:border-black' : 'text-gray-500'
                                } transition-all duration-100 p-3 rounded-lg hover:bg-primary hover:bg-opacity-10 flex gap-2 px-5 items-center justify-start`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                                />
                            </svg>
                            <p className={`text-sm text-black ${pathname === '/home' ? 'font-semibold' : 'text-gray-500'}`}>Meds</p>
                        </div>
                        </Link>

                        {/* Second Icon for Your Orders */}
                        <Link href={'/yourorder'}><div
                            className={`${pathname === '/yourorder' ? 'text-add bg-lime-300/30 text-bold active:border-black' : 'text-gray-500'
                                } transition-all duration-100 p-3 rounded-lg hover:bg-primary hover:bg-opacity-10 flex gap-2 px-5 items-center justify-start`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
                                />
                            </svg>
                            <p className={`text-sm text-black ${pathname === '/yourorder' ? 'font-semibold' : 'text-gray-500'}`}>Orders</p>
                        </div>
                        </Link>

                        {/* Third Icon for Track Order */}
                        <Link href={'/track'}>
                            <div
                                className={`${pathname === '/track' ? 'text-add bg-lime-300/30 text-bold active:border-black' : 'text-gray-500'
                                    } transition-all duration-100 p-3 rounded-lg hover:bg-primary hover:bg-opacity-10 flex gap-2 px-5 items-center justify-start`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                                    />
                                </svg>
                                <p className={`text-sm text-black ${pathname === '/track' ? 'font-semibold' : 'text-gray-500'}`}>
                                    Track
                                </p>
                            </div>
                        </Link>
                        <Link href={'/cart'}>
                            <div
                                className={`${pathname === '/cart' ? 'text-add bg-lime-300/30 text-bold active:border-black' : 'text-gray-500'
                                    } transition-all duration-100 p-3 rounded-lg hover:bg-primary hover:bg-opacity-10 flex gap-2 px-5 items-center justify-start`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 3h2l.6 3m0 0h13.8l-.6-3H5.6M5.6 6l1.8 9h9l1.8-9M9 22a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z"
                                    />
                                </svg>

                                <p className={`text-sm text-black ${pathname === '/cart' ? 'font-semibold' : 'text-gray-500'}`}>
                                    Cart
                                </p>
                            </div>
                        </Link>
                    </div>
                    <div className='py-2 px-2 rounded-full w-full justify-center items-center mb-4 flex flex-col gap-2'>
                        <p className='text-gray-500 text-xs w-full flex justify-start tracking-widest'>PROFILE</p>
                        <HoverCard>
                            <HoverCardTrigger><div className='flex items-center gap-1 justify-around'><div className='w-8 h-8 rounded-full bg-black' ></div><p className='font-semibold text-black text-sm truncate'>Username</p></div></HoverCardTrigger>
                            <HoverCardContent>
                                <p className=' font-semibold'>Username</p>
                                <p className='text-gray-900 text-sm'>email@gmail.com</p>
                                <p className='text-xs text-gray-500'>You can edit your profile from here.</p>
                            </HoverCardContent>
                        </HoverCard>
                        <Button className='bg-red-400 rounded-sm p-2' >LogOut</Button>
                    </div>

                </section>
                <main className="flex-grow">
                    {children}
                </main>

            </div>
        );
    };
export default Layout;
