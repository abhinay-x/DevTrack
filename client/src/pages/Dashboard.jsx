import { useEffect, useState } from 'react';
import { getWeeklyActivity, getStreak } from '../services/analyticsService';
import { fetchLogs } from '../services/logService';
import { fetchSnippets } from '../services/snippetService';
import { fetchGoals } from '../services/goalService';
import StatsCard from '../components/dashboard/StatsCard';
import ActivityChart from '../components/dashboard/ActivityChart';
import { Flame, FileCode, Target, Clock } from 'lucide-react';

const Dashboard = () => {
  const [weekly, setWeekly] = useState([]);
  const [streak, setStreak] = useState(0);
  const [stats, setStats] = useState({ logs: 0, hours: 0, goals: 0, snippets: 0 });

  useEffect(() => {
    (async () => {
      const [{ data: weeklyData }, { data: streakData }] = await Promise.all([
        getWeeklyActivity(),
        getStreak(),
      ]);
      setWeekly(weeklyData);
      setStreak(streakData.streak);
    })();

    (async () => {
      const [{ data: logs }, { data: snippets }, { data: goals }] = await Promise.all([
        fetchLogs(),
        fetchSnippets(),
        fetchGoals(),
      ]);
      const hours = logs.reduce((sum, l) => sum + (l.duration || 0), 0) / 60;
      setStats({
        logs: logs.length,
        hours: hours.toFixed(1),
        goals: goals.filter((g) => g.status === 'Active').length,
        snippets: snippets.length,
      });
    })();
  }, []);

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard title="Streak" value={`${streak} 🔥`} icon={Flame} variant="warning" />
        <StatsCard title="Total Logs" value={stats.logs} icon={Clock} variant="primary" />
        <StatsCard title="Hours Logged" value={stats.hours} icon={Clock} variant="success" />
        <StatsCard title="Snippets" value={stats.snippets} icon={FileCode} variant="danger" />
      </div>

      {/* Activity */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm">
        <h2 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Last 7 Days Activity (minutes)</h2>
        <ActivityChart data={weekly} />
      </div>
    </div>
  );
};

export default Dashboard;
