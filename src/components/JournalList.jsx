import React, { useState, useEffect } from 'react';
import JournalForm from './JournalForm';
import { FaTrash, FaEdit, FaSave, FaTimes, FaFileCsv, FaFilePdf } from 'react-icons/fa';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import clsx from 'clsx';
import moment from 'moment';

const moodOptions = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '😔', label: 'Sad' },
  { emoji: '😤', label: 'Angry' },
  { emoji: '😌', label: 'Calm' },
  { emoji: '😕', label: 'Confused' },
];

const JournalList = () => {
  const [entries, setEntries] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedEntry, setEditedEntry] = useState({});
  const [filterMood, setFilterMood] = useState('');
  const [filterTag, setFilterTag] = useState('');

  // Load data from localStorage
  useEffect(() => {
    const storedEntries = localStorage.getItem('journalEntries');
    if (storedEntries) {
      setEntries(JSON.parse(storedEntries));
    }
  }, []);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries));
  }, [entries]);

  // Add entry handler
  const handleAddEntry = (entry, tags, date, time, mood) => {
    const newEntry = { entry, tags, date, time, mood };
    setEntries([newEntry, ...entries]);
  };

  // Delete entry handler
  const handleDelete = (index) => {
    const updated = [...entries];
    updated.splice(index, 1);
    setEntries(updated);
  };

  // Edit entry handler
  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedEntry({ ...entries[index] });
  };

  // Cancel edit handler
  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditedEntry({});
  };

  // Save edited entry handler
  const handleSave = (index) => {
    const updated = [...entries];
    updated[index] = editedEntry;
    setEntries(updated);
    setEditingIndex(null);
  };

  // Group entries by date
  const groupByDate = (entries) => {
    return entries.reduce((groups, entry) => {
      const date = entry.date;
      if (!groups[date]) groups[date] = [];
      groups[date].push(entry);
      return groups;
    }, {});
  };

  // Filter entries based on mood and tags
  const filteredEntries = entries.filter((entry) => {
    const moodMatch = filterMood ? entry.mood === filterMood : true;
    const tagMatch = filterTag
      ? entry.tags.some((tag) => tag.toLowerCase().includes(filterTag.toLowerCase()))
      : true;
    return moodMatch && tagMatch;
  });

  // Group filtered entries by date
  const groupedEntries = groupByDate(filteredEntries);

  // Export to CSV
  const exportToCSV = () => {
    const rows = entries.map((e) => ({
      Mood: e.mood,
      Date: e.date,
      Time: e.time,
      Entry: e.entry,
      Tags: e.tags.join(', '),
    }));

    const csvContent = [
      Object.keys(rows[0]).join(','),
      ...rows.map((r) => Object.values(r).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'journal_entries.csv');
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Mood', 'Date', 'Time', 'Entry', 'Tags']],
      body: entries.map((e) => [e.mood, e.date, e.time, e.entry, e.tags.join(', ')]),
    });
    doc.save('journal_entries.pdf');
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <JournalForm onSubmit={handleAddEntry} />

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mt-8 mb-4">
        <select
          className="px-3 py-2 rounded bg-white dark:bg-zinc-800 border dark:border-zinc-600"
          value={filterMood}
          onChange={(e) => setFilterMood(e.target.value)}
        >
          <option value="">Filter by Mood</option>
          {moodOptions.map((m, i) => (
            <option key={i} value={m.emoji}>
              {m.emoji} {m.label.toUpperCase()}
            </option>
          ))}
        </select>

        <input
          type="text"
          className="px-3 py-2 rounded border dark:border-zinc-600 bg-white dark:bg-zinc-800"
          placeholder="Filter by tag"
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
        />

        <div className="ml-auto flex gap-3">
          <button onClick={exportToCSV} className="btn-secondary flex items-center gap-2">
            <FaFileCsv /> Export CSV
          </button>
          <button onClick={exportToPDF} className="btn-primary flex items-center gap-2">
            <FaFilePdf /> Export PDF
          </button>
        </div>
      </div>

      {/* Grouped Entries */}
      {Object.entries(groupedEntries).map(([date, entries]) => (
        <div key={date} className="mb-10">
          <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-4 border-b pb-2">
            {moment(date).format('MMMM Do, YYYY')}
          </h2>
          <div className="grid gap-6">
            {entries.map((entry, index) => {
              const globalIndex = filteredEntries.findIndex(
                (e) => e.entry === entry.entry && e.date === entry.date && e.time === entry.time
              );
              return (
                <div
                  key={globalIndex}
                  className={clsx(
                    'transition-all duration-300 p-6 rounded-xl shadow-md border bg-white dark:bg-zinc-900 dark:border-zinc-700',
                    'hover:shadow-xl'
                  )}
                >
                  {editingIndex === globalIndex ? (
                    <div className="space-y-4">
                      <select
                        value={editedEntry.mood}
                        onChange={(e) => setEditedEntry({ ...editedEntry, mood: e.target.value })}
                        className="w-full p-2 rounded border bg-white dark:bg-zinc-800 dark:border-zinc-600"
                      >
                        {moodOptions.map((opt, i) => (
                          <option key={i} value={opt.emoji}>
                            {opt.emoji} {opt.label.toUpperCase()}
                          </option>
                        ))}
                      </select>

                      <input
                        type="date"
                        value={editedEntry.date}
                        onChange={(e) => setEditedEntry({ ...editedEntry, date: e.target.value })}
                        className="w-full p-2 rounded border bg-white dark:bg-zinc-800 dark:border-zinc-600"
                      />

                      <input
                        type="time"
                        value={editedEntry.time}
                        onChange={(e) => setEditedEntry({ ...editedEntry, time: e.target.value })}
                        className="w-full p-2 rounded border bg-white dark:bg-zinc-800 dark:border-zinc-600"
                      />

                      <textarea
                        rows="3"
                        value={editedEntry.entry}
                        onChange={(e) => setEditedEntry({ ...editedEntry, entry: e.target.value })}
                        className="w-full p-3 rounded border bg-white dark:bg-zinc-800 dark:border-zinc-600"
                      />

                      <input
                        type="text"
                        placeholder="Comma-separated tags"
                        value={editedEntry.tags.join(', ')}
                        onChange={(e) =>
                          setEditedEntry({
                            ...editedEntry,
                            tags: e.target.value.split(',').map((t) => t.trim()),
                          })
                        }
                        className="w-full p-2 rounded border bg-white dark:bg-zinc-800 dark:border-zinc-600"
                      />

                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => handleSave(globalIndex)}
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
                    <>
                      {/* Layout: Mood, Tags, and Entry */}
                      <div className="flex justify-between items-start">
                        <div className="text-2xl flex items-center gap-2">
                          <span>{entry.mood}</span> {/* Display mood emoji */}
                          <span>{moodOptions.find((opt) => opt.emoji === entry.mood)?.label}</span>
                        </div>
                        <div className="text-sm text-zinc-500 dark:text-zinc-400">
                          {entry.date} at {entry.time}
                        </div>
                      </div>

                      <div className="flex gap-2 mt-2">
                        {entry.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="bg-blue-100 dark:bg-blue-800/40 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <hr className="my-4 border-zinc-300 dark:border-zinc-600" />

                      <div className="text-zinc-700 dark:text-zinc-200 whitespace-pre-wrap">
                        {entry.entry}
                      </div>

                      <hr className="my-4 border-zinc-300 dark:border-zinc-600" />

                      <div className="flex justify-end gap-4 mt-5 text-sm">
                        <button
                          onClick={() => handleEdit(globalIndex)}
                          className="text-blue-500 hover:underline flex items-center gap-1"
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(globalIndex)}
                          className="text-red-500 hover:underline flex items-center gap-1"
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default JournalList;
