import React from 'react';
import { ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 w-full py-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 z-40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2">
          <p className="text-gray-600 dark:text-gray-300 text-sm flex items-center justify-center space-x-2">
            <span>Powered by</span>
            <a
              href="https://threadimage-api.laravel.cloud"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 font-medium inline-flex items-center space-x-1 transition-colors duration-200"
            >
              <span>threadimage-api.laravel.cloud</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Built by{' '}
            <a
              href="https://onrooleyy.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 font-medium transition-colors duration-200"
            >
              prince
            </a>
            {' '}and{' '}
            <a
              href="mailto:dammysoji11@gmail.com"
              className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 font-medium transition-colors duration-200"
            >
              soji
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
