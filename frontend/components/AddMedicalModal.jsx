'use client'
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const AddMedicineModal = ({ onClose, onMedicineAdded }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);

    // Fetch JWT token from local storage (or cookie)
    const token = localStorage.getItem('token');
    console.log(token); // Adjust this depending on where you store your token

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/shop/medicines',
                { ...data },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send JWT token in the Authorization header
                    }
                });

            if (response.status === 201) {
                onMedicineAdded(response.data.medicine);  // Update the medicine list
                reset();
                onClose();  // Close the modal
            } else {
                console.error("Error adding medicine", response);
            }
        } catch (error) {
            console.error("Failed to add medicine", error);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = (event) => {
        event.preventDefault(); // Prevent default behavior
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md z-50 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Add Medicine</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block mb-1 font-medium">Medicine Name</label>
                        <input
                            type="text"
                            id="name"
                            {...register('name', { required: true })}
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                        {errors.name && <span className="text-red-500">This field is required</span>}
                    </div>

                    <div>
                        <label htmlFor="quantity" className="block mb-1 font-medium">Quantity</label>
                        <input
                            type="number"
                            id="quantity"
                            {...register('quantity', { required: true, min: 1 })}
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                        {errors.quantity && <span className="text-red-500">Quantity must be at least 1</span>}
                    </div>

                    <div>
                        <label htmlFor="price" className="block mb-1 font-medium">Price</label>
                        <input
                            type="number"
                            id="price"
                            {...register('price', { required: true, min: 0 })} // Changed to 'price'
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                        {errors.price && <span className="text-red-500">Price must be at least 0</span>}
                    </div>

                    <div>
                        <label htmlFor="description" className="block mb-1 font-medium">Description</label>
                        <textarea
                            id="description"
                            {...register('description')}
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>

                    <div>
                        <label htmlFor="image" className="block mb-1 font-medium">Image URL</label>
                        <input
                            type="url"
                            id="image"
                            {...register('image', { pattern: { value: /^(ftp|http|https):\/\/[^ "]+$/, message: 'Invalid URL format' } })} // URL validation
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                        {errors.image && <span className="text-red-500">{errors.image.message}</span>}
                    </div>

                    <div className='justify-between flex'>
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
                            disabled={loading}
                        >
                            {loading ? 'Adding...' : 'Add Medicine'}
                        </button>
                        <button className="mt-4 text-gray-500 pr-3" onClick={handleClose}>
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMedicineModal;
