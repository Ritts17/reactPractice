import React from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchUser = async (userId) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
};

function UserDetails({ userId }) {
  const { data: user, isLoading, isError, error } = useQuery({queryKey: ['user', userId], queryFn: () => fetchUser(userId)});

  if (isLoading) return <p>Loading user details...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>{user?.name}</h2>
      <p>Email: {user?.email}</p>
      <p>Phone: {user?.phone}</p>
      <p>Website: {user?.website}</p>
    </div>
  );
}

export default UserDetails;
