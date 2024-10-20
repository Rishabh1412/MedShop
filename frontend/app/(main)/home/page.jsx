'use client';
import { Location } from '@/components/Location';
import Medicines from '@/components/Medicines';
import SearchBox from '@/components/SearchBox';
import Shops from '@/components/Shops';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton'; 

export default function HomePage() {
    const router = useRouter();
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [meds, setMeds] = useState([]);  // Medicines state
    const [loading, setLoading] = useState(true);  // Loading state for medicines

    // Fetch random 10 medicines
    useEffect(() => {
        const fetchMeds = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/display-meds', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setMeds(data || []); // Set medicines data from API
                } else {
                    throw new Error('Failed to fetch medicines.');
                }
            } catch (err) {
                console.error('Error fetching medicines:', err);
            } finally {
                setLoading(false); // End loading state
            }
        };

        fetchMeds();
    }, [router]);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');

            const res = await fetch('http://localhost:5000/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (res.status === 200) {
                localStorage.removeItem('token'); // Clear token from local storage
                router.push('/login'); // Redirect to login page
            } else {
                setError('Logout failed. Please try again.');
            }
        } catch (err) {
            setError('An error occurred.');
        }
    };

    return (
        <>
            <div className="min-h-full max-h-screen w-full overflow-y-auto bg-gray-100 rounded-r-none lg:rounded-2xl p-0 m-0">
                <div className="max-w-full bg-white h-1/5 m-0 lg:m-2 lg:rounded-t-md sm:rounded-none rounded-b-md">
                    <div className="flex flex-col lg:flex-row lg:space-y-0 space-y-3 lg:gap-4 items-center justify-between w-full">
                        {/* Location Component */}
                        <div className="w-full py-4 px-4 rounded-b-md lg:rounded-md shadow-[0px_4px_10px_rgba(0,0,0,0.3)] text-gray-900 bg-[#C3FF93] lg:w-1/2">
                            <Location />
                        </div>

                        {/* SearchBox Component */}
                        <div className="w-full py-4 lg:w-1/2">
                            <SearchBox />
                        </div>
                    </div>
                </div>

                <div className='max-w-full h-4/5 bg-white lg:m-3 mt-3 lg:pb-0 pb-24 rounded-md py-4 lg:px-4 px-2'>
                    <p className='text-sm font-semibold text-neutral-700 tracking-[3px] px-2 flex items-center mb-4'>
                        TOP RATED NEAR YOU
                        <span className='flex-grow border-b border-neutral-300 ml-2'></span>
                    </p>

                    <Shops />

                    <p className='text-sm font-semibold text-neutral-700 tracking-[3px] px-2 flex mt-2 items-center mb-4'>
                        MEDICINES
                        <span className='flex-grow border-b border-neutral-300 ml-2'></span>
                    </p>

                    {loading ? (
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                            {/* Skeletons for loading state */}
                            {[...Array(10)].map((_, index) => (
                                <div key={index} className="p-4 border rounded shadow">
                                    <Skeleton className="w-full h-32 mb-4" />
                                    <Skeleton className="w-3/4 h-6 mb-2" />
                                    <Skeleton className="w-1/2 h-6" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <Medicines medicine_data={meds} />
                    )}
                </div>
            </div>
        </>
    );
}
