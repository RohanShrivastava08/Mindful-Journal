import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isDark, setIsDark] = useState(() =>
    localStorage.getItem('theme') === 'dark'
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleDarkMode = () => setIsDark(!isDark);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

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
              onClick={closeMenu}
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
            onClick={toggleDarkMode}
            className="ml-4 text-xl text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition duration-300"
            aria-label="Toggle Dark Mode"
          >
            {isDark ? <FaSun /> : <FaMoon />}
          </button>
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
              onClick={closeMenu}
              className={`block text-lg font-medium transition-all duration-300 ${
                location.pathname === link.path
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={toggleDarkMode}
            className="flex items-center gap-2 text-lg mt-4 text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition duration-300"
          >
            {isDark ? <FaSun /> : <FaMoon />}
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
