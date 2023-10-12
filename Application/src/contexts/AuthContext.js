// AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);

  const logOut = () => {
    setUserLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isUserLoggedIn, setUserLoggedIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
