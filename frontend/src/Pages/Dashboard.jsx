import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Images/newlogo.jpg';

function Dashboard() {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogout = () => {
    // Add any logout logic here (e.g., clearing tokens)
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen" style={{ backgroundImage: `url(${Logo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <h1 className="text-gray-300 text-5xl mb-4">Welcome!</h1>
      <button
        onClick={handleLogout}
        className="text-gray-300 text-[18px] bg-blue-400 p-2 rounded shadow-sm"
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
