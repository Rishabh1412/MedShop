import React from 'react';
import ShopCard from './ShopCard';
import { Skeleton } from "@/components/ui/skeleton"



const Shops = () => {
    const shop_data = [
        {
            shop_id: 1,
            name: "HealthPlus Pharmacy",
            location: "New Delhi",
            rating: 4.5,
            contact: "+91-9876543210",
            timings: "9:00 AM - 9:00 PM",
            address: "123, Connaught Place, New Delhi",
            medicines: ["Paracetamol", "Ibuprofen", "Cetirizine"],
            delivery_time: "30-45 mins",
            important: '1'
        },
        {
            shop_id: 2,
            name: "CityCare Medical Store",
            location: "Mumbai",
            rating: 4.2,
            contact: "+91-9876543211",
            timings: "8:00 AM - 10:00 PM",
            address: "45, Andheri West, Mumbai",
            medicines: ["Amoxicillin", "Metformin", "Atorvastatin"],
            delivery_time: "40-60 mins",
            important: '1'
        },
        {
            shop_id: 3,
            name: "Wellness Medicos",
            location: "Bengaluru",
            rating: 4.8,
            contact: "+91-9876543212",
            timings: "8:00 AM - 11:00 PM",
            address: "78, MG Road, Bengaluru",
            medicines: ["Azithromycin", "Loratadine", "Omeprazole"],
            delivery_time: "20-35 mins",
            important: '1'
        },
        {
            shop_id: 4,
            name: "Medico Mart",
            location: "Kolkata",
            rating: 4.1,
            contact: "+91-9876543213",
            timings: "9:00 AM - 8:00 PM",
            address: "11, Park Street, Kolkata",
            medicines: ["Aspirin", "Amoxicillin", "Cetirizine"],
            delivery_time: "45-60 mins",
            important: '1'
        },
        {
            shop_id: 5,
            name: "Carewell Pharmacy",
            location: "Chennai",
            rating: 4.3,
            contact: "+91-9876543214",
            timings: "7:00 AM - 10:00 PM",
            address: "99, T Nagar, Chennai",
            medicines: ["Ibuprofen", "Paracetamol", "Metformin"],
            delivery_time: "25-40 mins",
            important: '1'
        },
        {
            shop_id: 6,
            name: "Greenlife Pharmacy",
            location: "Hyderabad",
            rating: 4.6,
            contact: "+91-9876543215",
            timings: "10:00 AM - 8:00 PM",
            address: "23, Banjara Hills, Hyderabad",
            medicines: ["Azithromycin", "Atorvastatin", "Omeprazole"],
            delivery_time: "30-50 mins",
            important: '1'
        },
        {
            shop_id: 7,
            name: "Lifeline Medical Store",
            location: "Pune",
            rating: 4.4,
            contact: "+91-9876543216",
            timings: "6:00 AM - 9:00 PM",
            address: "56, Koregaon Park, Pune",
            medicines: ["Paracetamol", "Aspirin", "Loratadine"],
            delivery_time: "20-30 mins",
            important: '0'
        },
        {
            shop_id: 8,
            name: "Apollo Pharmacy",
            location: "Ahmedabad",
            rating: 4.7,
            contact: "+91-9876543217",
            timings: "8:00 AM - 11:00 PM",
            address: "89, SG Highway, Ahmedabad",
            medicines: ["Amoxicillin", "Cetirizine", "Atorvastatin"],
            delivery_time: "30-45 mins",
            important: '1'
        },
        {
            shop_id: 9,
            name: "Sunshine Medicals",
            location: "Jaipur",
            rating: 4.5,
            contact: "+91-9876543218",
            timings: "9:00 AM - 9:00 PM",
            address: "102, MI Road, Jaipur",
            medicines: ["Metformin", "Aspirin", "Loratadine"],
            delivery_time: "25-40 mins",
            important: '0'
        },
        {
            shop_id: 10,
            name: "TrustCare Pharmacy",
            location: "Lucknow",
            rating: 4.3,
            contact: "+91-9876543219",
            timings: "7:00 AM - 10:00 PM",
            address: "76, Hazratganj, Lucknow",
            medicines: ["Ibuprofen", "Azithromycin", "Omeprazole"],
            delivery_time: "30-45 mins",
            important: '0'
        }
    ];
    const loading=false;
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 font-snas gap-4">
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
                shop_data.map((shop) => (
                    <ShopCard key={shop.shop_id} shop={shop} />
                ))
            )}
        </div>
    );
};

export default Shops;
