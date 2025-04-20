
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import moment from 'moment';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { motion } from 'framer-motion';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00c49f'];

const Progress = () => {
  const { currentUser } = useAuth();
  const [entries, setEntries] = useState([]);
  const [dailyCounts, setDailyCounts] = useState([]);
  const [moodData, setMoodData] = useState([]);
  const [tagData, setTagData] = useState([]);
  const [streak, setStreak] = useState(0);
  const [averageMood, setAverageMood] = useState([]);
  const [heatmapData, setHeatmapData] = useState([]);
  const [wordStats, setWordStats] = useState({ total: 0, average: 0 });
  const [badges, setBadges] = useState([]);

  const moodMap = {
    happy: 5,
    excited: 4,
    calm: 3,
    sad: 2,
    angry: 1,
  };

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const q = query(
          collection(db, 'journal_entries'),
          where('userId', '==', currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const fetched = [];
        querySnapshot.forEach((doc) =>
          fetched.push({ id: doc.id, ...doc.data() })
        );
        setEntries(fetched);
      } catch (error) {
        console.error('Error fetching entries:', error);
      }
    };

    fetchEntries();
  }, [currentUser]);

  useEffect(() => {
    const counts = {},
      moods = {},
      tags = {},
      weekMap = {},
      heatData = [];
    let totalWords = 0;
    const dates = new Set();

    entries.forEach((entry) => {
      const { date, mood, tags: entryTags, entry: content } = entry;
      const week = moment(date).startOf('isoWeek').format('YYYY-MM-DD');
      const wordCount = content.trim().split(/\s+/).length;

      // Daily count
      counts[date] = (counts[date] || 0) + 1;

      // Mood
      moods[mood] = (moods[mood] || 0) + 1;

      // Tags
      entryTags.forEach((tag) => {
        tags[tag] = (tags[tag] || 0) + 1;
      });

      // Weekly mood average
      if (moodMap[mood]) {
        if (!weekMap[week]) weekMap[week] = { total: 0, count: 0 };
        weekMap[week].total += moodMap[mood];
        weekMap[week].count += 1;
      }

      // Heatmap
      heatData.push({ date, count: 1 });
      dates.add(date);

      // Word stats
      totalWords += wordCount;
    });

    setDailyCounts(
      Object.entries(counts)
        .sort()
        .map(([date, count]) => ({ date, count }))
    );
    setMoodData(
      Object.entries(moods).map(([name, value]) => ({ name, value }))
    );
    setTagData(
      Object.entries(tags).map(([name, value]) => ({ name, value }))
    );
    setHeatmapData(heatData);

    const weeklyAverages = Object.entries(weekMap).map(
      ([week, { total, count }]) => ({
        week,
        average: (total / count).toFixed(2),
      })
    );
    setAverageMood(weeklyAverages);

    const averageWords = entries.length
      ? (totalWords / entries.length).toFixed(0)
      : 0;
    setWordStats({ total: totalWords, average: averageWords });

    // Streak
    let currentStreak = 0;
    let date = moment().format('YYYY-MM-DD');
    while (dates.has(date)) {
      currentStreak += 1;
      date = moment(date).subtract(1, 'days').format('YYYY-MM-DD');
    }
    setStreak(currentStreak);

    // Badges
    const earnedBadges = [];
    if (entries.length >= 1) earnedBadges.push('📝 First Entry');
    if (entries.length >= 10) earnedBadges.push('💡 10 Entries');
    if (currentStreak >= 3) earnedBadges.push('🔥 3-Day Streak');
    if (currentStreak >= 7) earnedBadges.push('🌟 7-Day Warrior');
    setBadges(earnedBadges);
  }, [entries]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <motion.h1
        className="text-4xl font-bold text-center text-blue-700 dark:text-blue-300 mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        📈 Your Progress Dashboard
      </motion.h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Streak Card */}
        <motion.div
          className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-900 p-6 rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">🔥 Current Streak</h2>
          <p className="text-5xl font-bold text-blue-700 dark:text-blue-200">{streak} days</p>
        </motion.div>

        {/* Mood Chart */}
        <motion.div
          className="bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-800 dark:to-pink-900 p-6 rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">😊 Mood Overview</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={moodData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                {moodData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Tag Chart */}
        <motion.div
          className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-900 p-6 rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">🏷️ Top Tags</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={tagData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Daily Entry Count */}
        <motion.div
          className="bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-800 dark:to-yellow-900 p-6 rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">📅 Daily Entry Count</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={dailyCounts}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Weekly Average Mood */}
        <motion.div
          className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-800 dark:to-purple-900 p-6 rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">📊 Weekly Average Mood</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={averageMood}>
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="average" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Word Count Stats */}
        <motion.div
          className="bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-800 dark:to-indigo-900 p-6 rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">📝 Word Count</h2>
          <p className="text-3xl text-indigo-800 dark:text-indigo-200 font-bold">Total: {wordStats.total}</p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mt-1">Avg per entry: {wordStats.average}</p>
        </motion.div>

        {/* Heatmap */}
        <motion.div
          className="bg-gradient-to-br from-red-100 to-red-200 dark:from-red-800 dark:to-red-900 p-6 rounded-xl shadow-lg col-span-1 lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">📅 Entry Heatmap</h2>
          <CalendarHeatmap
            startDate={moment().subtract(11, 'months').toDate()}
            endDate={new Date()}
            values={heatmapData}
            classForValue={(value) => {
              if (!value) return 'color-empty';
              return `color-github-${Math.min(value.count, 4)}`;
            }}
            showWeekdayLabels={true}
          />
        </motion.div>

        {/* Achievements */}
        <motion.div
          className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-lg col-span-1 lg:col-span-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">🏆 Achievements</h2>
          <div className="flex flex-wrap gap-3">
            {badges.length > 0 ? (
              badges.map((badge, idx) => (
                <span
                  key={idx}
                  className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-full shadow"
                >
                  {badge}
                </span>
              ))
            ) : (
              <p className="text-gray-500">No badges earned yet.</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Progress;