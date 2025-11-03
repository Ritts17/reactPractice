import React, { useContext } from "react";
import { AuthProvider } from "./context/authContext";
import ThemeContext from "./context/themeContext";
import { ThemeProvider } from "./context/themeContext";
import SomeComponent from "./context/someComponent";
import Dashboard from "./controllers/Dashboard";
import UserProfile from "./controllers/userProfile";
import Settings from "./controllers/Settings";
import './App.css';

function InnerApp() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={theme === "dark" ? "App dark-theme" : "App"}>
      <Dashboard />
      <UserProfile />
      <Settings />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <SomeComponent>
        <ThemeProvider>
          <InnerApp />
        </ThemeProvider>
      </SomeComponent>
    </AuthProvider>
  );
}

export default App;
