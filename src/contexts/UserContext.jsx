import { createContext, useState } from 'react';

const UserContext = createContext();

function UserProvider({ children }) {
  const getUserFromToken = () => {
    const token = localStorage.getItem('token');
    
    if (!token) return null;
    
    const payload = JSON.parse(atob(token.split('.')[1]));
    
    if (payload.exp && payload.exp < Date.now() / 1000) {
      localStorage.removeItem('token');
      return null;
    }
    
    return payload;
  };

  const [user, setUser] = useState(getUserFromToken());
  
  const value = { user, setUser };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };