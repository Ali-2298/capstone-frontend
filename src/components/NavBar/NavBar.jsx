import { useContext } from 'react';
import { Link } from 'react-router';
import { UserContext } from '../../contexts/UserContext';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold hover:text-blue-400 transition">
            Backlog Manager
          </Link>
          
          {user ? (
            <div className="flex items-center gap-6">
              <span className="text-gray-300">Welcome, {user.username}</span>
              <Link 
                to="/" 
                className="hover:text-blue-400 transition"
              >
                Dashboard
              </Link>
              <button 
                onClick={handleSignOut}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link 
                to="/" 
                className="hover:text-blue-400 transition"
              >
                Home
              </Link>
              <Link 
                to="/sign-up"
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded transition"
              >
                Sign Up
              </Link>
              <Link 
                to="/sign-in"
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded transition"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;