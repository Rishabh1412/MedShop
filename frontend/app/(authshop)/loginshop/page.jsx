'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginShopPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:5000/login-shopkeeper', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        const data = await res.json();

        if (res.status === 200) {
            localStorage.setItem('token', data.access_token);
            router.push('/inventory');
        } else {
            setError(data.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 flex justify-center items-center p-4">
            <div className="max-w-lg w-full bg-gray-800 p-8 rounded-xl shadow-lg">
                <div className="flex flex-col space-y-4">
                    <h2 className="text-3xl font-semibold text-center text-white">Shopkeeper Login</h2>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                    <form onSubmit={handleLogin} className="space-y-4">
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

                        <div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                            >
                                Login
                            </button>
                        </div>
                    </form>

                    <div className="flex justify-between items-center mt-4">
                        <div className="text-sm">
                            <Link href="/signupshop" className="text-blue-500 hover:text-blue-700">
                                Don&apos;t have an account? Signup
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
