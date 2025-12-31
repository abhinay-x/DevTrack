import api from './api';

export const fetchSnippets = (params = {}) => api.get('/api/snippets', { params });
export const createSnippet = (payload) => api.post('/api/snippets', payload);
export const updateSnippet = (id, payload) => api.put(`/api/snippets/${id}`, payload);
export const deleteSnippet = (id) => api.delete(`/api/snippets/${id}`);
