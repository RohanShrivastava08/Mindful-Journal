import React, { useState } from "react";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import {
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
  FaShare,
  FaDownload,
} from "react-icons/fa";
import moment from "moment";
import JournalForm from "./JournalForm";
import { useDrop } from "react-dnd";
import { jsPDF } from "jspdf";

const moodOptions = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😔", label: "Sad" },
  { emoji: "😤", label: "Angry" },
  { emoji: "😌", label: "Calm" },
  { emoji: "😕", label: "Confused" },
];

const JournalList = ({ entries, setEntries, onAddEntry }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedEntry, setEditedEntry] = useState({});
  const [filterMood, setFilterMood] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  // Drag-and-drop state
  const [, drop] = useDrop({
    accept: "ENTRY",
    hover: (item, monitor) => {
      const draggedIndex = item.index;
      const hoverIndex = item.hoverIndex;

      if (draggedIndex !== hoverIndex) {
        const reorderedEntries = [...entries];
        const draggedItem = reorderedEntries[draggedIndex];
        reorderedEntries.splice(draggedIndex, 1);
        reorderedEntries.splice(hoverIndex, 0, draggedItem);
        setEntries(reorderedEntries);
        item.index = hoverIndex;
      }
    },
  });

  const handleAddEntry = (entry, tags, date, time, mood, image) => {
    onAddEntry(entry, tags, date, time, mood, image);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "journal_entries", id));
      setEntries(entries.filter((entry) => entry.id !== id));
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  const handleEdit = (id) => {
    setEditingIndex(id);
    const entryToEdit = entries.find((entry) => entry.id === id);
    setEditedEntry({ ...entryToEdit });
  };

  const handleSave = async (id) => {
    try {
      const entryRef = doc(db, "journal_entries", id);
      await updateDoc(entryRef, { ...editedEntry, updatedAt: new Date() });
      const updatedEntries = entries.map((entry) =>
        entry.id === id ? { ...entry, ...editedEntry } : entry
      );
      setEntries(updatedEntries);
      setEditingIndex(null);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditedEntry({});
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShare = (entry) => {
    const shareText = `Here's my journal entry from ${moment(entry.date).format(
      "MMMM Do, YYYY"
    )}:\n\n${entry.entry}`;
    navigator.share
      ? navigator.share({ text: shareText })
      : alert("Sharing not supported on this device.");
  };

  const handleExportPDF = (entry) => {
    const doc = new jsPDF();
    doc.text(
      `Journal Entry - ${moment(entry.date).format("MMMM Do, YYYY")}`,
      10,
      10
    );
    doc.text(entry.entry, 10, 20);
    doc.save("journal-entry.pdf");
  };

  const filteredEntries = entries.filter((e) => {
    const moodMatch = filterMood ? e.mood === filterMood : true;
    const tagMatch = filterTag
      ? e.tags.some((tag) =>
          tag.toLowerCase().includes(filterTag.toLowerCase())
        )
      : true;
    return moodMatch && tagMatch;
  });

  const groupedEntries = filteredEntries.reduce((acc, curr) => {
    acc[curr.date] = acc[curr.date] ? [...acc[curr.date], curr] : [curr];
    return acc;
  }, {});

  return (
    <div className="max-w-4xl mx-auto px-4 py-10" ref={drop}>
      {/* Journal Entry Form */}
      <div className="mb-10">
        <JournalForm onSubmit={handleAddEntry} />
      </div>

      {/* Journal Entries List */}
      {Object.entries(groupedEntries).map(([date, dailyEntries]) => (
        <div key={date} className="mb-10">
          <h2 className="text-2xl font-bold text-center text-zinc-800 dark:text-white mb-6">
            {moment(date).format("MMMM Do, YYYY")}
          </h2>

          {dailyEntries.map((entry, index) => (
            <div
              key={entry.id}
              className="p-6 rounded-2xl border shadow-lg bg-white dark:bg-zinc-900 dark:border-zinc-700 mb-6 transition-transform transform hover:scale-105"
              ref={drop}
            >
              {editingIndex === entry.id ? (
                <div>
                  <select
                    value={editedEntry.mood}
                    onChange={(e) =>
                      setEditedEntry({ ...editedEntry, mood: e.target.value })
                    }
                    className="w-full mb-4 p-3 border rounded-lg dark:bg-zinc-800 dark:text-white text-xl"
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
                    className="w-full mb-4 p-3 border rounded-lg dark:bg-zinc-800 dark:text-white text-xl"
                  />

                  <textarea
                    value={editedEntry.entry}
                    onChange={(e) =>
                      setEditedEntry({ ...editedEntry, entry: e.target.value })
                    }
                    className="w-full mb-4 p-3 border rounded-lg dark:bg-zinc-800 dark:text-white text-xl"
                    rows={4}
                  />

                  <input
                    type="file"
                    onChange={handleImageUpload}
                    className="w-full mb-4 p-3 border rounded-lg dark:bg-zinc-800 dark:text-white text-xl"
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-32 h-32 object-cover mb-4"
                    />
                  )}

                  <input
                    type="text"
                    value={editedEntry.tags.join(", ")}
                    onChange={(e) =>
                      setEditedEntry({
                        ...editedEntry,
                        tags: e.target.value.split(",").map((t) => t.trim()),
                      })
                    }
                    className="w-full mb-4 p-3 border rounded-lg dark:bg-zinc-800 dark:text-white text-xl"
                  />

                  <div className="flex gap-4 justify-end">
                    <button
                      onClick={() => handleSave(entry.id)}
                      className="btn-primary px-6 py-2 rounded-full flex items-center gap-2"
                    >
                      <FaSave /> Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="btn-secondary px-6 py-2 rounded-full flex items-center gap-2"
                    >
                      <FaTimes /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-xl font-semibold flex gap-2 items-center">
                      {entry.mood && (
                        <>
                        Current Mood – {
  (() => {
    const mood = moodOptions.find(
      (m) => m.emoji === entry.mood || m.label.toLowerCase() === entry.mood?.toLowerCase()
    )?.label || entry.mood || '';

    return mood.charAt(0).toUpperCase() + mood.slice(1);
  })()
}
                        </>
                      )}
                    </div>
                    <div className="text-lg text-zinc-500 dark:text-zinc-400">
                      {entry.time}
                    </div>
                  </div>

                  <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                    Last edited:{" "}
                    {moment(entry.updatedAt).format("MMMM Do, YYYY, h:mm A")}
                  </div>

                  <div className="flex flex-wrap gap-3 mb-4">
                    {entry.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-blue-200 dark:bg-blue-600 px-4 py-2 rounded-full text-sm font-medium text-blue-800 dark:text-blue-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mb-4 text-lg">{entry.entry}</div>

                  {entry.image && (
                    <img
                      src={entry.image}
                      alt="Entry Image"
                      className="mb-4 w-full h-auto"
                    />
                  )}

                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => handleEdit(entry.id)}
                      className="btn-primary px-6 py-2 rounded-full flex items-center gap-2"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="btn-danger px-6 py-2 rounded-full flex items-center gap-2"
                    >
                      <FaTrash /> Delete
                    </button>
                    <button
                      onClick={() => handleShare(entry)}
                      className="btn-secondary px-6 py-2 rounded-full flex items-center gap-2"
                    >
                      <FaShare /> Share
                    </button>
                    <button
                      onClick={() => handleExportPDF(entry)}
                      className="btn-secondary px-6 py-2 rounded-full flex items-center gap-2"
                    >
                      <FaDownload /> Export PDF
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
