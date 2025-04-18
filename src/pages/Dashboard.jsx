import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-white dark:from-gray-800 dark:to-black px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Welcome to your Dashboard</h1>
        <p className="text-lg mt-4 text-gray-600 dark:text-gray-300">
          Logged in as <span className="font-medium text-blue-600">{currentUser?.email}</span>
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
