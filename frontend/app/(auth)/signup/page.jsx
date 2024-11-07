'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


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
        <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 flex justify-center items-center p-4">
            <div className="max-w-lg w-full bg-gray-800 p-8 rounded-xl shadow-lg">
                <div className="flex flex-col space-y-4">
                    <h2 className="text-3xl font-semibold text-center text-white">Signup</h2>
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

                        <div>
                            <button
                                type="submit"
                                className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none"
                            >
                                Signup
                            </button>
                        </div>
                    </form>

                    <div className="flex justify-between items-center mt-4">
                        <div className="text-sm">
                            <Link href="/login" className="text-blue-500 hover:text-blue-700">
                                Already have an account? Login
                            </Link>
                        </div>
                    </div>

                    <div className="mt-6 relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-600"></span>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase text-gray-500">
                            <span className="bg-gray-800 px-2">Or continue with</span>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-4">
                        <button className="flex items-center justify-center gap-2 w-full border border-gray-600 rounded-md px-4 py-2 hover:bg-gray-700">
                            <svg viewBox="0 0 438.549 438.549" className="h-4 w-4 text-white">
                                <path
                                    fill="currentColor"
                                    d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.557 35.781 22.557 58.817 0 16.178-1.951 30.452-5.852 42.826-3.899 12.369-8.897 22.366-14.985 29.98-6.089 7.61-13.75 13.99-22.985 19.126-9.233 5.144-18.186 8.854-26.834 11.14-8.663 2.286-18.416 3.998-29.264 5.14-5.679 6.851-10.842 17.547-13.99 29.411-1.998 1.903-2.342 4.322-2.351 5.731 0 1.14-.143 2.828 2.288 3.742 3.271-.048 7.167-1.047 11.424-2.565z"
                                />
                            </svg>
                            <span className='text-white'>Google</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
