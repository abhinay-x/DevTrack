import { useEffect, useState } from 'react';
import { getWeeklyActivity, getCategoryBreakdown, getStreak } from '../services/analyticsService';
import { fetchLogs } from '../services/logService';
import { fetchSnippets } from '../services/snippetService';
import { fetchGoals } from '../services/goalService';
import { Card, CardHeader, CardBody, Skeleton } from '../components/ui';
import { Flame, FileText, Clock, Target, TrendingUp, Calendar, MoreVertical, Edit, Trash2 } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, trend, delay }) => (
  <Card hover className={`animate-slideUp ${delay}`}>
    <CardBody className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-secondary mb-1">{title}</p>
          <p className="text-3xl font-bold text-primary">{value}</p>
          {trend && (
            <p className="text-sm text-success mt-2 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              {trend}
            </p>
          )}
        </div>
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>
    </CardBody>
  </Card>
);

const ActivityChart = ({ data }) => {
  const maxValue = Math.max(...data.map(d => d.minutes), 1);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="h-64 flex items-end justify-between gap-2">
      {data.map((day, index) => {
        const height = (day.minutes / maxValue) * 100;
        return (
          <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
            <div className="relative w-full">
              <div
                className="w-full gradient-bg rounded-t-lg transition-all duration-500 group-hover:opacity-80"
                style={{ height: `${Math.max(height, 5)}%` }}
              />
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-card border-2 border-theme px-2 py-1 rounded-lg text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {day.minutes} min
              </div>
            </div>
            <span className="text-xs text-secondary">{days[index]}</span>
          </div>
        );
      })}
    </div>
  );
};

const buildEmptyWeek = () => {
  const result = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 6; i >= 0; i--) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    result.push({
      date: day.toISOString().split('T')[0],
      minutes: 0,
    });
  }
  return result;
};

const aggregateLogsToWeek = (logs = []) => {
  const week = buildEmptyWeek();
  const indexMap = week.reduce((acc, day, idx) => {
    acc[day.date] = idx;
    return acc;
  }, {});

  logs.forEach((log) => {
    if (!log.date) return;
    const date = new Date(log.date);
    if (Number.isNaN(date.getTime())) return;
    date.setHours(0, 0, 0, 0);
    const key = date.toISOString().split('T')[0];
    if (indexMap[key] !== undefined) {
      week[indexMap[key]].minutes += log.duration || 0;
    }
  });

  return week;
};

const hasActivity = (data = []) => data.some((day) => (day.minutes || 0) > 0);

