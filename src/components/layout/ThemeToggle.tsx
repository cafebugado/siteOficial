import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className="relative h-10 w-10 rounded-full bg-transparent p-1 transition-colors hover:bg-gray-200/20 focus:outline-none"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative h-full w-full overflow-hidden rounded-full">
        <span
          className={`absolute inset-0 flex transform items-center justify-center transition-transform duration-500 ${
            theme === 'dark' ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <Moon className="h-5 w-5 text-white" />
        </span>
        <span
          className={`absolute inset-0 flex transform items-center justify-center transition-transform duration-500 ${
            theme === 'dark' ? '-translate-y-full' : 'translate-y-0'
          }`}
        >
          <Sun className="h-5 w-5 text-yellow-400" />
        </span>
      </div>
    </button>
  );
}