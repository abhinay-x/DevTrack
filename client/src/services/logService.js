import api from './api';

export const fetchLogs = (params = {}) => api.get('/api/logs', { params });
export const createLog = (payload) => api.post('/api/logs', payload);
export const updateLog = (id, payload) => api.put(`/api/logs/${id}`, payload);
export const deleteLog = (id) => api.delete(`/api/logs/${id}`);
