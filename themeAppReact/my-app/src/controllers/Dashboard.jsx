import React, { useContext } from "react";
import AuthContext from "../context/authContext";
import ThemeContext from "../context/themeContext";

const Dashboard = () => {
  const { isAuthenticated, userName } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      {isAuthenticated ? (
        <>
          <h1>Welcome, {userName}!</h1>
          <p>Current Theme: {theme}</p>
          <button onClick={toggleTheme}>Toggle Theme</button>
        </>
      ) : (
        <p>Please log in.</p>
      )}
    </div>
  );
};

export default Dashboard;
