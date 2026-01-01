import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './Navbar';
import ErrorBoundary from './ErrorBoundary';

const Layout = () => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-theme">
        <Navbar />
        <main className="pt-16" role="main" aria-label="Main content">
          <Outlet />
        </main>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'var(--color-card-dark)',
              color: 'var(--color-text-primary-dark)',
            },
            success: {
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </ErrorBoundary>
  );
};

export default Layout;
