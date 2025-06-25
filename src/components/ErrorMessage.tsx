import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onDismiss }) => {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 animate-fade-in">
      <div className="flex items-center">
        <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 flex-shrink-0" />
        <p className="ml-3 text-red-700 dark:text-red-300 text-sm font-medium">
          {message}
        </p>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="ml-auto text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;