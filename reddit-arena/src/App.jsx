import React, { useState } from 'react';
import SubredditArena from './components/SubredditArena';
import { PlusIcon, SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import './index.css';

const App = () => {
  const [subreddits, setSubreddits] = useState([]);
  const [newSubreddit, setNewSubreddit] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isWelcomeVisible, setIsWelcomeVisible] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    setIsLoadingSuggestions(true);
    try {
      const res = await fetch(`https://www.reddit.com/api/subreddit_autocomplete_v2.json?query=${encodeURIComponent(query)}&limit=10`);
      const data = await res.json();
      setSuggestions(data.data.children.map(child => child.data.display_name));
    } catch {
      setSuggestions([]);
    }
    setIsLoadingSuggestions(false);
  };

  const handleAddSubreddit = () => {
    if (newSubreddit.trim() !== '') {
      setSubreddits([...subreddits, newSubreddit.trim()]);
      setNewSubreddit('');
      setIsModalOpen(false);
      setIsWelcomeVisible(false);
    }
  };

  const handleDeleteSubreddit = (indexToDelete) => {
    setSubreddits(subreddits.filter((_, index) => index !== indexToDelete));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''} min-h-screen flex flex-col`}>
      {/* Fixed Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 gradient-bg shadow-md`}>
        <div className="container mx-auto px-4 h-16 flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center">
            <img 
              src="/images/Animation - 1748099890527.gif" 
              alt="Reddit Arena" 
              className="h-12 w-12 rounded-full cursor-pointer"
              onClick={() => setIsWelcomeVisible(true)}
            />
          </div>

          {/* Right Section - Dark Mode Toggle and Add Lane */}
          <div className="flex items-center space-x-4">
            {!isWelcomeVisible && (
              <>
                <button
                  className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full flex items-center btn-font"
                  onClick={() => setIsModalOpen(true)}
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Add Lane
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full flex items-center btn-font"
                  onClick={() => setSubreddits([])}
                >
                  Clear All
                </button>
              </>
            )}
            <button
              className={`font-bold py-2 px-4 rounded flex items-center btn-font
                ${isDarkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-300 hover:bg-gray-200 text-black'}`}
              onClick={toggleDarkMode}
            >
              {isDarkMode ? <SunIcon className="h-5 w-5 mr-2" /> : <MoonIcon className="h-5 w-5 mr-2" />}
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>
      </header>

      <div className="relative w-full flex-1 pt-16"> {/* Added pt-16 to account for header height */}
        {/* Welcome Screen */}
        <div 
          className={`absolute inset-0 flex items-center justify-center z-20
            ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}
            transition-all duration-500 
            ${isWelcomeVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        >
          <div className={`p-8 rounded-lg shadow-lg w-full max-w-3xl text-center relative glass ${isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'}`}>
            <h1 className="text-3xl font-bold mb-4">Welcome to Reddit Arena!</h1>
            <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
            Stay on top of all your favorite subreddits in one place! Just add the ones you love as lanes and see their latest posts side by side. 
            It’s a super handy way for moderators, power users, or anyone who likes to follow multiple communities at once.
            </p>
            <div className="flex justify-center mb-4">
              <button
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full flex items-center btn-font"
                onClick={() => setIsModalOpen(true)}
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Your First Lane
              </button>
            </div>
          </div>
        </div>

        {/* Subreddit Arena */}
        <div 
          className={`absolute inset-0 z-10 pt-16
            ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}
            transition-opacity duration-500 
            ${isWelcomeVisible ? 'opacity-0' : 'opacity-100'}`}
          style={{ pointerEvents: isWelcomeVisible ? 'none' : 'auto' }}
        >
          <SubredditArena 
            subreddits={subreddits} 
            isDarkMode={isDarkMode} 
            onDeleteSubreddit={handleDeleteSubreddit}
          />
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className={`p-6 rounded-lg shadow-lg w-full max-w-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
              <h2 className="text-xl font-bold mb-4">Enter subreddit name</h2>
              <input
                type="text"
                placeholder="Enter subreddit name (without r/)"
                className={`border px-4 py-2 mb-4 w-full rounded
                  ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-400'}`}
                value={newSubreddit}
                onChange={(e) => {
                  setNewSubreddit(e.target.value);
                  fetchSuggestions(e.target.value);
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddSubreddit();
                  }
                }}
                autoFocus
              />
              {isLoadingSuggestions && <div className="text-sm text-gray-500">Loading...</div>}
              {suggestions.length > 0 && (
                <ul className="border rounded bg-white dark:bg-gray-700 max-h-40 overflow-y-auto mb-2">
                  {suggestions.map((s) => (
                    <li
                      key={s}
                      className="px-4 py-2 cursor-pointer hover:bg-orange-100 dark:hover:bg-gray-600"
                      onClick={() => {
                        setNewSubreddit(s);
                        setSuggestions([]);
                      }}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex justify-end">
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2 btn-font"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded btn-font"
                  onClick={handleAddSubreddit}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Footer */}
      {isWelcomeVisible && (
        <footer className="bg-orange-500 bg-opacity-95 text-white py-2 transition-all duration-1000 hover:bg-opacity-50">
          <div className="container mx-auto flex justify-center space-x-4">
            <a href="https://github.com/thenameisshuvo" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github text-xl"></i>
            </a>
            <a href="https://www.linkedin.com/in/tenameisshuvo" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin text-xl"></i>
            </a>
          </div>
          <div className="text-center mt-1 btn-font text-sm">
            Made by Tanvir Rahman Shuvo
          </div>
        </footer>
      )}
    </div>
  );
};
export default App;