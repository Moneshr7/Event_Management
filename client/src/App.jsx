import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EventsDashboardPage from './pages/EventsDashboardPage';
import LoginPage from './pages/LoginPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './lib/contexts/AuthContext';
import EventDetailsPage from './pages/EventDetailsPage';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<EventsDashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/events/:id' element={<EventDetailsPage />} />
      </Routes>
      <ToastContainer position="bottom-right" />
    </AuthProvider>
  );
};

export default App;
