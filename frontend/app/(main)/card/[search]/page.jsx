'use client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Skeleton } from '@/components/ui/skeleton'; // Adjust import based on your installation
import SearchCard from '@/components/Searchcard'; // Corrected component name casing
import SearchBox from '@/components/SearchBox';

const Card = () => {
  const params = useParams();
  const [results, setResults] = useState({ shops: [], medicines: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://localhost:5000/fetchdata?query=${params.search}`,{
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setResults(response.data);
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    if (params.search) {
      fetchData();
    }
  }, [params.search]);

  if (loading) return <LoadingSkeleton />; // Use the skeleton component while loading
  if (error) return <div>{error}</div>;
  const decodedSearchTerm = decodeURIComponent(params.search);

  return (
    <div className="bg-gray-50 max-h-screen overflow-y-auto shadow-inner">
      <div className='pt-4 pb-3 bg-white px-2 lg:px-4 shadow-md lg:border-b lg:shadow-none'>
        <SearchBox/>
      </div>
      
      <div className='p-4'>
      <div className="">
          <h1 className='font-semibold pb-2 text-neutral-700'>Results for &quot;{decodedSearchTerm}&quot;.</h1>

        {results.shops.length > 0 && (
          <div>
            <h2 className="text-lg font-bold pb-2">Shops</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {results.shops.map((shop) => (
                <SearchCard key={shop.id} data={shop} />
              ))}
            </div>
          </div>
        )}

        {results.medicines.length > 0 && (
          <div className="pt-3">
            <h2 className="text-lg font-bold pb-2">Medicines</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {results.medicines.map((medicine) => (
                <SearchCard key={medicine.id} data={medicine} />
              ))}
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

// Skeleton loading component
const LoadingSkeleton = () => (
  <div className="bg-gray-100 w-full py-4 mb-5 flex flex-col p-3 h-screen">
    <div className="flex items-center justify-center py-4 mb-5">
      <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-blue-500 border-t-transparent" role="status">
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className="h-32 w-full rounded-lg mb-4" />
      ))}
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className="h-32 w-full rounded-lg mb-4" />
      ))}
    </div>
  </div>
);

export default Card;
