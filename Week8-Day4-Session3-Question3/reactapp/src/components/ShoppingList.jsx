import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addItem, deleteItem, editItem, toggleItem } from '../redux/shoppingSlice';
import './ShoppingList.css';

function ShoppingList() {
    const [name, setName] = useState('');
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState('');
    
    const shoppingList = useSelector(state => state.shopping);
    console.log(shoppingList);
    const dispatch = useDispatch();

    const handleAdd = () => {
        if (name.trim() !== '') {
            dispatch(addItem(name));
            setName('');
        }
    }

    const handleEdit = (item) => {
        setEditId(item.id);
        setEditName(item.name)
    }

    const handleSave = (item) => {
        if(editName.trim() !== ''){
            dispatch(editItem({
                id: item.id,
                name : editName
            }));
        }
        setEditId(null);
        setEditName('');
    }

    const handleKeyDown = (e, item) => {
        if(e.key === 'Enter'){
            handleSave(item);
        }
        if(e.key === 'Escape'){
            setEditId(null);
            setEditName('');
        }
    }

    return (
        <div>
            <h1>My Shopping List</h1>
            
            {/* Add input-section class */}
            <div className='input-section'>
                <input
                    type='text'
                    name='name'
                    id='name'
                    placeholder='Enter item...'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                />
                <button onClick={handleAdd}>Add</button>
            </div>

            {shoppingList.length > 0 ? (
                <ul>
                    {
                        shoppingList.map(item => (
                            <li key={item.id}>
                                <input
                                    type='checkbox'
                                    checked={item.completed}
                                    onChange={() => dispatch(toggleItem(item.id))}
                                />
                                {editId === item.id ? (
                                    <input 
                                        type='text'
                                        className='edit-input'
                                        placeholder='Edit Item...'
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(e,item)}
                                    />
                                ) : (
                                    <span style={{ textDecoration: `${item.completed ? 'line-through' : 'none'}` }}>
                                        {item.name}
                                    </span>
                                )}
                                {editId === item.id ? (
                                    <button className='save-btn' onClick={() => handleSave(item)}>Save</button>
                                ) : (
                                    <>
                                        <button className='edit-btn' onClick={() => handleEdit(item)}>Edit</button>
                                        <button className='delete-btn' onClick={() => dispatch(deleteItem(item.id))} type='button'>Delete</button>
                                    </>
                                )}
                            </li>
                        ))
                    }
                </ul>
            ) : (
                <div className='empty-state'>No items in your list.</div>
            )}
        </div>
    )
}

export default ShoppingList