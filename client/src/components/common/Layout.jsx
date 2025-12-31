import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
      <Toaster position="top-right" />
    </div>
  );
};

export default Layout;
