import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">
        Welcome!
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Click the button below to view the event calendar.
      </p>
      <Link 
        to="/dashboard" 
        className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default HomePage;