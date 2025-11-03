import React, { createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const isAuthenticated = true;
  const userName = "Ritesh";

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
