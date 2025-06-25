import React, { useState } from 'react';
import { Search, Loader } from 'lucide-react';

interface InputSectionProps {
  onSubmit: (url: string) => void;
  loading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ onSubmit, loading }) => {
  const [url, setUrl] = useState('');
  const [isValid, setIsValid] = useState(true);

  const validateUrl = (input: string): boolean => {
    if (!input.trim()) return false;
    try {
      const urlObj = new URL(input);
      return urlObj.hostname.includes('threads.com');
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedUrl = url.trim();
    
    if (!validateUrl(trimmedUrl)) {
      setIsValid(false);
      return;
    }
    
    setIsValid(true);
    onSubmit(trimmedUrl);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);
    if (!isValid && value.trim()) {
      setIsValid(validateUrl(value));
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 sm:p-8 animate-slide-up">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="url"
              value={url}
              onChange={handleInputChange}
              placeholder="https://www.threads.com/@username/post/1234567890"
              className={`w-full px-4 py-3 pr-12 rounded-lg border-2 transition-all duration-200 font-medium
                ${isValid 
                  ? 'border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20' 
                  : 'border-red-300 dark:border-red-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                }
                bg-gray-50 dark:bg-gray-700 text-black dark:text-white
                placeholder:text-gray-500 dark:placeholder:text-gray-400
                focus:outline-none
              `}
              disabled={loading}
              aria-label="Threads post URL"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
          
          {!isValid && (
            <p className="text-red-500 dark:text-red-400 text-sm font-medium">
              Please enter a valid Threads URL (threads.com)
            </p>
          )}
          
          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="w-full bg-gray-900 dark:bg-gray-100 hover:bg-black dark:hover:bg-white 
                     disabled:bg-gray-400 dark:disabled:bg-gray-500 disabled:text-gray-200 dark:disabled:text-gray-400
                     text-white dark:text-gray-900 font-semibold py-3 px-6 rounded-lg transition-all duration-200 
                     focus:outline-none focus:ring-2 focus:ring-gray-900/50 dark:focus:ring-gray-100/50
                     disabled:cursor-not-allowed flex items-center justify-center space-x-2
                     hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>Fetch Post</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputSection;