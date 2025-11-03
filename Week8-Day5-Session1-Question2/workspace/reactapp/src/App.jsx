import React, { useState, useEffect } from 'react';
import './App.css';
import BreedList from './components/BreedList';

function App() {
  const [breeds, setBreeds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBreeds = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://api.example.com/breeds');
        if (!response.ok) {
          throw new Error('Failed to fetch breeds');
        }
        const data = await response.json();
        setBreeds(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBreeds();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBreeds = breeds.filter((breed) =>
    breed.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="App">
      <h1>Dog Breeds</h1>
      <input
        type="text"
        placeholder="Search breeds..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <BreedList breeds={filteredBreeds} />
    </div>
  );
}

export default App;
