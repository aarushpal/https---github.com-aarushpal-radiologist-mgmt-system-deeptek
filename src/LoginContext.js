// LoginContext.js
import React, { createContext, useState } from "react";

// Create the context
export const LoginContext = createContext();

// Create the provider component
export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};
