// src/controllers/analyticsController.js
const DailyLog = require('../models/DailyLog');
const User = require('../models/User');

// @desc    Weekly minutes per day
// @route   GET /api/analytics/weekly
// @access  Private
exports.getWeeklyActivity = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const pastWeek = new Date(today);
    pastWeek.setDate(pastWeek.getDate() - 6); // inclusive of today

    const logs = await DailyLog.aggregate([
      {
        $match: {
          userId: req.user._id,
          date: { $gte: pastWeek, $lte: today },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$date' },
          },
          totalMinutes: { $sum: '$duration' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Build response with all 7 days even if zero
    const result = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(pastWeek);
      day.setDate(pastWeek.getDate() + i);
      const key = day.toISOString().split('T')[0];
      const entry = logs.find((l) => l._id === key);
      result.push({
        date: key,
        minutes: entry ? entry.totalMinutes : 0,
      });
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Category breakdown
// @route   GET /api/analytics/category-breakdown
// @access  Private
exports.getCategoryBreakdown = async (req, res) => {
  try {
    const breakdown = await DailyLog.aggregate([
      { $match: { userId: req.user._id } },
      {
        $group: {
          _id: '$category',
          totalMinutes: { $sum: '$duration' },
        },
      },
    ]);
    res.json(breakdown);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get current streak
// @route   GET /api/analytics/streak
// @access  Private
exports.getStreak = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ streak: user.streak });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
