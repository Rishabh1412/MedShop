import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import axios from 'axios';

const SearchBox = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [history, setHistory] = useState([]);

    // Fetch search suggestions
    useEffect(() => {
        if (searchQuery.length > 0) {
            axios.get(`http://localhost:5000/search-suggestions?query=${searchQuery}`)
                .then(response => {
                    setSuggestions(response.data.suggestions);
                });
        } else {
            setSuggestions([]);
        }
    }, [searchQuery]);

    // Fetch previous search history (5 items)
    useEffect(() => {
        axios.get('http://localhost:5000/search-history')
            .then(response => {
                setHistory(response.data.history);
            });
    }, []);

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const highlightMatch = (text, query) => {
        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return (
            <span>
                {parts.map((part, i) =>
                    part.toLowerCase() === query.toLowerCase() ? <strong key={i}>{part}</strong> : part
                )}
            </span>
        );
    };

    return (
        <>
            <div className='flex gap-2 mx-3 items-center relative'>
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
                <Button className="px-2 py-2 rounded-lg flex items-center justify-center bg-lime-300/70 hover:scale-105 duration-500 hover:bg-lime-300/70 w-fit" aria-label="Navigate">
                    <svg xmlns="http://www.w3.org/2000/svg" className="hover:transform active:translate-x-5 hover:translate-x-2 duration-300 w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                    </svg>
                </Button>
                <div className="suggestions-box z-10 shadow-md absolute bg-slate-100 rounded-md min min-w-72 left-8 top-12 items-center justify-center">
                    {history.length > 0 ? (
                        <div>
                            <h3>Previous Searches:</h3>
                            <ul>
                                {history.map((item, index) => (
                                    <li key={index}>{highlightMatch(item.search_query, searchQuery)}</li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        searchQuery.length > 0 && (
                            <div>
                                <p className='items-center justify-center text-gray-400 px-3 py-2 text-sm font-semibold w-full'>No previous searches</p>
                            </div>
                        )
                    )}

                    {suggestions.length > 0 && (
                        <div>
                            <h3>Suggestions:</h3>
                            <ul>
                                {suggestions.map((item, index) => (
                                    <li key={index}>{highlightMatch(item.name, searchQuery)}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default SearchBox;
