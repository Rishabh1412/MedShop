'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const AddAddress = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const router = useRouter();

    const onSubmit = async (data) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:5000/order/add-delivery-location', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                console.log('Address added successfully!');
                reset();
                router.push('/place-order');
            } else {
                console.log('Failed to add address');
            }
        } catch (error) {
            console.log('Error adding address:', error);
        }
    };

    return (
        <div className="w-full mx-auto bg-white">
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-6 fixed w-svw bg-white shadow-md rounded-b-md py-4">Add New Address</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 h-screen lg:px-72 px-8 max-h-screen pt-20 overflow-auto bg-gray-100">
                <div className="space-y-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-600">Address</label>
                    <input
                        id="address"
                        type="text"
                        placeholder="Enter your address"
                        {...register('address', { required: 'Address is required' })}
                        className="w-full p-3 border bg-white outline-none border-none border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                    {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-600">City</label>
                    <input
                        id="city"
                        type="text"
                        placeholder="Enter your city"
                        {...register('city', { required: 'City is required' })}
                        className="w-full p-3 border bg-white outline-none border-none border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                    {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="state" className="block text-sm font-medium text-gray-600">State</label>
                    <input
                        id="state"
                        type="text"
                        placeholder="Enter your state"
                        {...register('state', { required: 'State is required' })}
                        className="w-full p-3 border bg-white outline-none border-none border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                    {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="pincode" className="block text-sm font-medium text-gray-600">Pincode</label>
                    <input
                        id="pincode"
                        type="text"
                        placeholder="Enter your pincode"
                        {...register('pincode', {
                            required: 'Pincode is required',
                            pattern: { value: /^[0-9]{5,6}$/, message: 'Invalid pincode' },
                        })}
                        className="w-full p-3 border bg-white outline-none border-none border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                    {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode.message}</p>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="phone_number" className="block text-sm font-medium text-gray-600">Phone Number</label>
                    <input
                        id="phone_number"
                        name="phone_number"  // Ensure the name attribute matches the backend field
                        type="text"
                        placeholder="Enter your phone number"
                        {...register('phone_number', {  // Use 'phone_number' here too
                            required: 'Phone number is required',
                            pattern: { value: /^[0-9]{10}$/, message: 'Invalid phone number' },
                        })}
                        className="w-full p-3 bg-white outline-none border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                    {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number.message}</p>}  {/* Updated error name */}
                </div>


                <div className="mt-4">
                    <button type="submit" className="w-full py-3 bg-green-500 font-semibold text-white rounded-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                        Save Address
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddAddress;
