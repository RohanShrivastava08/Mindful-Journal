import React, { useState, useEffect } from 'react';
import JournalList from '../components/JournalList';

function Journal() {
  const [entries, setEntries] = useState([]);

  const addJournalEntry = (entry, tags, date, time, mood) => {
    const newEntry = { entry, tags, date, time, mood };
    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
  };

  useEffect(() => {
    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#dbeafe] dark:from-[#0f172a] dark:to-[#1e293b] text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Page Title */}
        <div className="text-center mt-6 mb-10">
          <h1 className="text-4xl font-bold mb-2 text-blue-800 dark:text-blue-400">📝 My Mindful Journal</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Reflect daily. Track emotions. Understand yourself better.
          </p>
        </div>

        {/* Journal List (includes form inside) */}
        <JournalList entries={entries} setEntries={setEntries} />
      </div>
    </div>
  );
}

export default Journal;
