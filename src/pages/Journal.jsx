import React, { useState, useEffect } from 'react';
import JournalList from '../components/JournalList';
import { db } from '../firebase'; // Only import db from firebase.js
import { collection, addDoc, getDocs } from 'firebase/firestore'; // Import Firestore methods directly
import { useAuth } from '../contexts/AuthContext'; // AuthContext to get current user
import { motion } from 'framer-motion';

function Journal() {
  const [entries, setEntries] = useState([]);
  const { currentUser } = useAuth(); // Get current user from AuthContext

  // Fetch journal entries when component mounts
  useEffect(() => {
    const fetchEntries = async () => {
      if (currentUser) {
        try {
          const journalRef = collection(db, 'journal_entries');
          const querySnapshot = await getDocs(journalRef);
          const journalEntries = querySnapshot.docs
            .filter((doc) => doc.data().userId === currentUser.uid) // Filter by current user
            .map((doc) => ({ ...doc.data(), id: doc.id }));
          setEntries(journalEntries);
        } catch (error) {
          console.error('Error fetching journal entries:', error);
        }
      }
    };

    fetchEntries();
  }, [currentUser]);

  // Add a new journal entry
  const addJournalEntry = async (entry, tags, date, time, mood, image) => {
    if (currentUser) {
      try {
        const newEntry = {
          entry,
          tags,
          date,
          time,
          mood,
          image,
          userId: currentUser.uid,
        };

        const docRef = await addDoc(collection(db, 'journal_entries'), newEntry);
        setEntries((prevEntries) => [
          { ...newEntry, id: docRef.id },
          ...prevEntries,
        ]);
      } catch (error) {
        console.error('Error adding journal entry:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#dbeafe] dark:from-[#0f172a] dark:to-[#1e293b] text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <motion.div
        className="max-w-5xl mx-auto px-6 py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Page Title */}
        <motion.div
          className="text-center mt-6 mb-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-blue-800 dark:text-blue-400 tracking-tight drop-shadow-md">
            📝 My Mindful Journal
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium">
            Reflect daily. Track emotions. Understand yourself better.
          </p>
        </motion.div>

        {/* Journal List */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 md:p-8 ring-1 ring-gray-100 dark:ring-gray-700"
        >
          <JournalList
            entries={entries}
            setEntries={setEntries}
            onAddEntry={addJournalEntry}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Journal;
