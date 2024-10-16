'use client'; // Add this at the top to mark the component as a client-side component

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation for useRouter in App directory

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter(); // Hook now works in client components

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        const data = await res.json();

        if (res.status === 200) {
            localStorage.setItem('token', data.access_token);
            router.push('/home'); // Redirect after login
        } else {
            setError(data.message);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    className="w-full px-4 py-2 border rounded-lg mb-4"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 border rounded-lg mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Login
                </button>
            </form>
        </div>
    );
}
