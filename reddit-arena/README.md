# Reddit Arena

Reddit Arena is a web application that allows users to stay updated with multiple subreddits at once. Users can add subreddit lanes, view the latest posts, toggle between dark and light modes, and more.

## Features

- Add multiple subreddit lanes
- View the latest posts from each subreddit
- Dark mode toggle
- Clear all lanes
- Responsive design

## Technologies Used

- React
- Tailwind CSS
- Font Awesome
- Heroicons
- Vite

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/reddit-arena.git
   cd reddit-arena
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Open the application in your browser, default for vite projects:

   ```bash
   http://localhost:5173
   ```

2. Add your favorite subreddits using the "Add Lane" button.
3. Toggle between light and dark modes using the "Light Mode" or "Dark Mode" button.
4. Clear all lanes using the "Clear All" button.

## Project Structure

- `src/App.jsx`: Main application component.
- `src/components/SubredditArena.jsx`: Component for displaying multiple subreddit lanes.
- `src/components/SubredditCard.jsx`: Component for displaying a single subreddit lane.
- `src/components/SubredditLane.jsx`: Component for fetching and displaying posts from a subreddit.
- `public/index.html`: Main HTML file.
- `src/index.css`: Tailwind CSS configuration.
- `tailwind.config.js`: Tailwind CSS configuration file.

## Favicon

The favicon for this project is the same as the header icon of the site (`redditLogo.gif`). However, since animated GIFs are not supported as favicons, a static version of the GIF (`redditLogo.png`) is used as the favicon.

## Credits

This project has been created for [https://roadmap.sh/projects/reddit-client](https://roadmap.sh/projects/reddit-client) portfolio projects.

## License

This project is licensed under the MIT License.
