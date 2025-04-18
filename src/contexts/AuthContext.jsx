import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';

// Create the context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider to wrap the app
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Check if the email is verified
        if (user.emailVerified) {
          setCurrentUser(user); // If verified, update the currentUser state
        } else {
          setCurrentUser(null); // If not verified, set currentUser to null
        }
      } else {
        setCurrentUser(null); // If user is not logged in, reset currentUser state
      }
      setLoading(false); // Stop loading after checking auth state
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  // Logout handler
  const logout = () => signOut(auth);

  // Only render children once auth state is determined
  return (
    <AuthContext.Provider value={{ currentUser, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
