import axios from 'axios';

/**
 * Axios instance configured for DevTrack API
 * @type {import('axios').AxiosInstance}
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  withCredentials: false,
});

// Request interceptor to attach token
api.interceptors.request.use((config) => {
  const stored = localStorage.getItem('devtrack_user');
  if (stored) {
    const { token } = JSON.parse(stored);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message || 'Request failed';
    console.error('API Error:', message);

    if (status === 401) {
      localStorage.removeItem('devtrack_user');
      // Avoid infinite redirects if already on auth pages
      const authPaths = ['/login', '/register'];
      if (!authPaths.includes(window.location.pathname)) {
        window.location.href = '/login?session=expired';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
