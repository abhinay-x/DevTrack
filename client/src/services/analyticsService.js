import api from './api';

/**
 * @typedef {Object} WeeklyActivity
 * @property {string} _id - Day of week
 * @property {number} minutes - Total minutes for that day
 */

/**
 * @typedef {Object} CategoryBreakdown
 * @property {string} _id - Category name
 * @property {number} totalMinutes - Total minutes for category
 */

/**
 * @typedef {Object} StreakData
 * @property {number} streak - Current streak count
 */

/**
 * Get weekly activity data
 * @returns {Promise<{data: WeeklyActivity[]}>} Weekly activity data
 */
export const getWeeklyActivity = () => api.get('/api/analytics/weekly');

/**
 * Get category breakdown data
 * @returns {Promise<{data: CategoryBreakdown[]}>} Category breakdown data
 */
export const getCategoryBreakdown = () => api.get('/api/analytics/category-breakdown');

/**
 * Get user streak data
 * @returns {Promise<{data: StreakData}>} Streak data
 */
export const getStreak = () => api.get('/api/analytics/streak');
