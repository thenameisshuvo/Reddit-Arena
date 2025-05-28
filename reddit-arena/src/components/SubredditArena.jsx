import React from 'react';
import SubredditCard from './SubredditCard';

const SubredditArena = ({ subreddits, isDarkMode, onDeleteSubreddit }) => {
  return (
    <div className="h-[calc(100vh-64px)] overflow-hidden">
      {subreddits.length === 0 ? (
        <div className={`flex flex-col items-center justify-center h-full ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <p className="text-2xl font-bold mb-2">Click on the Add Lane button 👻</p>
          <p className="text-lg">Add your favorite subreddits to get started!</p>
        </div>
      ) : (
        <div className="flex gap-2 p-2 h-full overflow-x-auto">
          {subreddits.map((subreddit, index) => (
            <SubredditCard
              key={`${subreddit}-${index}`}
              subreddit={subreddit}
              isDarkMode={isDarkMode}
              onDelete={onDeleteSubreddit}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SubredditArena;