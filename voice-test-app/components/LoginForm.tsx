'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('demo');
  const [password, setPassword] = useState('demo');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'demo' && password === 'demo') {
      setLoginSuccess(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-cyan-300 to-indigo-300 font-sans">
      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Welcome Back</h2>

        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-1">Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold text-gray-700 mb-1">Password:</label>
          <input
            type="password"
            value={password}
            id='password'
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          id='loginBtn'
          className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition"
        >
          Login
        </button>

        {loginSuccess && (
          <p className="text-green-600 text-center mt-4">Login successful! Redirecting...</p>
        )}
      </form>
    </div>
  );
}
