import api from './api';

export const fetchGoals = () => api.get('/api/goals');
export const createGoal = (payload) => api.post('/api/goals', payload);
export const updateGoal = (id, payload) => api.put(`/api/goals/${id}`, payload);
export const deleteGoal = (id) => api.delete(`/api/goals/${id}`);
export const getGoalsProgress = () => api.get('/api/goals/progress');
