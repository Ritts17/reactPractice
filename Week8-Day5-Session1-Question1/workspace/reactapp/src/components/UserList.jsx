import React from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

function UserList({ onUserClick }) {
  const { data: users, isLoading, isError, error } = useQuery({queryKey: ['users'], queryFn: fetchUsers});

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {users && users.map(user => (
        <li key={user.id} onClick={() => onUserClick(user.id)} style={{cursor: 'pointer'}}>
          {user.name}
        </li>
      ))}
    </ul>
  );
}

export default UserList;
