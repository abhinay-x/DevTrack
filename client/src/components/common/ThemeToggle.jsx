import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const toggle = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
};

export default ThemeToggle;
