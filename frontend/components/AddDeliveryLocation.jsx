import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';

const AddDeliveryLocation = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            const token=localStorage.getItem('token');

            const response = await fetch('http://localhost:5000/add_delivery_location', {
                method: 'POST',
                headers: {
                    'Authorization':`Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...data, user_id: 1 }), // Replace with actual user_id
            });

            if (response.ok) {
                alert('Delivery location added successfully!');
                reset(); // Clear the form after successful submission
            }
        } catch (error) {
            console.error('Error adding delivery location:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded shadow-md">
            <h2 className="text-lg font-semibold mb-3">Add Delivery Location</h2>

            <input
                type="text"
                placeholder="Address"
                {...register('address', { required: 'Address is required' })}
                className="w-full mb-2 p-2 border rounded"
            />
            {errors.address && <p className="text-red-500">{errors.address.message}</p>}

            <input
                type="text"
                placeholder="City"
                {...register('city', { required: 'City is required' })}
                className="w-full mb-2 p-2 border rounded"
            />
            {errors.city && <p className="text-red-500">{errors.city.message}</p>}

            <input
                type="text"
                placeholder="State"
                {...register('state', { required: 'State is required' })}
                className="w-full mb-2 p-2 border rounded"
            />
            {errors.state && <p className="text-red-500">{errors.state.message}</p>}

            <input
                type="text"
                placeholder="Pincode"
                {...register('pincode', {
                    required: 'Pincode is required',
                    pattern: {
                        value: /^[0-9]{5,6}$/,
                        message: 'Pincode must be a valid 5-6 digit number',
                    },
                })}
                className="w-full mb-2 p-2 border rounded"
            />
            {errors.pincode && <p className="text-red-500">{errors.pincode.message}</p>}

            <input
                type="text"
                placeholder="Phone Number"
                {...register('phone_number', {
                    required: 'Phone number is required',
                    pattern: {
                        value: /^[0-9]{10}$/,
                        message: 'Phone number must be a 10-digit number',
                    },
                })}
                className="w-full mb-2 p-2 border rounded"
            />
            {errors.phone_number && <p className="text-red-500">{errors.phone_number.message}</p>}

            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-2">
                Add Location
            </button>
        </form>
    );
};

export default AddDeliveryLocation;
