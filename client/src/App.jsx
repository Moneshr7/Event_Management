import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EventsDashboardPage from './pages/EventsDashboardPage';
import LoginPage from './pages/LoginPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './lib/contexts/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<EventsDashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <ToastContainer position="bottom-right" />
    </AuthProvider>
  );
};

export default App;
