import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  const logoUrl = theme === 'dark' 
    ? 'https://otiktpyazqotihijbwhm.supabase.co/storage/v1/object/public/images/5f2b32ef-589f-4e5d-bd86-41f6bd6940fa-threads-seeklogo.png'
    : 'https://otiktpyazqotihijbwhm.supabase.co/storage/v1/object/public/images/a4a43b40-53e9-4450-a894-ac5eb52b4d8e-threads-seeklogo.png';

  return (
    <header className="w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Threads Logo */}
            <div className="w-12 h-12 sm:w-14 sm:h-14">
              <img
                src={logoUrl}
                alt="Threads Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-white font-manrope">
                ThreadImage
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1">
                Paste a Threads post URL to extract and download images
              </p>
            </div>
          </div>
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center transition-all duration-200 hover:scale-105 hover:bg-gray-200 dark:hover:bg-gray-600"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            ) : (
              <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;