'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';

import withGuest from '@/lib/withGuest';

const RegisterPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await register({ fullName, email, phone, password });
      if (response?.success) {
        router.push(`/verify-otp?email=${email}`);
      } else {
        setError('Invalid registration details');
      }
    } catch (err: any) {
      if (Array.isArray(err.message)) {
        setError(err.message.join(', '));
      } else {
        setError(err.message || 'An error occurred during registration.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 bg-grid-pattern">
      <div className="p-12 bg-white rounded-xl shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="fullName" className="block mb-2 text-lg font-semibold text-gray-700">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-lg font-semibold text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="phone" className="block mb-2 text-lg font-semibold text-gray-700">Phone</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-lg font-semibold text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
          {error && <p className="text-red-600 mb-4 text-center font-medium">{error}</p>}
          <button type="submit" className="w-full py-3 bg-blue-700 text-white rounded-lg text-lg font-bold cursor:pointer hover:bg-blue-800 transition duration-300">Register</button>
        </form>
      </div>
    </div>
  );
};

export default withGuest(RegisterPage);
