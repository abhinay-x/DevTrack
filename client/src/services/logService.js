import api from './api';

/**
 * @typedef {Object} Log
 * @property {string} _id - Log ID
 * @property {string} userId - User ID
 * @property {string} title - Log title
 * @property {string} category - Log category
 * @property {number} duration - Duration in minutes
 * @property {string} date - Date string
 * @property {string} notes - Optional notes
 * @property {Date} createdAt - Creation date
 * @property {Date} updatedAt - Update date
 */

/**
 * Fetch logs with optional pagination and filtering
 * @param {Object} params - Query parameters
 * @param {number} [params.page=1] - Page number
 * @param {number} [params.limit=20] - Items per page
 * @param {string} [params.category] - Filter by category
 * @param {string} [params.startDate] - Filter by start date
 * @param {string} [params.endDate] - Filter by end date
 * @returns {Promise<Log[]>} Array of logs
 */
export const fetchLogs = (params = {}) => api.get('/api/logs', { params }).then(res => res.data.logs || res.data);

/**
 * Create a new log entry
 * @param {Object} logData - Log data
 * @param {string} logData.title - Log title
 * @param {string} logData.category - Log category
 * @param {number} logData.duration - Duration in minutes
 * @param {string} logData.date - Date string
 * @param {string} [logData.notes] - Optional notes
 * @returns {Promise<Log>} Created log
 */
export const createLog = (payload) => api.post('/api/logs', payload);

/**
 * Update an existing log
 * @param {string} id - Log ID
 * @param {Object} logData - Updated log data
 * @returns {Promise<Log>} Updated log
 */
export const updateLog = (id, payload) => api.put(`/api/logs/${id}`, payload);

/**
 * Delete a log entry
 * @param {string} id - Log ID
 * @returns {Promise<void>}
 */
export const deleteLog = (id) => api.delete(`/api/logs/${id}`);
