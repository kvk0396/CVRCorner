/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../url';
import api from '../utils/api';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpRequired, setIsOtpRequired] = useState(true);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Function to send OTP
  const handleSendOtp = async () => {
    // Validate email format for @cvr.ac.in domain
    const emailPattern = /^[0-9]{2}[Bb][8][1][Aa][0-9A-Za-z]{4}@cvr.ac.in$/;
    if (!emailPattern.test(email)) {
      setError('Invalid CVR email address');
      return;
    }

    try {
      const resp = await api.post(`/auth/sendotp`, { email });

      setIsOtpSent(true);
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'Error sending OTP');
    }
  };

  // Function to verify OTP
  const handleVerifyOtp = async () => {
    try {
      await api.post(`/auth/verifyotp`, { email, otp });
      
      setIsOtpVerified(true);
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid or expired OTP');
    }
  };

  // Handle form submission for signup
  const handleSignUp = async (event) => {
    event.preventDefault();

    if (!isOtpVerified) {
      return setError('Please verify your OTP before signing up');
    }

    // Additional validations for roll number, password length, and password match
    const rollNoPattern = /^[0-9]{2}[Bb][8][1][Aa][0-9A-Za-z]{4}$/i;
    if (!rollNoPattern.test(rollNo)) {
      setError('Invalid roll number');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await api.post(`/auth/register`, { username, rollNo, email, password });
      console.log(res.data);
      setError('');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data || 'Error occurred while registering');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black to-blue-900 p-4 sm:p-6 lg:p-8">
      <div className="bg-gradient-to-r from-black to-blue-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Create Account</h2>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your email"
            />
            <button
              type="button"
              onClick={handleSendOtp}
              className="mt-2 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
              disabled={isOtpSent}
            >
              {isOtpSent ? 'OTP Sent' : 'Send OTP'}
            </button>
          </div>

          {isOtpSent && (
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="otp">Enter OTP</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
                placeholder="Enter OTP"
              />
              <button
                type="button"
                onClick={handleVerifyOtp}
                className="mt-2 bg-green-600 hover:bg-green-800 text-white font-bold py-1 px-2 rounded"
              >
                Verify OTP
              </button>
            </div>
          )}

          {isOtpVerified && (
            <>
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter your username"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="rollNo">Roll No</label>
                <input
                  type="text"
                  id="rollNo"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter your roll number"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter your password"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
                  placeholder="Confirm your password"
                />
              </div>
            </>
          )}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
              disabled={!isOtpVerified}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
