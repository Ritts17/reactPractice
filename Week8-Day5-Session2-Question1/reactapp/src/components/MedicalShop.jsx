  import React, { useState, useEffect } from 'react';

const useQuery = () => {
  const getQuery = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('search') || '';
  };

  const [query, setQuery] = useState(getQuery);

  const updateQuery = (newQuery) => {
    const url = new URL(window.location);
    if (newQuery) {
      url.searchParams.set('search', newQuery);
    } else {
      url.searchParams.delete('search');
    }
    window.history.replaceState({}, '', url);
    setQuery(newQuery);
  };

  return [query, updateQuery];
};

const MedicalShop = () => {
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Paracetamol', quantity: 100, price: 0.5 },
    { id: 2, name: 'Aspirin', quantity: 50, price: 0.8 },
    { id: 3, name: 'Band-Aid', quantity: 200, price: 0.3 }
  ]);

  const [newMedicine, setNewMedicine] = useState({
    name: '',
    quantity: '',
    price: ''
  });

  const [searchTerm, updateSearchTerm] = useQuery();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlSearchTerm = params.get('search') || '';
    if (urlSearchTerm !== searchTerm) {
      updateSearchTerm(urlSearchTerm);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMedicine(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddMedicine = () => {
    // Validate that all fields are filled
    if (!newMedicine.name || !newMedicine.quantity || !newMedicine.price) {
      alert('Please fill in all fields');
      return;
    }

    // Create new medicine with unique ID
    const medicine = {
      id: Math.max(...inventory.map(item => item.id), 0) + 1,
      name: newMedicine.name,
      quantity: parseInt(newMedicine.quantity),
      price: parseFloat(newMedicine.price)
    };

    // Add to inventory and clear form
    setInventory(prev => [...prev, medicine]);
    setNewMedicine({ name: '', quantity: '', price: '' });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    updateSearchTerm(value);
  };

  // Filter inventory based on search term (case-insensitive)
  const filteredInventory = inventory.filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Main heading */}
      <h1>Medical Shop Inventory</h1>
      
      {/* Search input with accessibility */}
      <div>
        <label htmlFor="search-input" style={{ 
          position: 'absolute', 
          left: '-10000px', 
          width: '1px', 
          height: '1px', 
          overflow: 'hidden' 
        }}>
          Search medicines by name
        </label>
        <input
          id="search-input"
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          aria-label="Search medicines by name"
        />
      </div>

      {/* Inventory table */}
      {filteredInventory.length === 0 && searchTerm ? (
        <p>No medicines found matching "{searchTerm}".</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price ($)</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map(medicine => {
              const isHighlighted = searchTerm && 
                medicine.name.toLowerCase().includes(searchTerm.toLowerCase());
              
              return (
                <tr 
                  key={medicine.id}
                  className={isHighlighted ? 'highlight' : ''}
                >
                  <td>{medicine.name}</td>
                  <td>{medicine.quantity}</td>
                  <td>{medicine.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* Add new medicine section */}
      <h2>Add New Medicine</h2>
      <div>
        <label htmlFor="name-input" style={{ 
          position: 'absolute', 
          left: '-10000px', 
          width: '1px', 
          height: '1px', 
          overflow: 'hidden' 
        }}>
          Medicine Name
        </label>
        <input
          id="name-input"
          type="text"
          name="name"
          placeholder="Name"
          value={newMedicine.name}
          onChange={handleInputChange}
          aria-label="Medicine name"
        />
        
        <label htmlFor="quantity-input" style={{ 
          position: 'absolute', 
          left: '-10000px', 
          width: '1px', 
          height: '1px', 
          overflow: 'hidden' 
        }}>
          Medicine Quantity
        </label>
        <input
          id="quantity-input"
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={newMedicine.quantity}
          onChange={handleInputChange}
          aria-label="Medicine quantity"
        />
        
        <label htmlFor="price-input" style={{ 
          position: 'absolute', 
          left: '-10000px', 
          width: '1px', 
          height: '1px', 
          overflow: 'hidden' 
        }}>
          Medicine Price
        </label>
        <input
          id="price-input"
          type="number"
          name="price"
          placeholder="Price"
          value={newMedicine.price}
          onChange={handleInputChange}
          step="0.01"
          aria-label="Medicine price"
        />
        
        <button 
          onClick={handleAddMedicine}
          aria-label="Add new medicine to inventory"
        >
          Add Medicine
        </button>
      </div>
    </div>
  );
};

export default MedicalShop;