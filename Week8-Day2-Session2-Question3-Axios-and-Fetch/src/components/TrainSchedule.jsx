import React, { useEffect, useState } from 'react'
// import axios from 'axios';

function TrainSchedule() {
    const TRAIN_URL = 'https://ide-bfbabcfbf334770912baaaacaeeeabeone.premiumproject.examly.io/proxy/3001/trainSchedules';

    const [trainList, setTrainList] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        trainName: '',
        departureTime: '',
        arrivalTime: '',
        availableSeats: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState('');

    const fetchData = async () => {
        try {
            const response = await fetch(TRAIN_URL);
            console.log(response);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setTrainList(data);
            }
            else{
                throw new Error("Unable to fetch Data");
            }
        } catch (error) {
            console.error(error.message);
        }

        // try {
        //     const response = await axios.get(TRAIN_URL);
        //     const data = response.data;
        //     setTrainList(data);
        // } catch (error) {
        //     console.error(error.message);
        // }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleEdit = (id) => {
        const trainToUpdate = trainList.find(train => train.id === id);
        console.log(trainToUpdate);
        setFormData({
            id : trainToUpdate.id,
            trainName: trainToUpdate.trainName,
            departureTime: trainToUpdate.departureTime,
            arrivalTime: trainToUpdate.arrivalTime,
            availableSeats: trainToUpdate.availableSeats
        })
        setIsEditing(true);
        setEditingId(id);
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedTrain = {
            id: editingId,
            trainName: formData.trainName,
            departureTime: formData.departureTime,
            arrivalTime: formData.arrivalTime,
            availableSeats: formData.availableSeats
        }
        try {
            // const response = await axios.put(`${TRAIN_URL}/${editingId}`, updatedTrain);
            // setTrainList(trainList.map(train => train.id === editingId ? updatedTrainFromServer : train));
            // setEditingId('');
            // setIsEditing(false);

            const response = await fetch(`${TRAIN_URL}/${editingId}`, {
                method : 'PUT',headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify(updatedTrain)
            });

            if(response.ok){
                const updatedTrainFromServer = await response.json();
                setTrainList(trainList.map(train => train.id === editingId ? updatedTrainFromServer : train));
                setEditingId('');
                setIsEditing(false);
            }else{
                throw new Error("Failed to update train")
            }

        } catch (error) {
            console.error(error.message);
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setEditingId('');
        setIsEditing(false);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setFormData({
            ...formData, [name]: value
        })
    }


    return (
        <div>
            <h1>Train Schedule Management</h1>
            <h2>All Trains</h2>
            {isEditing && editingId ? (
                <form>
                    <input
                        placeholder='Train Name'
                        name='trainName'
                        id='trainName'
                        type="text"
                        value={formData.trainName}
                        onChange={handleChange}
                    />

                    <input
                        placeholder='Departure Time'
                        name='departureTime'
                        id='departureTime'
                        type="time"
                        value={formData.departureTime}
                        onChange={handleChange}
                    />

                    <input
                        placeholder='Arrival Time'
                        name='arrivalTime'
                        id='arrivalTime'
                        type="time"
                        value={formData.arrivalTime}
                        onChange={handleChange}
                    />

                    <input
                        name='availableSeats'
                        id='availableSeats'
                        placeholder='Available Seats'
                        type="number"
                        value={formData.availableSeats}
                        onChange={handleChange}
                    />

                    <button type='submit' className='submit-btn' onClick={handleUpdate}>Update</button>
                    <button type='submit' className='submit-btn' onClick={handleCancel}>Cancel</button>
                </form>
            ) : (
                null
            )}
            {trainList.length > 0 ? (
                <ul>
                {
                    trainList.map((train) => (
                        <li key={train.id}>
                            <span>{train.trainName}</span>
                            <span>--{train.departureTime} to {train.arrivalTime}</span>{" | "}
                            <span>Seats: {train.availableSeats}</span>
                            <button onClick={() => handleEdit(train.id)} className='edit-btn'>Edit</button>
                        </li>
                    ))
                }
            </ul>
            ) : (
                <div>No trains scheduled.</div>
            )}
            
        </div>
    )
}

export default TrainSchedule