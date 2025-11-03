import React, { useState } from 'react'
import {nameData} from './NameData';
import './RenderList.css'

function RenderList() {
    const [searchInput, setSearchInput] = useState('');

    const filteredList = nameData.filter((name) => name.toLowerCase().includes(searchInput.toLowerCase()));
    return (
        <div className='container'>
            <input type='text'
                placeholder='Search employees...'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className='inputField'
            />
            <ul className='ulContainer'>
                {
                    
                    filteredList.map((name) =>{
                        return <div className='innerDiv'><p>{name}</p></div>
                    })
                }
            </ul>
        </div>
    )
}

export default RenderList