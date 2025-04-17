import React, { useState, useEffect } from 'react';
import JournalForm from './JournalForm';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FaEdit, FaTrash, FaSave, FaTimes, FaFileCsv, FaFilePdf } from 'react-icons/fa';
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

  useEffect(() => {
    const stored = localStorage.getItem('journalEntries');
    if (stored) setEntries(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries));
  }, [entries]);

  const handleAddEntry = (entry, tags, date, time, mood, image) => {
    const newEntry = { entry, tags, date, time, mood, image };
    setEntries([newEntry, ...entries]);
  };

  const handleDelete = (index) => {
    const updated = [...entries];
    updated.splice(index, 1);
    setEntries(updated);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedEntry({ ...entries[index] });
  };

  const handleSave = (index) => {
    const updated = [...entries];
    updated[index] = editedEntry;
    setEntries(updated);
    setEditingIndex(null);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditedEntry({});
  };

  const exportToCSV = () => {
    const csv = entries.map(({ mood, date, time, entry, tags }) =>
      `"${mood}","${date}","${time}","${entry.replace(/\n/g, ' ')}","${tags.join(', ')}"`
    );
    const blob = new Blob([['Mood,Date,Time,Entry,Tags', ...csv].join('\n')], {
      type: 'text/csv;charset=utf-8;',
    });
    saveAs(blob, 'journal_entries.csv');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Mood', 'Date', 'Time', 'Entry', 'Tags']],
      body: entries.map(({ mood, date, time, entry, tags }) => [
        mood,
        date,
        time,
        entry,
        tags.join(', '),
      ]),
    });
    doc.save('journal_entries.pdf');
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
      <JournalForm onSubmit={handleAddEntry} />

      {/* Filters and Export */}
      <div className="flex flex-wrap items-center gap-4 mt-10 mb-6">
        <select
          value={filterMood}
          onChange={(e) => setFilterMood(e.target.value)}
          className="p-2 border rounded dark:bg-zinc-800 dark:text-white"
        >
          <option value="">Filter by Mood</option>
          {moodOptions.map(({ emoji, label }) => (
            <option key={emoji} value={emoji}>
              {emoji} {label}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Filter by tag"
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
          className="p-2 border rounded dark:bg-zinc-800 dark:text-white"
        />

        <div className="ml-auto flex gap-3">
          <button onClick={exportToCSV} className="btn-secondary flex items-center gap-2">
            <FaFileCsv /> CSV
          </button>
          <button onClick={exportToPDF} className="btn-primary flex items-center gap-2">
            <FaFilePdf /> PDF
          </button>
        </div>
      </div>

      {/* Journal Entries */}
      {Object.entries(groupedEntries).map(([date, dailyEntries]) => (
        <div key={date} className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-zinc-800 dark:text-white">
            {moment(date).format('MMMM Do, YYYY')}
          </h2>

          {dailyEntries.map((entry, idx) => {
            const entryIndex = entries.findIndex(
              (e) => e.entry === entry.entry && e.date === entry.date && e.time === entry.time
            );
            const isEditing = editingIndex === entryIndex;

            return (
              <div
                key={idx}
                className="p-6 rounded-lg border shadow-sm bg-white dark:bg-zinc-900 dark:border-zinc-700 mb-6"
              >
                {isEditing ? (
                  <>
                    <select
                      value={editedEntry.mood}
                      onChange={(e) => setEditedEntry({ ...editedEntry, mood: e.target.value })}
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

                    <div className="flex flex-col mb-4">
                      {editedEntry.image && (
                        <div className="relative mb-2">
                          <img
                            src={editedEntry.image}
                            alt="Preview"
                            className="w-full max-h-64 object-cover rounded"
                          />
                          <button
                            onClick={() =>
                              setEditedEntry({ ...editedEntry, image: '' })
                            }
                            className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs"
                          >
                            Remove
                          </button>
                        </div>
                      )}

                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setEditedEntry({ ...editedEntry, image: reader.result });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="p-2 border rounded dark:bg-zinc-800 dark:text-white"
                      />
                    </div>

                    <div className="flex gap-3 justify-end">
                      <button
                        onClick={() => handleSave(entryIndex)}
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
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-lg font-semibold flex gap-2 items-center">
                        {entry.mood} {moodOptions.find((m) => m.emoji === entry.mood)?.label}
                      </div>
                      <div className="text-sm text-zinc-500 dark:text-zinc-400">{entry.time}</div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-2">
                      {entry.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="bg-blue-100 dark:bg-blue-800 text-blue-900 dark:text-white px-2 py-1 rounded-full text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {entry.image && (
                      <img
                        src={entry.image}
                        alt="Journal"
                        className="w-full max-h-64 object-cover rounded-lg mb-4"
                      />
                    )}

                    <p className="whitespace-pre-wrap text-zinc-700 dark:text-zinc-200 mb-4">
                      {entry.entry}
                    </p>

                    <div className="flex gap-4 justify-end text-sm">
                      <button
                        onClick={() => handleEdit(entryIndex)}
                        className="text-blue-600 dark:text-blue-300 flex items-center gap-1"
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(entryIndex)}
                        className="text-red-600 dark:text-red-400 flex items-center gap-1"
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
      ))}
    </div>
  );
};

export default JournalList;
