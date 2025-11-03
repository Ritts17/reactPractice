import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Cart() {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, [])

    const totalPrice = cart.reduce((sum, currObj) => sum + currObj.price, 0);

    const handleClear = () => {
        setCart([]);
        localStorage.setItem('cart', JSON.stringify([]));
    }

    const handleConfirm = () => {
        if (cart.length > 0) {
            navigate('/cart/payment', { 
                state: { 
                    fromCart: true, 
                    cartItems: cart,
                    totalPrice: totalPrice 
                } 
            });
        } else {
            alert('Your cart is empty!');
        }
    }

    return (
        <div>
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    {cart.map((cartItem, index) => (
                        <p key={index}>{cartItem.name} - ${cartItem.price}</p>
                    ))}
                    <h4 style={{fontSize: '1rem'}}>Total: ${totalPrice}</h4>
                    <button onClick={handleConfirm}>Confirm Order</button>
                    <button onClick={handleClear}>Clear Cart</button>
                </>
            )}
        </div>
    )
}

export default Cart