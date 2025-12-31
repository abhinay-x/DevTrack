import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Login from './pages/Login';
import Snippets from './pages/Snippets';
import Goals from './pages/Goals';
import Layout from './components/common/Layout';
import PrivateRoute from './components/common/PrivateRoute';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/snippets" element={<Snippets />} />
              <Route path="/goals" element={<Goals />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App
