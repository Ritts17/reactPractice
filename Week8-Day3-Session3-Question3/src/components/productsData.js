const productsData = [
  { 
    id: 1, 
    name: 'Laptop', 
    price: 999.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 2, 
    name: 'Smartphone', 
    price: 699.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 3, 
    name: 'Headphones', 
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 4, 
    name: 'Smartwatch', 
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 5, 
    name: 'Camera', 
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 6, 
    name: 'Tablet', 
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 7, 
    name: 'Gaming Console', 
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 8, 
    name: 'Bluetooth Speaker', 
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 9, 
    name: 'External Hard Drive', 
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 10, 
    name: 'Monitor', 
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 1, 
    name: 'Laptop', 
    price: 999.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 2, 
    name: 'Smartphone', 
    price: 699.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 3, 
    name: 'Headphones', 
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 4, 
    name: 'Smartwatch', 
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 5, 
    name: 'Camera', 
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 6, 
    name: 'Tablet', 
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 7, 
    name: 'Gaming Console', 
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 8, 
    name: 'Bluetooth Speaker', 
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 9, 
    name: 'External Hard Drive', 
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 10, 
    name: 'Monitor', 
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 1, 
    name: 'Laptop', 
    price: 999.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 2, 
    name: 'Smartphone', 
    price: 699.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 3, 
    name: 'Headphones', 
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 4, 
    name: 'Smartwatch', 
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 5, 
    name: 'Camera', 
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 6, 
    name: 'Tablet', 
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 7, 
    name: 'Gaming Console', 
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 8, 
    name: 'Bluetooth Speaker', 
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 9, 
    name: 'External Hard Drive', 
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 10, 
    name: 'Monitor', 
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 1, 
    name: 'Laptop', 
    price: 999.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 2, 
    name: 'Smartphone', 
    price: 699.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 3, 
    name: 'Headphones', 
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 4, 
    name: 'Smartwatch', 
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 5, 
    name: 'Camera', 
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 6, 
    name: 'Tablet', 
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 7, 
    name: 'Gaming Console', 
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 8, 
    name: 'Bluetooth Speaker', 
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 9, 
    name: 'External Hard Drive', 
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 10, 
    name: 'Monitor', 
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 1, 
    name: 'Laptop', 
    price: 999.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 2, 
    name: 'Smartphone', 
    price: 699.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 3, 
    name: 'Headphones', 
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 4, 
    name: 'Smartwatch', 
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 5, 
    name: 'Camera', 
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 6, 
    name: 'Tablet', 
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 7, 
    name: 'Gaming Console', 
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 8, 
    name: 'Bluetooth Speaker', 
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 9, 
    name: 'External Hard Drive', 
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 10, 
    name: 'Monitor', 
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 1, 
    name: 'Laptop', 
    price: 999.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 2, 
    name: 'Smartphone', 
    price: 699.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 3, 
    name: 'Headphones', 
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 4, 
    name: 'Smartwatch', 
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 5, 
    name: 'Camera', 
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 6, 
    name: 'Tablet', 
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 7, 
    name: 'Gaming Console', 
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 8, 
    name: 'Bluetooth Speaker', 
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 9, 
    name: 'External Hard Drive', 
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 10, 
    name: 'Monitor', 
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 1, 
    name: 'Laptop', 
    price: 999.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 2, 
    name: 'Smartphone', 
    price: 699.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 3, 
    name: 'Headphones', 
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 4, 
    name: 'Smartwatch', 
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 5, 
    name: 'Camera', 
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 6, 
    name: 'Tablet', 
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 7, 
    name: 'Gaming Console', 
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 8, 
    name: 'Bluetooth Speaker', 
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 9, 
    name: 'External Hard Drive', 
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 10, 
    name: 'Monitor', 
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 1, 
    name: 'Laptop', 
    price: 999.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 2, 
    name: 'Smartphone', 
    price: 699.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 3, 
    name: 'Headphones', 
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 4, 
    name: 'Smartwatch', 
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 5, 
    name: 'Camera', 
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 6, 
    name: 'Tablet', 
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 7, 
    name: 'Gaming Console', 
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 8, 
    name: 'Bluetooth Speaker', 
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 9, 
    name: 'External Hard Drive', 
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 10, 
    name: 'Monitor', 
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 1, 
    name: 'Laptop', 
    price: 999.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 2, 
    name: 'Smartphone', 
    price: 699.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 3, 
    name: 'Headphones', 
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 4, 
    name: 'Smartwatch', 
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 5, 
    name: 'Camera', 
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 6, 
    name: 'Tablet', 
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 7, 
    name: 'Gaming Console', 
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 8, 
    name: 'Bluetooth Speaker', 
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 9, 
    name: 'External Hard Drive', 
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 10, 
    name: 'Monitor', 
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 1, 
    name: 'Laptop', 
    price: 999.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 2, 
    name: 'Smartphone', 
    price: 699.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 3, 
    name: 'Headphones', 
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 4, 
    name: 'Smartwatch', 
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 5, 
    name: 'Camera', 
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 6, 
    name: 'Tablet', 
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 7, 
    name: 'Gaming Console', 
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 8, 
    name: 'Bluetooth Speaker', 
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 9, 
    name: 'External Hard Drive', 
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 10, 
    name: 'Monitor', 
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 1, 
    name: 'Laptop', 
    price: 999.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 2, 
    name: 'Smartphone', 
    price: 699.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 3, 
    name: 'Headphones', 
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 4, 
    name: 'Smartwatch', 
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 5, 
    name: 'Camera', 
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 6, 
    name: 'Tablet', 
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 7, 
    name: 'Gaming Console', 
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 8, 
    name: 'Bluetooth Speaker', 
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 9, 
    name: 'External Hard Drive', 
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 10, 
    name: 'Monitor', 
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 1, 
    name: 'Laptop', 
    price: 999.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 2, 
    name: 'Smartphone', 
    price: 699.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 3, 
    name: 'Headphones', 
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 4, 
    name: 'Smartwatch', 
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 5, 
    name: 'Camera', 
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 6, 
    name: 'Tablet', 
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 7, 
    name: 'Gaming Console', 
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 8, 
    name: 'Bluetooth Speaker', 
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 9, 
    name: 'External Hard Drive', 
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  { 
    id: 10, 
    name: 'Monitor', 
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  }
];

export default productsData;