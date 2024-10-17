import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/Images/newlogo.jpg';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5001/api/login', {
        email,
        password,
      });

      if (response.data.success) {
        setMessage('Login successful!');
        navigate('/dashboard'); // Use navigate to go to the dashboard
      } else {
        setError('Invalid email or password.');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.response) {
        if (err.response.status === 404) {
          setError('No account found with that email.');
        } else if (err.response.status === 401) {
          setError('Invalid email or password.');
        } else {
          setError('An unexpected error occurred.');
        }
      } else {
        setError('Network error. Please try again later.');
      }
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen w-screen overflow-hidden"
      style={{ backgroundImage: `url(${Logo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className='flex flex-col w-full max-w-md mx-4'>
        <form onSubmit={handleLogin} className="flex flex-col space-y-4 p-6 bg-white bg-opacity-10 rounded-lg shadow-2xl">
          <input 
            type='text' 
            placeholder='Enter your Email' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded bg-transparent border border-gray-500 placeholder-gray-300 shadow-sm text-gray-300"
          />
          <input 
            type='password' 
            placeholder='Enter Password' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded bg-transparent border border-gray-500 placeholder-gray-300 shadow-sm text-gray-300"
          />
          <button type='submit' className='text-gray-300 text-[18px] bg-blue-400 p-2 rounded shadow-sm'>
            Log In
          </button>
          <button className='text-gray-300 text-[18px] p-2 rounded bg-transparent flex items-center justify-center shadow-sm'>
            Forget Password?
          </button>
        </form>
        {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
        {message && <div style={{ color: 'green', textAlign: 'center' }}>{message}</div>}
        <h3 className='text-gray-300 mt-4 text-center'>
          No account there?
          <Link to="/" className='text-white underline decoration-blue-300 ml-1'>Register Now</Link>
        </h3>
      </div>
    </div>
  );
}

export default Login;
