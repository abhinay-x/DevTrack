import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
      <Link to="/" className="text-indigo-600 font-semibold text-lg">
        DevTrack
      </Link>
      <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
        <Link to="/" className="hover:text-indigo-600">Dashboard</Link>
        <Link to="/snippets" className="hover:text-indigo-600">Snippets</Link>
        <Link to="/goals" className="hover:text-indigo-600">Goals</Link>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
