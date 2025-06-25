import React from 'react';
import { Download, User, Image as ImageIcon } from 'lucide-react';
import { ThreadsPostData } from '../types/threads';
import { downloadImage, getImageFilename } from '../utils/download';

interface ResultsSectionProps {
  data: ThreadsPostData;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ data }) => {
  const handleDownloadPostImage = async () => {
    const filename = getImageFilename(data.image_post_url, 'threads-post');
    await downloadImage(data.image_post_url, filename);
  };

  const handleDownloadProfileImage = async () => {
    const filename = getImageFilename(data.profile_image_url, 'threads-profile');
    await downloadImage(data.profile_image_url, filename);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in">
        {/* Profile Section */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={data.profile_image_url}
                alt={`${data.username}'s profile`}
                className="w-12 h-12 rounded-full border-2 border-gray-200 dark:border-gray-600 object-cover cursor-pointer hover:opacity-80 transition-opacity"
                onClick={handleDownloadProfileImage}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.username)}&background=000000&color=fff`;
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-black dark:text-white truncate">
                @{data.username}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Threads User
              </p>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="p-6">
          {data.text && (
            <div className="mb-6">
              <p className="text-black dark:text-white leading-relaxed whitespace-pre-wrap">
                {data.text}
              </p>
            </div>
          )}

          {data.image_post_url && (
            <div className="mb-6">
              <img
                src={data.image_post_url}
                alt="Post content"
                className="w-full rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm max-h-96 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                onClick={handleDownloadPostImage}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Download Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {data.image_post_url && (
              <button
                onClick={handleDownloadPostImage}
                className="flex-1 bg-gray-900 dark:bg-gray-100 hover:bg-black dark:hover:bg-white text-white dark:text-gray-900 font-semibold py-3 px-4 rounded-lg
                         transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900/50 dark:focus:ring-gray-100/50
                         hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <ImageIcon className="w-4 h-4" />
                <span>Download Post Image</span>
              </button>
            )}
            
            {data.profile_image_url && (
              <button
                onClick={handleDownloadProfileImage}
                className="flex-1 bg-gray-100 dark:bg-gray-700 border-2 border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100 hover:bg-gray-900 dark:hover:bg-gray-100 hover:text-white dark:hover:text-gray-900
                         font-semibold py-3 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900/50 dark:focus:ring-gray-100/50
                         hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <User className="w-4 h-4" />
                <span>Download Profile Image</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;
