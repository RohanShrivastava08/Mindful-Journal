import React from 'react';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { FaArrowRight } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const mentalHealthStats = {
  labels: ['Depression', 'Anxiety', 'Stress', 'Mood Disorders', 'Trauma'],
  datasets: [
    {
      label: 'Prevalence (%)',
      data: [20, 30, 40, 25, 18],
      backgroundColor: '#3b82f6',
      borderRadius: 12,
    },
  ],
};

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-blue-100 via-green-100 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100 min-h-screen transition-all duration-500 ease-in-out py-12 px-6">

      {/* Header */}
      <header className="text-center mt-6 mb-14">
        <h1 className="text-5xl font-extrabold mb-4 transition-colors duration-300 hover:text-blue-700 dark:hover:text-blue-400">
          Welcome to <span className="text-blue-500 dark:text-blue-300">Mindful Journal</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 transition duration-300">
          A calm space to reflect, express, and grow with mental well-being.
        </p>
        <Link
          to="/journal"
          className="inline-flex items-center gap-2 mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition-all duration-300"
        >
          Start Journaling <FaArrowRight />
        </Link>
      </header>

      {/* Chart Section */}
      <section className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16 transition-all duration-300">
        <h2 className="text-3xl font-semibold text-center mb-6">Mental Well-Being Stats</h2>
        <Bar data={mentalHealthStats} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
      </section>

      {/* Articles Section */}
      <section className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16 transition-all duration-300">
        <h3 className="text-3xl font-semibold text-center mb-6">Helpful Articles & Resources</h3>
        <ul className="space-y-4 text-lg">
          <li>
            <a
              href="https://en.wikipedia.org/wiki/Mental_health"
              className="text-blue-600 dark:text-blue-400 hover:underline flex justify-between items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mental Health Overview <FaArrowRight />
            </a>
          </li>
          <li>
            <a
              href="https://en.wikipedia.org/wiki/Stress_(biology)"
              className="text-blue-600 dark:text-blue-400 hover:underline flex justify-between items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              Understanding Stress <FaArrowRight />
            </a>
          </li>
          <li>
            <a
              href="https://en.wikipedia.org/wiki/Mindfulness"
              className="text-blue-600 dark:text-blue-400 hover:underline flex justify-between items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Power of Mindfulness <FaArrowRight />
            </a>
          </li>
        </ul>
      </section>

      {/* Visual Gallery */}
      <section className="max-w-6xl mx-auto mb-16">
        <h3 className="text-3xl font-semibold text-center mb-6">Visual Inspiration for Well-Being</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            'https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg',
            'https://images.pexels.com/photos/4473608/pexels-photo-4473608.jpeg',
            'https://images.pexels.com/photos/6787440/pexels-photo-6787440.jpeg',
          ].map((img, i) => (
            <img
              key={i}
              src={`${img}?auto=compress&cs=tinysrgb&w=600`}
              alt={`Mental Health ${i + 1}`}
              className="rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
            />
          ))}
        </div>
      </section>

      {/* Quotes Section */}
      <section className="max-w-4xl mx-auto text-center bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-xl transition-all duration-300">
        <h3 className="text-3xl font-semibold mb-6">Motivational Quotes</h3>
        <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300 italic">
          <p>"The greatest wealth is health." — Virgil</p>
          <p>"You don’t have to control your thoughts. You just have to stop letting them control you." — Dan Millman</p>
          <p>"Self-care is how you take your power back." — Lalah Delia</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
