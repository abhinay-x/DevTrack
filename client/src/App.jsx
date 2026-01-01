import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Login from './pages/Login';
import Snippets from './pages/Snippets';
import Goals from './pages/Goals';
import Logs from './pages/Logs';
import Layout from './components/common/Layout';
import PrivateRoute from './components/common/PrivateRoute';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Support from './pages/Support';
import Landing from './pages/Landing';
import './index.css';

function TitleManager() {
  const location = useLocation();
  useEffect(() => {
    const map = {
      '/': 'DevTrack · Landing',
      '/dashboard': 'DevTrack · Dashboard',
      '/logs': 'DevTrack · Logs',
      '/snippets': 'DevTrack · Snippets',
      '/goals': 'DevTrack · Goals',
      '/profile': 'DevTrack · Profile',
      '/login': 'DevTrack · Login',
      '/register': 'DevTrack · Register',
      '/privacy': 'DevTrack · Privacy',
      '/terms': 'DevTrack · Terms',
      '/support': 'DevTrack · Support',
    };
    document.title = map[location.pathname] || 'DevTrack';
  }, [location.pathname]);
  return null;
}

const AppShell = () => (
  <PrivateRoute>
    <Layout />
  </PrivateRoute>
);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <TitleManager />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/support" element={<Support />} />

            <Route element={<AppShell />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/logs" element={<Logs />} />
              <Route path="/snippets" element={<Snippets />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App
