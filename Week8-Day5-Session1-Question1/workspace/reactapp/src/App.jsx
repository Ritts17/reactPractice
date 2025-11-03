import React, { useState } from 'react';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import './App.css';

function App() {
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
  };

  return (
    <div className="App">
      <h1>User List</h1>
      <UserList onUserClick={handleUserClick} />
      {selectedUserId && <UserDetails userId={selectedUserId} />}
    </div>
  );
}

export default App;
