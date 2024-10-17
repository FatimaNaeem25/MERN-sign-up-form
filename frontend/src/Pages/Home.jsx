import React, { useState } from 'react';
import Logo from '../assets/Images/newlogo.jpg';
import { IoLogoGoogle } from "react-icons/io";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5"; // Import eye icons
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // Validate first and last names
    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(formData.firstName) || !nameRegex.test(formData.lastName)) {
      setError("First and last names can only contain letters.");
      return;
    }

    // Validate email
    if (!formData.email.includes('@')) {
      setError("Email must contain '@' sign.");
      return;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/api/contactuser', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });
      console.log('User created:', response.data);
      setMessage('User registered successfully!');
      setFormData({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
    } catch (error) {
      console.error('Error creating user:', error);
      setError('Error creating user: ' + error.response?.data?.error || 'Please try again.');
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen w-screen overflow-hidden"
      style={{ backgroundImage: `url(${Logo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className='flex flex-col w-full max-w-md mx-4'>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-6 bg-white bg-opacity-10 rounded-lg shadow-2xl">
          <div className='flex flex-row'>
            <input
              name="firstName" 
              value={formData.firstName} 
              onChange={handleChange} 
              required
              type='text' 
              placeholder='First Name' 
              className="p-2 rounded mr-3 bg-transparent border border-gray-500 placeholder-gray-300 shadow-sm text-gray-300 w-full"
            />
            <input 
              type='text' 
              name="lastName" 
              value={formData.lastName} 
              onChange={handleChange} 
              required
              placeholder='Last Name' 
              className="p-2 rounded bg-transparent border border-gray-500 placeholder-gray-300 shadow-sm text-gray-300 w-full"
            />
          </div>
          <input 
            type='text' 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required
            placeholder='Enter your Email' 
            className="p-2 rounded bg-transparent border border-gray-500 placeholder-gray-300 shadow-sm text-gray-300 w-full"
          />
          <div className='flex flex-col relative'>
            <input 
              type={showPassword ? 'text' : 'password'} 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              required
              placeholder='Enter Password' 
              className="p-2 pr-10 rounded bg-transparent border border-gray-500 placeholder-gray-300 shadow-sm text-gray-300 w-full"
            />
            <div 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEyeOffOutline className="text-gray-300" /> : <IoEyeOutline className="text-gray-300" />}
            </div>
          </div>
          <div className='flex flex-col relative'>
            <input 
              type={showConfirmPassword ? 'text' : 'password'} 
              name="confirmPassword" 
              value={formData.confirmPassword} 
              onChange={handleChange} 
              required
              placeholder='Confirm Password' 
              className="p-2 pr-10 rounded bg-transparent border border-gray-500 placeholder-gray-300 shadow-sm text-gray-300 w-full"
            />
            <div 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-300"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <IoEyeOffOutline className="text-gray-300" /> : <IoEyeOutline className="text-gray-300" />}
            </div>
          </div>
          <button type="submit" className='text-gray-300 text-[18px] bg-blue-400 p-2 rounded shadow-sm'>
            Sign Up
          </button>
          <div className='flex items-center'>
            <hr className='flex-grow border-gray-500' />
            <h3 className='mx-2 text-gray-500'>or</h3>
            <hr className='flex-grow border-gray-500' />
          </div>
          <button className='text-gray-300 text-[18px] p-2 rounded bg-transparent flex items-center justify-center shadow-sm'>
            <IoLogoGoogle className='mr-1' />Sign Up with Google
          </button>
        </form>
        {message && <div style={{ color: 'green' }}>{message}</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <h3 className='text-gray-300 mt-4 text-center'>
          Already have an Account? 
          <Link to="/login" className='text-white underline decoration-blue-300 ml-1'>Log-In</Link>
        </h3>
      </div>
    </div>
  );
}

export default Home;
