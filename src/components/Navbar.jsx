import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext'; // 👈 use from AuthContext

const Navbar = ({ darkMode, setDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // 👈 get currentUser
  const isLoggedIn = !!currentUser;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = async () => {
    try {
      await import('firebase/auth').then(({ signOut }) => signOut());
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Journal', path: '/journal' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/40 dark:bg-gray-900/40 border-b border-white/10 dark:border-gray-800/30 shadow-sm transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 dark:text-blue-400 tracking-tight hover:tracking-widest transition-all duration-500"
        >
          Mindful Journal
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative group text-lg font-medium transition-all duration-300 ${
                location.pathname === link.path
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'
              }`}
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 dark:bg-blue-400 transition-all group-hover:w-full duration-300"></span>
            </Link>
          ))}

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-4 text-xl text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition duration-300"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          {/* Auth Section */}
          {isLoggedIn ? (
            <>
              <span className="ml-4 text-sm text-gray-600 dark:text-gray-300">{currentUser.email}</span>
              <button
                onClick={handleLogout}
                className="ml-4 text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="ml-4 px-5 py-2 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 rounded-md hover:bg-blue-600 hover:text-white transition duration-300"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl text-gray-700 dark:text-gray-200"
          aria-label="Toggle Menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-6 pt-2 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl transition-all duration-500 space-y-4 border-t border-white/20 dark:border-gray-800">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`block text-lg font-medium transition-all duration-300 ${
                location.pathname === link.path
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-2 text-lg mt-4 text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition duration-300"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="w-full text-center mt-4 text-white bg-red-500 hover:bg-red-600 px-6 py-2 rounded-md shadow-md transition-all duration-300"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="block text-center mt-4 text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md shadow-md transition-all duration-300"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;