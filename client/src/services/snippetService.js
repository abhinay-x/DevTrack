import api from './api';

/**
 * @typedef {Object} Snippet
 * @property {string} _id - Snippet ID
 * @property {string} userId - User ID
 * @property {string} title - Snippet title
 * @property {string} language - Programming language
 * @property {string} code - Code content
 * @property {string} description - Optional description
 * @property {string[]} tags - Optional tags
 * @property {Date} createdAt - Creation date
 * @property {Date} updatedAt - Update date
 */

/**
 * Fetch snippets with optional pagination and filtering
 * @param {Object} params - Query parameters
 * @param {number} [params.page=1] - Page number
 * @param {number} [params.limit=20] - Items per page
 * @param {string} [params.language] - Filter by language
 * @param {string} [params.q] - Search query
 * @returns {Promise<Snippet[]>} Array of snippets
 */
export const fetchSnippets = (params = {}) => api.get('/api/snippets', { params }).then(res => res.data.snippets || res.data);

/**
 * Create a new code snippet
 * @param {Object} snippetData - Snippet data
 * @param {string} snippetData.title - Snippet title
 * @param {string} snippetData.language - Programming language
 * @param {string} snippetData.code - Code content
 * @param {string} [snippetData.description] - Optional description
 * @param {string[]} [snippetData.tags] - Optional tags
 * @returns {Promise<Snippet>} Created snippet
 */
export const createSnippet = (payload) => api.post('/api/snippets', payload);

/**
 * Update an existing snippet
 * @param {string} id - Snippet ID
 * @param {Object} snippetData - Updated snippet data
 * @returns {Promise<Snippet>} Updated snippet
 */
export const updateSnippet = (id, payload) => api.put(`/api/snippets/${id}`, payload);

/**
 * Delete a snippet
 * @param {string} id - Snippet ID
 * @returns {Promise<void>}
 */
export const deleteSnippet = (id) => api.delete(`/api/snippets/${id}`);