const Dashboard = () => {
  const [weekly, setWeekly] = useState([]);
  const [streak, setStreak] = useState(0);
  const [stats, setStats] = useState({ logs: 0, hours: 0, goals: 0, snippets: 0 });
  const [categoryStats, setCategoryStats] = useState({ totalMinutes: 0, items: [], top: null });
  const [recentLogs, setRecentLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [weeklyRes, streakRes, catRes] = await Promise.all([
          getWeeklyActivity(),
          getStreak(),
          getCategoryBreakdown(),
        ]);
        const weeklyData = weeklyRes.data && Array.isArray(weeklyRes.data) ? weeklyRes.data : Array.isArray(weeklyRes) ? weeklyRes : [];
        const streakData = streakRes.data || { streak: 0 };
        const breakdown = catRes.data || [];

        setWeekly(weeklyData.length ? weeklyData : buildEmptyWeek());
        setStreak(streakData.streak);

        const totalMinutes = breakdown.reduce((sum, b) => sum + (b.totalMinutes || 0), 0);
        const items = breakdown
          .map((b) => ({
            category: b._id || 'Other',
            minutes: b.totalMinutes || 0,
            percent: totalMinutes ? Math.round(((b.totalMinutes || 0) / totalMinutes) * 100) : 0,
          }))
          .sort((a, b) => b.minutes - a.minutes);
        const top = items[0] || { category: 'N/A', minutes: 0, percent: 0 };
        setCategoryStats({ totalMinutes, items, top });
      } catch (err) {
        console.error('Failed to load analytics:', err);
      }

      try {
        // These services already return the data payload, not the full Axios response
        const [logsRes, snippetsRes, goalsRes] = await Promise.all([
          fetchLogs().catch(() => []),
          fetchSnippets().catch(() => []),
          fetchGoals().catch(() => []),
        ]);

        const logs = Array.isArray(logsRes) ? logsRes : logsRes?.logs || [];
        const snippets = Array.isArray(snippetsRes) ? snippetsRes : snippetsRes?.snippets || [];
        const goals = Array.isArray(goalsRes) ? goalsRes : goalsRes?.goals || [];

        const hours = logs.reduce((sum, l) => sum + (l.duration || 0), 0) / 60;
        setStats({
          logs: logs.length,
          hours: hours.toFixed(1),
          goals: goals.filter((g) => g.status === 'Active').length,
          snippets: snippets.length,
        });
        setRecentLogs(logs.slice(0, 5));

        const logWeekly = aggregateLogsToWeek(logs);
        setWeekly((prev) => (hasActivity(prev) ? prev : logWeekly));
      } catch (err) {
        if (err?.response?.status === 429) {
          console.warn('Rate limit hit while loading stats; showing empty dashboard stats.');
        } else {
          console.error('Failed to load stats:', err);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="min-h-screen bg-theme flex flex-col">
      {/* Welcome Header */}
      <div className="bg-card border-b-2 border-theme">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="animate-slideUp">
              <h1 className="text-3xl font-bold text-primary mb-1">
                {getGreeting()}! 👋
              </h1>
              <p className="text-secondary">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>

            {/* Streak Counter */}
            <div className="flex items-center gap-3 bg-warning/10 border-2 border-warning/20 rounded-2xl px-6 py-4 animate-float">
              <Flame className="w-8 h-8 text-warning animate-pulse" />
              <div>
                <p className="text-2xl font-bold text-warning">{streak}</p>
                <p className="text-xs text-warning/80">Day Streak</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto px-6 py-8 space-y-8 w-full">
        {/* Stat Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1,2,3,4].map((i) => (
              <Card key={i}><CardBody className="p-6"><Skeleton variant="card" /></CardBody></Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Logs"
              value={stats.logs}
              icon={FileText}
              color="bg-info"
              trend="+12% vs last week"
              delay="stagger-1"
            />
            <StatCard
              title="Hours Logged"
              value={`${stats.hours} hrs`}
              icon={Clock}
              color="bg-secondary"
              delay="stagger-2"
            />
            <StatCard
              title="Active Goals"
              value={stats.goals}
              icon={Target}
              color="bg-success"
              delay="stagger-3"
            />
            <StatCard
              title="Code Snippets"
              value={stats.snippets}
              icon={FileText}
              color="bg-warning"
              delay="stagger-4"
            />
          </div>
        )}

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity Chart */}
          <Card className="lg:col-span-2 animate-slideUp stagger-5">
            <CardHeader className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-primary">7-Day Activity</h2>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm rounded-lg bg-primary text-white">Week</button>
                <button className="px-3 py-1 text-sm rounded-lg bg-theme text-secondary hover:bg-hover transition-colors">Month</button>
              </div>
            </CardHeader>
            <CardBody>
              {loading ? <Skeleton variant="card" className="h-64" /> : <ActivityChart data={weekly} />}
            </CardBody>
          </Card>

          {/* Quick Stats (dynamic by user) */}
          <Card className="animate-slideUp stagger-6">
            <CardHeader>
              <h2 className="text-lg font-semibold text-primary">Quick Stats</h2>
            </CardHeader>
            <CardBody className="space-y-6">
              {loading ? (
                <div className="space-y-4">
                  <Skeleton variant="card" className="h-20" />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                </div>
              ) : (
                <>
                  <div>
                    <p className="text-sm text-secondary mb-3">Most Active Category</p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-white font-bold">
                        {categoryStats.top?.percent ?? 0}%
                      </div>
                      <div>
                        <p className="font-semibold text-primary">{categoryStats.top?.category || 'N/A'}</p>
                        <p className="text-sm text-secondary">{categoryStats.top?.minutes || 0} min</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {categoryStats.items.slice(0, 5).map((item) => {
                      const colorClass = item.category === 'Coding' ? 'bg-info' :
                        item.category === 'Learning' ? 'bg-secondary' :
                        item.category === 'Project' || item.category === 'Projects' ? 'bg-warning' : 'bg-primary';
                      return (
                        <div key={item.category} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${colorClass}`} />
                            <span className="text-sm text-secondary">{item.category}</span>
                          </div>
                          <span className="text-sm font-medium text-primary">{item.percent}%</span>
                        </div>
                      );
                    })}
                    {categoryStats.items.length === 0 && (
                      <p className="text-sm text-tertiary">No activity yet</p>
                    )}
                  </div>
                </>
              )}
            </CardBody>
          </Card>
        </div>

        {/* Recent Activity Table */}
        <Card hover className="animate-slideUp">
          <CardHeader className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-primary">Recent Activity</h2>
            <button className="text-sm text-primary hover:text-secondary transition-colors font-medium">
              View All
            </button>
          </CardHeader>
          <CardBody>
            {loading ? (
              <div className="space-y-4">
                {[1,2,3,4,5].map((i) => (
                  <div key={i} className="flex gap-4 items-center">
                    <Skeleton variant="text" className="flex-1" />
                    <Skeleton variant="text" className="w-20" />
                    <Skeleton variant="text" className="w-16" />
                  </div>
                ))}
              </div>
            ) : recentLogs.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-theme">
                      <th className="text-left py-3 px-4 text-sm font-medium text-secondary">Title</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-secondary">Category</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-secondary">Duration</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-secondary">Date</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-secondary">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentLogs.map((log, index) => (
                      <tr 
                        key={log._id || index} 
                        className="border-b border-theme hover:bg-hover transition-colors"
                      >
                        <td className="py-4 px-4">
                          <p className="font-medium text-primary">{log.title}</p>
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-info/10 text-info">
                            {log.category || 'Coding'}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-secondary">
                          {Math.round(log.duration)} min
                        </td>
                        <td className="py-4 px-4 text-secondary text-sm">
                          {new Date(log.date).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 rounded-lg hover:bg-theme text-tertiary hover:text-info transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-theme text-tertiary hover:text-danger transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 mx-auto text-tertiary mb-4" />
                <p className="text-secondary">No activity logs yet</p>
                <p className="text-sm text-tertiary mt-1">Start tracking your progress today!</p>
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      <footer className="bg-card border-t border-theme mt-8">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-secondary">
          <div>
            <p className="font-semibold text-primary">DevTrack</p>
            <p className="text-tertiary">Track. Learn. Grow.</p>
          </div>
          <div className="flex flex-wrap gap-4 text-tertiary">
            <span>© {new Date().getFullYear()} DevTrack Labs</span>
            <a href="/privacy" className="hover:text-primary transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-primary transition-colors">Terms</a>
            <a href="mailto:support@devtrack.app" className="hover:text-primary transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
