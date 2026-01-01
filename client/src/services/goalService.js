import api from './api';

/**
 * @typedef {Object} Goal
 * @property {string} _id - Goal ID
 * @property {string} userId - User ID
 * @property {string} title - Goal title
 * @property {string} description - Optional description
 * @property {number} targetHours - Target hours to complete
 * @property {number} currentHours - Current hours logged
 * @property {string} deadline - Deadline date
 * @property {string} category - Goal category
 * @property {string} status - Goal status (Active, Completed, Paused)
 * @property {Date} completedAt - Completion date (if completed)
 * @property {Date} createdAt - Creation date
 * @property {Date} updatedAt - Update date
 */

/**
 * Fetch goals with optional pagination and filtering
 * @param {Object} params - Query parameters
 * @param {number} [params.page=1] - Page number
 * @param {number} [params.limit=20] - Items per page
 * @param {string} [params.status] - Filter by status
 * @returns {Promise<Goal[]>} Array of goals
 */
export const fetchGoals = (params = {}) => api.get('/api/goals', { params }).then(res => res.data.goals || res.data);

/**
 * Create a new goal
 * @param {Object} goalData - Goal data
 * @param {string} goalData.title - Goal title
 * @param {string} [goalData.description] - Optional description
 * @param {number} goalData.targetHours - Target hours
 * @param {number} [goalData.currentHours=0] - Current hours
 * @param {string} goalData.deadline - Deadline date
 * @param {string} goalData.category - Goal category
 * @returns {Promise<Goal>} Created goal
 */
export const createGoal = (payload) => api.post('/api/goals', payload);

/**
 * Update an existing goal
 * @param {string} id - Goal ID
 * @param {Object} goalData - Updated goal data
 * @returns {Promise<Goal>} Updated goal
 */
export const updateGoal = (id, payload) => api.put(`/api/goals/${id}`, payload);

/**
 * Update goal status
 * @param {string} id - Goal ID
 * @param {string} status - New status
 * @returns {Promise<Goal>} Updated goal
 */
export const updateGoalStatus = (id, status) => api.put(`/api/goals/${id}`, { status });

/**
 * Delete a goal
 * @param {string} id - Goal ID
 * @returns {Promise<void>}
 */
export const deleteGoal = (id) => api.delete(`/api/goals/${id}`);

/**
 * Get goals progress statistics
 * @returns {Promise<Object>} Progress statistics
 */
export const getGoalsProgress = () => api.get('/api/goals/progress');
