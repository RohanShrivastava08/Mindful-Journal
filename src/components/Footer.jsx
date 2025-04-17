import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-100 via-green-100 to-blue-100 dark:bg-gradient-to-br dark:from-blue-900 dark:via-gray-800 dark:to-black text-gray-800 dark:text-gray-200 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Section 1: Logo / Brand */}
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-extrabold text-blue-500 dark:text-blue-300 mb-4">Mindful Journal</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              A peaceful space for self-reflection and growth.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">© 2025 Mindful Journal. All rights reserved.</p>
          </div>

          {/* Section 2: Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition duration-300">Home</a></li>
              <li><a href="/journal" className="hover:text-blue-600 dark:hover:text-blue-400 transition duration-300">Journal</a></li>
              <li><a href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition duration-300">About</a></li>
            </ul>
          </div>

          {/* Section 3: Social Media */}
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Connect with Us</h3>
            <div className="flex justify-center sm:justify-start space-x-6">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 text-2xl transform hover:scale-110 transition-all duration-300">
                <FaFacebook />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 text-2xl transform hover:scale-110 transition-all duration-300">
                <FaTwitter />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 dark:text-pink-400 text-2xl transform hover:scale-110 transition-all duration-300">
                <FaInstagram />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-500 text-2xl transform hover:scale-110 transition-all duration-300">
                <FaLinkedin />
              </a>
              <a href="https://www.github.com" target="_blank" rel="noopener noreferrer" className="text-gray-800 dark:text-gray-300 text-2xl transform hover:scale-110 transition-all duration-300">
                <FaGithub />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
