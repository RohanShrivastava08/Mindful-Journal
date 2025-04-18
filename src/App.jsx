import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Journal from './pages/Journal';
import About from './pages/About';
import LoginSignup from './pages/LoginSignup';
import Dashboard from './pages/Dashboard'; // 👈 new import
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <AuthProvider>
      <Router>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="flex flex-col min-h-screen pt-20">
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/journal"
                element={
                  <ProtectedRoute>
                    <Journal />
                  </ProtectedRoute>
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<LoginSignup />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
