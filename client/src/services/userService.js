import api from './api';

/**
 * @typedef {Object} User
 * @property {string} _id - User ID
 * @property {string} username - Username
 * @property {string} email - Email address
 * @property {string} [profilePicture] - Profile picture URL
 * @property {string} [theme] - User theme preference
 * @property {number} [streak] - Current streak
 * @property {Date} [lastActiveDate] - Last active date
 * @property {string} token - JWT token
 */

/**
 * Get current user profile
 * @returns {Promise<User>} Current user data
 */
export const getMe = () => api.get('/api/auth/me');

/**
 * Update user profile
 * @param {Object} profileData - Profile data to update
 * @param {string} [profileData.username] - New username
 * @param {string} [profileData.email] - New email
 * @param {string} [profileData.profilePicture] - Profile picture URL
 * @param {string} [profileData.password] - New password
 * @param {string} [profileData.theme] - Theme preference
 * @returns {Promise<User>} Updated user data
 */
export const updateProfile = (payload) => api.put('/api/auth/profile', payload);
