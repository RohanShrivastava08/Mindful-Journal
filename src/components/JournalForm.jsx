import React, { useState } from 'react';
import {
  FaSmile, FaFrown, FaGrinHearts, FaMeh, FaAngry
} from 'react-icons/fa';
import { MdCalendarToday, MdAccessTime } from 'react-icons/md';
import { format } from 'date-fns';

const emojiOptions = ['😊', '😢', '❤️', '😐', '😠', '🌟', '👍', '💭', '🔥', '🎯', '🙏', '😴', '💡'];

const JournalForm = ({ onSubmit }) => {
  const [entry, setEntry] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [mood, setMood] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(format(new Date(), 'HH:mm'));
  const [image, setImage] = useState(null);

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleEmojiClick = (emoji) => {
    setEntry(entry + emoji);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (entry.trim() && mood) {  // Ensure mood is selected and entry is not empty
      const formattedDate = format(date, 'yyyy-MM-dd');
      onSubmit(entry, tags, formattedDate, time, mood, image);
      // Reset form fields
      setEntry('');
      setTags([]);
      setTagInput('');
      setMood('');
      setTime(format(new Date(), 'HH:mm'));
      setImage(null);
    } else {
      alert('Please fill in the entry and select a mood!');
    }
  };

  const moods = [
    { name: 'happy', icon: <FaSmile />, color: 'text-yellow-400' },
    { name: 'sad', icon: <FaFrown />, color: 'text-blue-400' },
    { name: 'excited', icon: <FaGrinHearts />, color: 'text-pink-500' },
    { name: 'calm', icon: <FaMeh />, color: 'text-green-400' },
    { name: 'angry', icon: <FaAngry />, color: 'text-red-500' },
  ];

  return (
    <form onSubmit={handleSubmit} className="w-full mb-10 bg-white dark:bg-slate-800 shadow-xl rounded-2xl px-6 py-8 transition-all duration-300 border dark:border-slate-700">
      
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300">Write a New Entry</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Reflect your day with thoughts and emotions</p>
      </div>

      {/* Mood Selector */}
      <div className="flex justify-center gap-4 mb-6">
        {moods.map(({ name, icon, color }) => (
          <button
            key={name}
            type="button"
            onClick={() => setMood(name)}
            className={`text-3xl p-3 rounded-full transition-transform hover:scale-110 duration-200 bg-white dark:bg-slate-700 shadow-sm dark:shadow-md 
              ${mood === name ? 'ring-4 ring-blue-300 dark:ring-blue-500 scale-110' : ''} ${color}`}
          >
            {icon}
          </button>
        ))}
      </div>

      {/* Date and Time */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex items-center gap-2 w-full">
          <MdCalendarToday className="text-xl text-blue-500" />
          <input
            type="date"
            value={format(date, 'yyyy-MM-dd')}
            onChange={(e) => setDate(new Date(e.target.value))}
            className="w-full bg-gray-100 dark:bg-slate-700 dark:text-white p-3 rounded-md focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2 w-full">
          <MdAccessTime className="text-xl text-blue-500" />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full bg-gray-100 dark:bg-slate-700 dark:text-white p-3 rounded-md focus:outline-none"
          />
        </div>
      </div>

      {/* Tags */}
      <div className="mb-4">
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagKeyDown}
          placeholder="Add tags (press Enter)..."
          className="w-full p-3 rounded-lg bg-gray-100 dark:bg-slate-700 dark:text-white"
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 dark:bg-blue-600 text-blue-800 dark:text-white px-3 py-1 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Journal Entry */}
      <textarea
        className="w-full h-40 p-4 rounded-lg bg-gray-100 dark:bg-slate-700 dark:text-white mb-4 focus:outline-none"
        placeholder="Write your thoughts..."
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        required
      />

      {/* Emoji Picker */}
      <div className="flex flex-wrap gap-2 mb-6">
        {emojiOptions.map((emoji, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleEmojiClick(emoji)}
            className="text-2xl p-2 hover:scale-110 transition-transform rounded-md"
          >
            {emoji}
          </button>
        ))}
      </div>

      {/* Image Upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Add Image (optional)</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-100 dark:file:bg-blue-700 file:text-blue-700 dark:file:text-white hover:file:bg-blue-200"
        />
        {image && (
          <img src={image} alt="Uploaded preview" className="mt-4 max-w-full h-auto rounded-lg shadow-md" />
        )}
      </div>

      {/* Submit */}
      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 shadow-lg"
        >
          ✨ Submit Entry
        </button>
      </div>
    </form>
  );
};

export default JournalForm;
