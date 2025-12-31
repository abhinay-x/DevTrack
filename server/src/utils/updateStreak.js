// src/utils/updateStreak.js
const User = require('../models/User');

/**
 * Update a user's streak based on their last activity date.
 * Call this after a new DailyLog is created.
 * @param {string} userId
 */
const updateUserStreak = async (userId) => {
  const user = await User.findById(userId);
  if (!user) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastActive = new Date(user.lastActiveDate || today);
  lastActive.setHours(0, 0, 0, 0);

  const diffDays = (today - lastActive) / (1000 * 60 * 60 * 24);

  if (diffDays === 1) {
    user.streak += 1; // continued streak
  } else if (diffDays > 1) {
    user.streak = 1; // reset streak
  }

  user.lastActiveDate = new Date();
  await user.save();
};

module.exports = updateUserStreak;
