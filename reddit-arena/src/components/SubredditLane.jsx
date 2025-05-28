import React, { useState, useEffect } from 'react';
import { ArrowPathIcon, XMarkIcon } from '@heroicons/react/24/solid';

const SubredditLane = ({ subreddit, isDarkMode, onDelete, index }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://www.reddit.com/r/${subreddit}.json?limit=10`);
      if (!response.ok) {
        throw new Error('not_found');
      }
      const json = await response.json();
      setPosts(json.data.children);
      setError(null);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [subreddit]);

  const getErrorMessage = (error) => {
    if (error.message === 'not_found') {
      return (
        <div className="text-center p-6">
          <p className="text-lg mb-2">Are you sure it exists? 🤔</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Double-check the subreddit name and try again
          </p>
        </div>
      );
    }
    return (
      <div className="text-center p-6">
        <p className="text-lg mb-2">Oops! Something went wrong 😅</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Please try again later
        </p>
      </div>
    );
  };

  return (
    <div className={`h-full flex flex-col glass mt-4 ${isDarkMode ? 'bg-gray-800/80 text-white' : 'bg-white/80 text-black'}`}>
      {/* Updated Header Section */}
      <div className={`p-4 border-b flex-shrink-0 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold truncate max-w-[200px]">r/{subreddit}</h2>
          <div className="flex items-center space-x-2 ml-2">
            <button
              onClick={fetchPosts}
              className={`p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700`}
              title="Refresh"
            >
              <ArrowPathIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => onDelete(index)}
              className={`p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700`}
              title="Remove"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto mt-4 pb-4"> {/* Added pb-4 to add padding at the bottom */}
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        ) : error ? (
          getErrorMessage(error)
        ) : (
          <div className="p-4">
            <ul className="space-y-4">
              {posts.map((post) => (
                <li 
                  key={post.data.id} 
                  className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} 
                    transition-colors duration-200`}
                >
                  <a 
                    href={`https://reddit.com${post.data.permalink}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <h3 className="font-medium mb-2">{post.data.title}</h3>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      ↑ {post.data.ups.toLocaleString()} • {post.data.num_comments.toLocaleString()} comments
                    </div>
                  </a>
                </li>
              ))}
            </ul>
            
            {/* View More Button */}
            <div className="mt-6 text-center">
              <a
                href={`https://reddit.com/r/${subreddit}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded btn-font btn-glow"
              >
                View More in r/{subreddit}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubredditLane;