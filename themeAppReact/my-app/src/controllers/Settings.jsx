import React, { useContext } from "react";
import ThemeContext from "../context/themeContext";

const Settings = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <h2>Settings</h2>
      <p>Current Theme: {theme}</p>
      <button onClick={toggleTheme}>Switch Theme</button>
    </div>
  );
};

export default Settings;
