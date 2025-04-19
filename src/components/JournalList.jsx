import React, { useState } from 'react';
import {
  updateDoc,
  doc,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../firebase';
import {
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes
} from 'react-icons/fa';
import moment from 'moment';
import JournalForm from './JournalForm'; // ✅ Importing JournalForm

const moodOptions = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '😔', label: 'Sad' },
  { emoji: '😤', label: 'Angry' },
  { emoji: '😌', label: 'Calm' },
  { emoji: '😕', label: 'Confused' },
];

const JournalList = ({ entries, setEntries, onAddEntry }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedEntry, setEditedEntry] = useState({});
  const [filterMood, setFilterMood] = useState('');
  const [filterTag, setFilterTag] = useState('');

  const handleAddEntry = (entry, tags, date, time, mood, image) => {
    onAddEntry(entry, tags, date, time, mood, image);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'journal_entries', id));
      setEntries(entries.filter((entry) => entry.id !== id));
    } catch (e) {
      console.error('Error deleting document: ', e);
    }
  };

  const handleEdit = (id) => {
    setEditingIndex(id);
    const entryToEdit = entries.find((entry) => entry.id === id);
    setEditedEntry({ ...entryToEdit });
  };

  const handleSave = async (id) => {
    try {
      const entryRef = doc(db, 'journal_entries', id);
      await updateDoc(entryRef, editedEntry);
      const updatedEntries = entries.map((entry) =>
        entry.id === id ? { ...entry, ...editedEntry } : entry
      );
      setEntries(updatedEntries);
      setEditingIndex(null);
    } catch (e) {
      console.error('Error updating document: ', e);
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditedEntry({});
  };

  const filteredEntries = entries.filter((e) => {
    const moodMatch = filterMood ? e.mood === filterMood : true;
    const tagMatch = filterTag
      ? e.tags.some((tag) => tag.toLowerCase().includes(filterTag.toLowerCase()))
      : true;
    return moodMatch && tagMatch;
  });

  const groupedEntries = filteredEntries.reduce((acc, curr) => {
    acc[curr.date] = acc[curr.date] ? [...acc[curr.date], curr] : [curr];
    return acc;
  }, {});

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* ✅ Journal Entry Form */}
      <div className="mb-10">
        <JournalForm onSubmit={handleAddEntry} />
      </div>

      {/* ✅ Journal Entries List */}
      {Object.entries(groupedEntries).map(([date, dailyEntries]) => (
        <div key={date} className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-zinc-800 dark:text-white">
            {moment(date).format('MMMM Do, YYYY')}
          </h2>

          {dailyEntries.map((entry) => (
            <div
              key={entry.id}
              className="p-6 rounded-lg border shadow-sm bg-white dark:bg-zinc-900 dark:border-zinc-700 mb-6"
            >
              {editingIndex === entry.id ? (
                <div>
                  <select
                    value={editedEntry.mood}
                    onChange={(e) =>
                      setEditedEntry({ ...editedEntry, mood: e.target.value })
                    }
                    className="w-full mb-2 p-2 border rounded dark:bg-zinc-800 dark:text-white"
                  >
                    {moodOptions.map(({ emoji, label }) => (
                      <option key={emoji} value={emoji}>
                        {emoji} {label}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    value={editedEntry.time}
                    onChange={(e) =>
                      setEditedEntry({ ...editedEntry, time: e.target.value })
                    }
                    className="w-full mb-2 p-2 border rounded dark:bg-zinc-800 dark:text-white"
                  />

                  <textarea
                    value={editedEntry.entry}
                    onChange={(e) =>
                      setEditedEntry({ ...editedEntry, entry: e.target.value })
                    }
                    className="w-full mb-2 p-2 border rounded dark:bg-zinc-800 dark:text-white"
                    rows={3}
                  />

                  <input
                    type="text"
                    value={editedEntry.tags.join(', ')}
                    onChange={(e) =>
                      setEditedEntry({
                        ...editedEntry,
                        tags: e.target.value.split(',').map((t) => t.trim()),
                      })
                    }
                    className="w-full mb-2 p-2 border rounded dark:bg-zinc-800 dark:text-white"
                  />

                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={() => handleSave(entry.id)}
                      className="btn-primary flex items-center gap-2"
                    >
                      <FaSave /> Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="btn-secondary flex items-center gap-2"
                    >
                      <FaTimes /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-lg font-semibold flex gap-2 items-center">
                      {entry.mood}{' '}
                      {moodOptions.find((m) => m.emoji === entry.mood)?.label}
                    </div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">
                      {entry.time}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-2">
                    {entry.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-blue-200 dark:bg-blue-600 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mb-2">{entry.entry}</div>

                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => handleEdit(entry.id)}
                      className="btn-primary flex items-center gap-2"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="btn-danger flex items-center gap-2"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default JournalList;
