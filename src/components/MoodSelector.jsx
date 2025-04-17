import React from 'react';

const moods = [
  { emoji: '😄', label: 'Happy' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '😢', label: 'Sad' },
  { emoji: '😠', label: 'Angry' },
  { emoji: '😴', label: 'Tired' },
];

function MoodSelector({ selectedMood, setSelectedMood }) {
  return (
    <div className="flex space-x-4 justify-center mt-4">
      {moods.map((mood) => (
        <button
          key={mood.label}
          onClick={() => setSelectedMood(mood.label)}
          className={`text-2xl transition-transform transform hover:scale-125 ${
            selectedMood === mood.label ? 'ring-2 ring-blue-500 rounded-full' : ''
          }`}
          aria-label={mood.label}
        >
          {mood.emoji}
        </button>
      ))}
    </div>
  );
}

export default MoodSelector;
