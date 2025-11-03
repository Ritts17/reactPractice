import React, { useEffect, useState } from 'react'

function EventOrder() {
    const EVENT_URL = 'https://ide-bfbabcfbf334786523cabebdbbaeccone.premiumproject.examly.io/proxy/3001/eventOrders';

    const [orders, setOrders] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch(EVENT_URL);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setOrders(data);
            } else {
                console.log("Error in data");
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        console.log(id);
        const objectToDelete = orders.find(order => order.id === id);
        setOrders(prevData => prevData.filter(data => data.id !== id));
        
        try {
            const response = await fetch(`${EVENT_URL}/${id}`, {
                method : 'DELETE',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(objectToDelete)
            })
            const data = await response.json();
            console.log(data);
            setOrders(prevData => [...prevData, data]);
        } catch (error) {
            
        }
    }
    return (
        <div>
            <h1>Event Order Management</h1>
            <h2>All Event Orders</h2>
            {orders.length > 0 ? (
                <ul>
                    {
                        orders.map((order, index) => (
                            <li key={order.id}>
                                <p>{order.eventName}</p>
                                <span>{order.eventDate} at {order.eventTime}</span>
                                <p>(Ordered by {order.customerName})</p>
                                <div>
                                    <button onClick={() => handleDelete(order.id)} className='remove-btn'>Remove</button>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            ) : (
                <div>No event orders found.</div>
            )}

        </div>
    )
}

export default EventOrder