import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SearchBox = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [history, setHistory] = useState([]);
    const router = useRouter();

    // Fetch search suggestions with headers
    useEffect(() => {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        if (searchQuery.length > 0) {
            axios.get(`http://localhost:5000/search/search-suggestions?query=${searchQuery}`, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Add the token to the headers
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    setSuggestions(response.data.suggestions);
                })
                .catch(error => {
                    console.error('Error fetching suggestions:', error);
                });
        } else {
            setSuggestions([]);
        }
    }, [searchQuery]);

    // Fetch previous search history with headers
    useEffect(() => {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        axios.get('http://localhost:5000/search/search-history', {
            headers: {
                'Authorization': `Bearer ${token}`, // Add the token to the headers
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                setHistory(response.data.history);
            })
            .catch(error => {
                console.log('Error fetching search history:', error);
            });
    }, []);

    // Handle form submission
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim() !== '') {
            router.push(`/card/${searchQuery}`);
        }
    };

    // Handle input changes
    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Handle clicks on suggestions or history items
    const handleItemClick = (value) => {
        setSearchQuery(value);
    };

    const highlightMatch = (text, query) => {
        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return (
            <span>
                {parts.map((part, i) =>
                    part.toLowerCase() === query.toLowerCase() ? <strong className='font-semibold' key={i}>{part}</strong> : part
                )}
            </span>
        );
    };

    return (
        <form onSubmit={handleSearchSubmit} className='flex gap-2 mx-3 items-center relative'>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                </svg>
            </div>
            <input
                type="text"
                className="px-5 py-2 rounded-lg bg-gray-200/70 w-full focus:outline-none focus:ring-1 focus:ring-green-600"
                placeholder="Search for medicine or pharmacies..."
                value={searchQuery}
                onChange={handleInputChange}
            />
            <Button type="submit" className="px-2 py-2 rounded-lg flex items-center justify-center bg-lime-300/70 hover:scale-105 duration-500 hover:bg-lime-300/70 w-fit" aria-label="Navigate">
                <svg xmlns="http://www.w3.org/2000/svg" className="hover:transform active:translate-x-5 hover:translate-x-2 duration-300 w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                </svg>
            </Button>
            <div className="suggestions-box z-30 shadow-md absolute bg-[#f5f5f5] rounded-md min-w-72 flex-col left-8 top-12 items-center justify-center">
                {history.length > 0 && (
                    <div className='px-2 lg:px-4 '>
                        <h3>Previous Searches:</h3>
                        <ul className='py-2 px-3'>
                            {history.map((item, index) => (
                                <li key={index} onClick={() => handleItemClick(item.search_query)} className="cursor-pointer">
                                    {highlightMatch(item.search_query, searchQuery)}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {suggestions.length > 0 && (
                    <div className='px-2 lg:px-4 py-2'>
                        <h3 className='font-semibold'>Suggestions:</h3>
                        <ul className='py-2'>
                            {suggestions.map((item, index) => (
                                <li key={index} onClick={() => handleItemClick(item.name)} className="cursor-pointer py-1 px-3 hover:bg-black/10 hover:rounded-sm flex justify-start items-center">
                                    {highlightMatch(item.name, searchQuery)}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </form>
    );
};

export default SearchBox;
