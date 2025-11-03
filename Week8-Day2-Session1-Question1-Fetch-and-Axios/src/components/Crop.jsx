import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Crop() {
    const CROP_URL = "https://ide-bfbabcfbf334698379deecdfdaaaeone.premiumproject.examly.io/proxy/8080/crops"
    const [formData, setFormData] = useState({
        name: '',
        season: '',
        quantity: ''
    })
    const [crops, setCrops] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(CROP_URL);
            const data = response.data;
            setCrops(data);
        } catch (error) {
            console.error(error.message);
        }
    }

        useEffect(() => {


        // fetch(CROP_URL)
        //     .then((res) => {
        //         if(!res.ok) {
        //             throw new Error(`Failed to fetch`);
        //         }
        //         return res.json();
        //     })
        //     .then(data => setCrops(data))
        //     .catch(error => {
        //         console.error('Error fetching crops:', error);
        //     });

            fetchData();

            // axios.get(CROP_URL).then(res => {setCrops(res.data);}).catch(err => console.error(err.message));
        }, []);
        

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const response = await fetch(CROP_URL, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         name: formData.name,
            //         season: formData.season,
            //         quantity: formData.quantity
            //     }),
            // });

            // if (!response.ok) {
            //     throw new Error(`Failed to add crop: ${response.status}`);
            // }

            // const newCrop = await response.json();
            // console.log('Crop added to database:', newCrop);

            // setCrops(prevData => [...prevData, newCrop]);


            const response = await axios.post(CROP_URL, {
                name: formData.name,
                season: formData.season,
                quantity: formData.quantity
            });

            console.log('Crop added to database:', response.data);

            setCrops(prevData => [...prevData, response.data]);

            
            setFormData({
                name: '',
                season: '',
                quantity: ''
            });

        } catch (error) {
            console.error('Error adding crop:', error);
            alert('Failed to add crop. Please try again.');
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData, [name]: value
        })
    }
    return (
        <div>
            <h1>Crop Management System</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type='text'
                        name='name'
                        value={formData.name}
                        placeholder='Crop Name'
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <input
                        type='text'
                        name='season'
                        value={formData.season}
                        placeholder='Season'
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <input
                        type='text'
                        name='quantity'
                        value={formData.quantity}
                        placeholder='Quantity'
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <button type='submit'>Add Crop</button>
                </div>
            </form>

            <div>
                <h2>Crop List</h2>
                {crops.length === 0 ? (
                    <div>No crops have been added yet.</div>
                ) : (
                    <ul>
                        {
                            crops.map((crop, index) => (
                                <li key={crop.id}>
                                  <span>{crop.name}</span>
                                  <span>{`(${crop.season}) - ${crop.quantity} kg`}</span>
                                </li>
                              ))                              
                        }
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Crop