import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // ✅ Updated path

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth(); // ✅ Updated from 'user' to 'currentUser'

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;