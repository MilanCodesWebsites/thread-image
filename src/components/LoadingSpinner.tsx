import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-700 rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-black dark:border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
      <span className="ml-3 text-gray-600 dark:text-gray-300 font-medium">
        Processing Threads URL...
      </span>
    </div>
  );
};

export default LoadingSpinner;