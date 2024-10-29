import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';

const Addcart = ({ medicineId }) => {
    const [quantity, setQuantity] = useState(0);
    const [isCartVisible, setIsCartVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    // Fetch initial cart data for this item
    useEffect(() => {
        const fetchCartData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`http://localhost:5000/cart/cart-items/${medicineId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    
                });
                if (response.ok){
                    const data = await response.json();
                    if (data.quantity > 0) {
                        setQuantity(data.quantity);
                        setIsCartVisible(true);
                    }
                }
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };

        fetchCartData();
    }, [medicineId]);

    // Call API to add item to cart
    const handleAddToCart = async () => {
        const token = localStorage.getItem('token');
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/cart/cart-items/add', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ medicine_id: medicineId, quantity: 1 }),
            });

            if (response.ok) {
                setQuantity(1);
                setIsCartVisible(true);
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        } finally {
            setLoading(false);
        }
    };

    // Call API to increase quantity
    const increaseQuantity = async () => {
        const token = localStorage.getItem('token');
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/cart/cart-items/increment', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ medicine_id: medicineId }),
            });

            if (response.ok) {
                setQuantity(quantity + 1);
            }
        } catch (error) {
            console.error('Error increasing quantity:', error);
        } finally {
            setLoading(false);
        }
    };

    // Call API to decrease quantity or remove from cart if quantity is 1
    const decreaseQuantity = async () => {
        const token = localStorage.getItem('token');
        setLoading(true);
        try {
            if (quantity === 1) {
                const response = await fetch('http://localhost:5000/cart/cart-items/remove', {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ medicine_id: medicineId }),
                });

                if (response.ok) {
                    setQuantity(0);
                    setIsCartVisible(false);
                }
            } else {
                const response = await fetch('http://localhost:5000/cart/cart-items/decrement', {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ medicine_id: medicineId }),
                });

                if (response.ok) {
                    setQuantity(quantity - 1);
                }
            }
        } catch (error) {
            console.error('Error decreasing quantity:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Add to Cart Button */}
            {!isCartVisible && (
                <Button
                    onClick={handleAddToCart}
                    disabled={loading}
                    className="bg-green-500 shadow-sm translate-y-3 justify-center flex w-2/3 left-1/2 hover:shadow-md hover:bg-white hover:text-green-500 -translate-x-1/2 rounded-[7px] text-white font-semibold text-md bottom-0 absolute"
                >
                    {loading ? (
                        <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                <path d="M1 1.75A.75.75 0 0 1 1.75 1h1.628a1.75 1.75 0 0 1 1.734 1.51L5.18 3a65.25 65.25 0 0 1 13.36 1.412.75.75 0 0 1 .58.875 48.645 48.645 0 0 1-1.618 6.2.75.75 0 0 1-.712.513H6a2.503 2.503 0 0 0-2.292 1.5H17.25a.75.75 0 0 1 0 1.5H2.76a.75.75 0 0 1-.748-.807 4.002 4.002 0 0 1 2.716-3.486L3.626 2.716a.25.25 0 0 0-.248-.216H1.75A.75.75 0 0 1 1 1.75ZM6 17.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM15.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                            </svg>
                            &nbsp; Add
                        </>
                    )}
                </Button>
            )}

            {/* Cart Controls */}
            {isCartVisible && (
                <div className="bg-green-50 shadow-sm flex translate-y-3 justify-between rounded-[7px] w-2/3 left-1/2 hover:shadow-md hover:bg-white hover:text-green-400 -translate-x-1/2 text-white font-bold text-md bottom-0 absolute">
                    <Button
                        onClick={decreaseQuantity}
                        disabled={loading}
                        className="bg-green-400 text-white flex items-center rounded-[7px] justify-center px-2 py-0"
                    >
                        {loading ? (
                            <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                                <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
                            </svg>
                        )}
                    </Button>
                    <p className="font-semibold items-center flex justify-center text-green-400">{quantity}</p>
                    <Button
                        onClick={increaseQuantity}
                        disabled={loading}
                        className="bg-green-400 text-white flex items-center rounded-[7px] justify-center p-2"
                    >
                        {loading ? (
                            <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                                <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                            </svg>
                        )}
                    </Button>
                </div>
            )}
        </>
    );
};

export default Addcart;