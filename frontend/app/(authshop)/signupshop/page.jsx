'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupShopPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [shopName, setShopName] = useState('');
    const [location, setLocation] = useState('');
    const [pincode, setPincode] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:5000/register-shopkeeper', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password, shop_name: shopName, location, pincode, city, state }),
        });
        const data = await res.json();

        if (res.status === 201) {
            router.push('/loginshop');
        } else {
            setError(data.message || 'Signup failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 flex justify-center items-center p-4">
            <div className="max-w-lg w-full bg-gray-800 p-8 rounded-xl shadow-lg">
                <div className="flex flex-col space-y-4">
                    <h2 className="text-3xl font-semibold text-center text-white">Shopkeeper Signup</h2>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                    <form onSubmit={handleSignup} className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-300">Username</label>
                            <input
                                type="text"
                                id="username"
                                placeholder="Enter your username"
                                className="w-full px-4 py-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-white focus:ring-2 focus:ring-blue-300"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-white focus:ring-2 focus:ring-blue-300"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-white focus:ring-2 focus:ring-blue-300"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {/* Shop Details */}
                        <div>
                            <label htmlFor="shopName" className="block text-sm font-medium text-gray-300">Shop Name</label>
                            <input
                                type="text"
                                id="shopName"
                                placeholder="Enter shop name"
                                className="w-full px-4 py-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-white focus:ring-2 focus:ring-blue-300"
                                value={shopName}
                                onChange={(e) => setShopName(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-300">Location</label>
                            <input
                                type="text"
                                id="location"
                                placeholder="Enter shop location"
                                className="w-full px-4 py-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-white focus:ring-2 focus:ring-blue-300"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="pincode" className="block text-sm font-medium text-gray-300">Pincode</label>
                            <input
                                type="text"
                                id="pincode"
                                placeholder="Enter pincode"
                                className="w-full px-4 py-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-white focus:ring-2 focus:ring-blue-300"
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-300">City</label>
                            <input
                                type="text"
                                id="city"
                                placeholder="Enter city"
                                className="w-full px-4 py-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-white focus:ring-2 focus:ring-blue-300"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="state" className="block text-sm font-medium text-gray-300">State</label>
                            <input
                                type="text"
                                id="state"
                                placeholder="Enter state"
                                className="w-full px-4 py-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-white focus:ring-2 focus:ring-blue-300"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                            >
                                Signup
                            </button>
                        </div>
                    </form>

                    <div className="flex justify-between items-center mt-4">
                        <div className="text-sm">
                            <Link href="/loginshop" className="text-blue-500 hover:text-blue-700">
                                Already have an account? Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
