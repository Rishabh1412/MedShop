import React, { useState, useEffect } from 'react';
import ShopCard from './ShopCard';
import { Skeleton } from "@/components/ui/skeleton";
import axios from 'axios';

const Shops = () => {
    const [shopData, setShopData] = useState([]);
    const [loading, setLoading] = useState(true);

    // useEffect to fetch shop data from API
    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchShops = async () => {
            try {
                const response = await axios.get("http://localhost:5000/shops", {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                console.log(response.data); // Check the structure of the response
                setShopData(response.data); // If the data comes as {shops: [...]}
                setLoading(false); // Stop loading after data is fetched
            } catch (error) {
                console.error('Error fetching shops:', error.response ? error.response.data : error.message);
                setLoading(false); // Stop loading even if there is an error
            }
        };

        fetchShops();
    }, []);

 // The empty dependency array ensures this effect runs only once when the component mounts

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 font-sans gap-4">
            {loading ? (
                // Show skeleton loaders while data is loading
                [...Array(4)].map((_, index) => (
                    <div key={index} className="flex flex-col space-y-3">
                        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                    </div>
                ))
            ) : (
                // Render the ShopCard components once data is loaded
                shopData.map((shop) => (
                    <ShopCard key={shop.id} shop={shop} />
                ))
            )}
        </div>
    );
};

export default Shops;
