'use client'
import Image from 'next/image';
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge"
import { Button } from './ui/button';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import Addcart from './Addcart';


const Medcard = ({ medicine }) => {
    const [isImportant, setIsImportant] = useState(false); // State to track if the item is marked as important

    const handleImportantClick = () => {
        setIsImportant(!isImportant); // Toggle the state on click
    };

    return (
        <>
            <div className=" bg-white rounded-lg min-h-40 flex w-full p-2 my-2 hover:shadow-lg lg:hover:border-green-600/50 lg:hover:bg-green-100/50 lg:border transition-all duration-100 relative"> {/* Set relative positioning on the main container */}

                <div className="lg:ml-4 ml-0 p-2 w-2/3 min-h-full"> {/* Removed relative positioning from here */}
                    
                    <div className='flex-col justify-between'>
                        <Drawer>
                            <DrawerTrigger>
                                <h2 className="text-lg font-bold flex gap-2 items-center">{medicine.name}
                                    <Badge variant="" className=" bg-neutral-800 py-1 px-3 text-white text-xs font-semibold hover:bg-neutral-800 cursor-pointer"> {/* Adjusted position to ensure it doesn't overlap with other elements */}
                                        {medicine.category}
                                    </Badge>
                                </h2>
                                <div className='flex items-center'>
                                    <div className='bg-yellow-100 w-fit px-2 py-1 rounded-sm flex items-center justify-center'><p className='text-yellow-400 font-semibold text-sm flex items-center'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                                        <path fillRule="evenodd" d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z" clipRule="evenodd" />
                                    </svg>

                                        &nbsp;<span className='text-neutral-900'>{medicine.rating}</span></p>
                                    </div>&nbsp;<span className='text-gray-500 text-sm'>14 ratings</span>
                                </div>
                                <h3 className='text-md text-neutral-900 font-semibold'><span className='font-semibold text-green-600'>Price: </span>₹{medicine.price}</h3>
                                <div className='flex gap-2 justify-between items-center'>
                                    <div className='flex flex-col h-full justify-between'>
                                        <div className='lg:max-w-60 max-w-48 py-2 rounded-sm'>
                                            <p className="text-sm text-gray-700">{medicine.description}</p>
                                        </div>
                                        <p className='text-gray-500 text-sm mt-2'>{medicine.manufacturer}</p>
                                    </div>

                                </div>
                            </DrawerTrigger>
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                                    <DrawerDescription>This action cannot be undone.</DrawerDescription>
                                </DrawerHeader>
                                <DrawerFooter>
                                    <Button>Submit</Button>
                                    <DrawerClose>
                                        <Button variant="outline">Cancel</Button>
                                    </DrawerClose>
                                </DrawerFooter>
                            </DrawerContent>
                        </Drawer>
                        <div
                            onClick={handleImportantClick} // Attach the click handler
                            className={`flex gap-3 text-sm border w-fit px-3 cursor-pointer rounded-sm mt-2 items-center py-2 
                            ${isImportant ? 'bg-red-50 text-[#FF0000] border-[#FF0000]' : 'border-gray-300 text-gray-800 hover:bg-red-100 active:bg-red-200/70'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg"
                                fill={isImportant ? "red" : "none"}
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke={isImportant ? "none" : "red"}
                                className="size-5">
                                <path strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                            </svg>

                            <span className={`${isImportant?' text-black':''}`}>{isImportant ? 'Added to Healthlist' : 'Add to Healthlist'}</span>
                        </div>
                    </div>
                </div>
                <div className='relative z-0 w-1/3 min-h-full '>
                    <Image
                        src={'/medimg.jpeg'}
                        height={100}
                        width={100}
                        alt="Medicine_Image"
                        className=' rounded-lg min-h-full w-full object-contain lg:object-cover' // Added rounded corners and object-cover for image scaling
                    />
                    <Addcart medicineId={medicine.id}/>
                </div>
                
            </div>
            <p className='border-b flex-grow border-gray-300 my-0 sm:flex lg:hidden'></p>


        </>
    );
};

export default Medcard;
