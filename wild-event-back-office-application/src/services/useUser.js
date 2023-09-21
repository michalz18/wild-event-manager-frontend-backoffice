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
  const initialUser = JSON.parse(sessionStorage.getItem('user') || '{}');

  const [user, setUser] = useState(initialUser);
  const [token, setToken] = useState(initialToken);

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    sessionStorage.setItem('token', userToken);
    const { token, ...restUserData } = userData;
    sessionStorage.setItem('user', JSON.stringify(restUserData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
