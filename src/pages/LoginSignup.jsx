import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
} from 'firebase/auth';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isPasswordReset) {
        await sendPasswordResetEmail(auth, email);
        setError('✅ Password reset email sent. Please check your inbox.');
        setIsPasswordReset(false);
        return;
      }

      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        if (user.emailVerified) {
          navigate('/dashboard');
        } else {
          setError('⚠️ Please verify your email before logging in.');
        }
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
        setError('📨 Verification email sent! Please check your inbox.');
        setIsLogin(true);
      }
    } catch (err) {
      handleFirebaseError(err);
    }
  };

  const handleFirebaseError = (err) => {
    const errors = {
      'auth/invalid-email': '❌ Invalid email address.',
      'auth/user-not-found': '❌ No user found.',
      'auth/wrong-password': '❌ Incorrect password.',
      'auth/email-already-in-use': '❌ Email already in use.',
      'auth/weak-password': '❌ Password should be at least 6 characters.',
    };
    setError(errors[err.code] || '❌ Something went wrong. Please try again.');
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white dark:from-gray-900 dark:to-black px-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 shadow-xl rounded-3xl p-10 w-full max-w-md border border-gray-200 dark:border-gray-700 backdrop-blur-lg"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          {isPasswordReset
            ? 'Reset Password 🔒'
            : isLogin
            ? 'Welcome Back 👋'
            : 'Sign Up ✨'}
        </h2>

        {error && (
          <p className="text-sm text-center mb-4 text-red-500 dark:text-red-400">{error}</p>
        )}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {!isPasswordReset && (
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          )}
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
        >
          {isPasswordReset
            ? 'Send Reset Link'
            : isLogin
            ? 'Login'
            : 'Sign Up'}
        </button>

        <div className="mt-6 text-center text-sm space-y-2">
          {isPasswordReset ? (
            <p
              className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline"
              onClick={() => {
                setIsPasswordReset(false);
                setIsLogin(true);
              }}
            >
              🔙 Back to Login
            </p>
          ) : isLogin ? (
            <>
              <p
                className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline"
                onClick={() => setIsLogin(false)}
              >
                ➕ Don't have an account? Sign Up
              </p> <br />
              <p
                className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline"
                onClick={() => setIsPasswordReset(true)}
              >
                🔑 Forgot Password?
              </p>
            </>
          ) : (
            <p
              className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline"
              onClick={() => setIsLogin(true)}
            >
              🔓 Already have an account? Login
            </p>
          )}
        </div>
      </motion.form>
    </motion.div>
  );
};

export default LoginSignup;
