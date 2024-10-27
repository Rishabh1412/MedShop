import React, { useState } from 'react';
import { Button } from './ui/button';

const Addcart = () => {
    const [quantity, setQuantity] = useState(0);
    const [isCartVisible, setIsCartVisible] = useState(false);

    const handleAddToCart = () => {
        if (quantity === 0) {
            setQuantity(1);
            setIsCartVisible(true);
        }
    };

    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
        else {
            setQuantity(0);
            setIsCartVisible(false);
        }
    };

    return (
        <>
            {/* Add to Cart Button */}
            {!isCartVisible && (
                <Button
                    onClick={handleAddToCart}
                    className="bg-green-500 shadow-sm translate-y-3 justify-center flex w-2/3 left-1/2 hover:shadow-md hover:bg-white hover:text-green-500 -translate-x-1/2 rounded-[7px] text-white font-semibold text-md bottom-0 absolute"
                >
                    
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                        <path d="M1 1.75A.75.75 0 0 1 1.75 1h1.628a1.75 1.75 0 0 1 1.734 1.51L5.18 3a65.25 65.25 0 0 1 13.36 1.412.75.75 0 0 1 .58.875 48.645 48.645 0 0 1-1.618 6.2.75.75 0 0 1-.712.513H6a2.503 2.503 0 0 0-2.292 1.5H17.25a.75.75 0 0 1 0 1.5H2.76a.75.75 0 0 1-.748-.807 4.002 4.002 0 0 1 2.716-3.486L3.626 2.716a.25.25 0 0 0-.248-.216H1.75A.75.75 0 0 1 1 1.75ZM6 17.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM15.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                    </svg>&nbsp; Add

                </Button>
            )}

            {/* Cart Controls */}
            {isCartVisible && (
                <div className="bg-green-50 shadow-sm flex translate-y-3  justify-between rounded-[7px] w-2/3 left-1/2 hover:shadow-md hover:bg-white hover:text-green-400 -translate-x-1/2 text-white font-bold text-md bottom-0 absolute">
                    <Button
                        onClick={decreaseQuantity}
                        className="bg-green-400 text-white flex items-center rounded-[7px] justify-center px-2 py-0"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                            <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
                        </svg>
                    </Button>
                    <p className="font-semibold items-center flex justify-center text-green-400">{quantity}</p>
                    <Button
                        onClick={increaseQuantity}
                        className="bg-green-400 text-white flex items-center rounded-[7px] justify-center p-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                            <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                        </svg>
                    </Button>
                </div>
            )}
        </>
    );
};

export default Addcart;
