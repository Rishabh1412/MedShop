'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Placeorder = () => {
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchAddresses = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('http://localhost:5000/order/user-addresses', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setAddresses(data.addresses);
                } else {
                    console.log('Failed to fetch addresses');
                }
            } catch (error) {
                console.log('Error fetching addresses:', error);
            }
        };

        fetchAddresses();
    }, []);

    const placeOrder = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:5000/order/placing-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ address_id: selectedAddress }), // Ensure selectedAddress is being passed correctly
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Order placed:', data);
            } else {
                console.log('Failed to place order');
            }
        } catch (error) {
            console.log('Error placing order:', error);
        }
    };


    return (
        <div className='h-full w-full bg-neutral-50 mx-auto p-4'>
            <h1 className='text-2xl font-bold mb-4 flex gap-5 items-center'>
                <Link href={'/cart'}>
                    <div className='bg-neutral-500/20 p-3 rounded-full hover:bg-neutral-500/50'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                            <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
                        </svg>
                    </div>
                </Link>
                Place Order
            </h1>

            <div className='mb-4 lg:px-6 px-1 max-w-4xl'>
                <h2 className='text-lg font-semibold pb-3 items-center flex justify-between '>
                    Select Address
                    <Link href="/add-address">
                        <Button className='bg-green-100 text-green-600 hover:bg-green-200 rounded-[5px]'>
                            Add New Address
                        </Button>
                    </Link>
                </h2>
                <div className='bg-white rounded-md border px-4 py-1 max-h-96 overflow-auto'>
                    {addresses.map((address) => (
                        <div key={address.id} className="mb-4 hover:bg-gray-100 px-4 py-2 rounded border-t flex items-center">
                            <input
                                type="radio"
                                name="address"
                                value={address.id}
                                onChange={() => setSelectedAddress(address.id)}
                                className="mr-2"
                            />
                            <label className="flex flex-col">
                                <span>{address.address}</span>
                                <span>{address.city}, {address.state} - <span className='font-semibold'>{address.pincode}</span></span>
                                <span><span className='font-semibold'>Phone Number : </span>{address.phone}</span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex space-x-4 lg:px-6 px-1">
                <Button className='bg-yellow-300 rounded-[5px] hover:bg-yellow-600' onClick={placeOrder}>
                    Proceed to Place Order
                </Button>
            </div>
        </div>
    );
};

export default Placeorder;
