import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const quotes = [
  "Consistency is more important than intensity.",
  "Small steps every day build unstoppable momentum.",
  "Your journal is your mirror. Be honest, be kind.",
  "Progress, not perfection.",
  "The mind is everything. What you think, you become."
];

const Dashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [quoteIndex, setQuoteIndex] = useState(0);

  const firstName = currentUser?.displayName?.split(' ')[0] || 'User';
  const photoURL = currentUser?.photoURL;

  // Confetti on mount
  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  // Auto rotate quote every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="relative min-h-screen bg-gradient-to-tr from-indigo-100 via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-800 dark:text-white px-6 py-12 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* SVG Blob Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute top-[-20%] left-[-10%] w-[40rem] opacity-20 dark:opacity-10 animate-pulse"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#6366F1"
            d="M38.4,-57.7C51.2,-49.4,64.4,-39.5,66.8,-27.5C69.2,-15.5,60.8,-1.4,53.5,11.6C46.2,24.7,39.9,36.7,30.5,44.7C21.1,52.6,8.6,56.4,-3.9,61.3C-16.4,66.3,-32.8,72.4,-42.3,66.3C-51.9,60.1,-54.6,41.8,-58.2,26.4C-61.9,11,-66.6,-1.5,-63.9,-14.4C-61.2,-27.3,-51.1,-40.6,-38.5,-49.9C-26,-59.1,-13,-64.3,0.4,-64.8C13.9,-65.2,27.8,-60.4,38.4,-57.7Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 w-full max-w-6xl p-10 rounded-3xl shadow-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200 dark:border-gray-700"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex items-center space-x-5 mb-10">
          {photoURL && (
            <motion.img
              src={photoURL}
              alt="Profile"
              className="w-20 h-20 rounded-full border-4 border-blue-500 dark:border-blue-400 shadow-lg object-cover"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
          )}
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              👋 Welcome, <span className="text-blue-600 dark:text-blue-400">{firstName}</span>!
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
              Your sanctuary for reflection and growth.
            </p>
          </div>
        </div>

        {/* Quote Carousel */}
        <motion.div
          className="text-center text-xl italic font-medium text-purple-600 dark:text-purple-300 mb-8"
          key={quoteIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          “{quotes[quoteIndex]}”
        </motion.div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Journal */}
          <motion.div
            className="p-6 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-900 rounded-2xl shadow-xl hover:shadow-2xl cursor-pointer transition-transform transform hover:-translate-y-1"
            onClick={() => navigate('/journal')}
            whileHover={{ scale: 1.03 }}
          >
            <h2 className="text-2xl font-semibold mb-2">📝 My Journal</h2>
            <p className="text-gray-700 dark:text-gray-200">Reflect, write and track your progress.</p>
          </motion.div>

          {/* Progress Tracker */}
          <motion.div
            className="p-6 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-800 dark:to-purple-900 rounded-2xl shadow-xl hover:shadow-2xl cursor-pointer transition-transform transform hover:-translate-y-1"
            onClick={() => navigate('/progress')}
            whileHover={{ scale: 1.03 }}
          >
            <h2 className="text-2xl font-semibold mb-2">📊 Progress Tracker</h2>
            <p className="text-gray-700 dark:text-gray-200">Visualize mood, streaks, and commitment.</p>
          </motion.div>

          {/* Achievements */}
          <motion.div
            className="p-6 bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-800 dark:to-yellow-900 rounded-2xl shadow-xl hover:shadow-2xl cursor-not-allowed opacity-70"
            whileHover={{ scale: 1.01 }}
          >
            <h2 className="text-2xl font-semibold mb-2">🏆 Achievements</h2>
            <p className="text-gray-700 dark:text-gray-200">Coming soon: badges and milestones!</p>
          </motion.div>

          {/* Goals */}
          <motion.div
            className="p-6 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-900 rounded-2xl shadow-xl hover:shadow-2xl cursor-not-allowed opacity-70"
            whileHover={{ scale: 1.01 }}
          >
            <h2 className="text-2xl font-semibold mb-2">🎯 Goals</h2>
            <p className="text-gray-700 dark:text-gray-200">Coming soon: set and track daily goals.</p>
          </motion.div>

          {/* Community */}
          <motion.div
            className="p-6 bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-800 dark:to-pink-900 rounded-2xl shadow-xl hover:shadow-2xl cursor-not-allowed opacity-70"
            whileHover={{ scale: 1.01 }}
          >
            <h2 className="text-2xl font-semibold mb-2">👥 Community</h2>
            <p className="text-gray-700 dark:text-gray-200">Coming soon: connect and share progress.</p>
          </motion.div>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-10 text-center italic">
          Keep showing up — small steps each day lead to lasting change 🌱
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
