import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const initialToken = sessionStorage.getItem('token');
  
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(initialToken);

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    sessionStorage.setItem('token', userToken);
    console.log(userData);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    sessionStorage.removeItem('token'); 
  };

  return (
    <UserContext.Provider value={{ user, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

