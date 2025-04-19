import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const { currentUser } = useAuth();
  const navigate = useNavigate();

  const firstName = currentUser?.displayName?.split(' ')[0] || 'User';
  const photoURL = currentUser?.photoURL;

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-tr from-indigo-100 via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-800 dark:text-white flex items-center justify-center px-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <motion.div
        className="max-w-4xl w-full p-10 rounded-3xl shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-4 mb-6">
          {photoURL && (
            <img
              src={photoURL}
              alt="Profile"
              className="w-16 h-16 rounded-full shadow-lg border-2 border-blue-500 dark:border-blue-400"
            />
          )}
          <h1 className="text-4xl font-extrabold">
            👋 Welcome, <span className="text-blue-600 dark:text-blue-400">{firstName}</span>!
          </h1>
        </div>

        <p className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-8">
          This is your personal dashboard where you can manage your journals, view stats, and stay on top of your mental wellbeing journey.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className="p-6 cursor-pointer bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-900 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
            onClick={() => navigate('/journal')}
          >
            <h2 className="text-xl font-semibold mb-2">📝 My Journal</h2>
            <p className="text-gray-700 dark:text-gray-200">Reflect, write and track your progress.</p>
          </div>

          <div
            className="p-6 cursor-pointer bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-800 dark:to-purple-900 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
            onClick={() => navigate('/progress')}
          >
            <h2 className="text-xl font-semibold mb-2">📊 Progress Tracker</h2>
            <p className="text-gray-700 dark:text-gray-200">Visualize your daily commitment and mood trends.</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
