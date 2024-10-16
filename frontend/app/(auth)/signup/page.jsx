'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
        });
        const data = await res.json();

        if (res.status === 201) {
            router.push('/login');
        } else {
            setError(data.message || 'Signup failed. Please try again.');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Signup</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSignup}>
                <input
                    type="text"
                    placeholder="Username"
                    className="w-full px-4 py-2 border rounded-lg mb-4"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 border rounded-lg mb-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 border rounded-lg mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    Signup
                </button>
            </form>
        </div>
    );
}
