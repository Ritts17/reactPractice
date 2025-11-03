import React, { useEffect, useState } from 'react'
import productsData from './productsData';

function Home() {
    const [cart, setCart] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
        setIsLoading(true);
    }, [])

    useEffect(() => {
        if (isLoading) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart, isLoading])

    const handleAddToCart = (product) => {
        setCart(prevData => [...prevData, product])
    }

    return (
        <div>
            <h2>Electro - Products</h2>
            <div style={styles.gridView}>
                {
                    productsData.map(product => (
                        <div style={styles.card} key={product.id}>
                            <img 
                                src={product.image} 
                                alt={product.name}
                                style={styles.image}
                            />
                            <h3>{product.name}</h3>
                            <small>${product.price}</small>
                            <button 
                                onClick={() => handleAddToCart(product)} 
                                style={styles.button}
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

const styles = {
    gridView: {
        display: 'grid',
        gap: 20,
        gridTemplateColumns: 'repeat(auto-fill, minmax(1fr))',
        padding: '0 20px'
    },
    card: {
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        textAlign: 'center',
        padding: 20,
        borderRadius: 8,
        backgroundColor: 'white'
    },
    image: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        borderRadius: 4,
        marginBottom: 15
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
        fontSize: '14px',
        marginTop: 10
    }
}

export default Home