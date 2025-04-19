import React, { useState, useEffect } from 'react';
import JournalList from '../components/JournalList';
import { db } from '../firebase'; // Only import db from firebase.js
import { collection, addDoc, getDocs } from 'firebase/firestore'; // Import Firestore methods directly
import { useAuth } from '../contexts/AuthContext'; // AuthContext to get current user

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
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Page Title */}
        <div className="text-center mt-6 mb-10">
          <h1 className="text-4xl font-bold mb-2 text-blue-800 dark:text-blue-400">
            📝 My Mindful Journal
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Reflect daily. Track emotions. Understand yourself better.
          </p>
        </div>

        {/* Journal List (includes form inside) */}
        <JournalList
          entries={entries}
          setEntries={setEntries}
          onAddEntry={addJournalEntry}
        />
      </div>
    </div>
  );
}

export default Journal;
