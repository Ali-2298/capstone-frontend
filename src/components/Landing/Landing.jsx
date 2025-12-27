import { Link } from 'react-router';

const Landing = () => {
  return (
    <main style={{ textAlign: 'center', padding: '50px 20px' }}>
      <h1>Welcome to Backlog Manager</h1>
      <p style={{ fontSize: '1.2rem', margin: '20px 0' }}>
        Keep track of all the movies you want to watch, games you want to play, 
        and series you want to binge!
      </p>
      
      <div style={{ margin: '40px 0' }}>
        <h2>Features</h2>
        <ul style={{ listStyle: 'none', padding: 0, maxWidth: '600px', margin: '20px auto' }}>
          <li style={{ margin: '15px 0' }}>📝 Add games, movies, and series to your backlog</li>
          <li style={{ margin: '15px 0' }}>📊 Track your progress (Backlog, In Progress, Completed, Dropped)</li>
          <li style={{ margin: '15px 0' }}>🎮 Organize by platform (PS5, Steam, Netflix, etc.)</li>
          <li style={{ margin: '15px 0' }}>⭐ Set priorities to know what to tackle next</li>
          <li style={{ margin: '15px 0' }}>📝 Add notes and reminders</li>
        </ul>
      </div>

      <div style={{ marginTop: '60px', color: '#666' }}>
        <h3>Why Backlog Manager?</h3>
        <p style={{ maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
          With so many great games, movies, and series available, it's easy to forget 
          what you wanted to experience first or next. Backlog Manager helps you organize your 
          entertainment wishlist, track what you're currently enjoying, and celebrate 
          what you've completed. Never lose track of any recommendation that you got from a friend!
        </p>
      </div>
    </main>
  );
};

export default Landing;