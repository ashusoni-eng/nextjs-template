'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { useRouter, useSearchParams } from 'next/navigation';

import withGuest from '@/lib/withGuest';

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { verifyOtp } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const emailFromQuery = searchParams.get('email');
    if (emailFromQuery) {
      setEmail(emailFromQuery);
    } else {
      setError('Email not found in query parameters.');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await verifyOtp({ email, otp });
      if (response?.success) {
        setSuccess(response.message);
      } else {
        setError('Invalid OTP or an error occurred.');
      }
    } catch (err: any) {
      if (Array.isArray(err.message)) {
        setError(err.message.join(', '));
      } else {
        setError(err.message || 'An error occurred during OTP verification.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 bg-grid-pattern">
      <div className="p-12 bg-white rounded-xl shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">Verify OTP</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="otp" className="block mb-2 text-lg font-semibold text-gray-700">OTP</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
          {error && <p className="text-red-600 mb-4 text-center font-medium">{error}</p>}
          {success && <p className="text-green-600 mb-4 text-center font-medium">{success}</p>}
          <button type="submit" className="w-full py-3 bg-blue-700 text-white rounded-lg text-lg font-bold cursor:pointer hover:bg-blue-800 transition duration-300">Verify</button>
        </form>
      </div>
    </div>
  );
};

export default withGuest(VerifyOtpPage);
