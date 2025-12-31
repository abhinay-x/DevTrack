import api from './api';

export const getWeeklyActivity = () => api.get('/api/analytics/weekly');
export const getCategoryBreakdown = () => api.get('/api/analytics/category-breakdown');
export const getStreak = () => api.get('/api/analytics/streak');
