import React from 'react';

interface LoadingScreenProps {
  isVisible: boolean;
  theme: 'light' | 'dark';
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isVisible, theme }) => {
  const logoUrl = theme === 'dark' 
    ? 'https://otiktpyazqotihijbwhm.supabase.co/storage/v1/object/public/images/5f2b32ef-589f-4e5d-bd86-41f6bd6940fa-threads-seeklogo.png'
    : 'https://otiktpyazqotihijbwhm.supabase.co/storage/v1/object/public/images/a4a43b40-53e9-4450-a894-ac5eb52b4d8e-threads-seeklogo.png';

  return (
    <div
      className={`fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col items-center justify-center transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col items-center space-y-8">
        {/* Logo */}
        <div className="w-24 h-24 sm:w-32 sm:h-32 animate-pulse">
          <img
            src={logoUrl}
            alt="Threads Logo"
            className="w-full h-full object-contain"
          />
        </div>
        
        {/* Progress Bar */}
        <div className="w-64 sm:w-80">
          <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-black dark:bg-white rounded-full animate-loading-bar"></div>
          </div>
        </div>
        
        {/* Loading Text */}
        <p className="text-black dark:text-white font-medium text-lg animate-pulse">
          Loading ThreadImage...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;