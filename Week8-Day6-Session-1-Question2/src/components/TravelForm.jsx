import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

function TravelForm() {
    const [currFormData, setCurrFormData] = useState({});
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const submitData = (data) => {
        console.log(data);
        setCurrFormData(data);
        reset();
    }
    return (
        <div>
            <h1>Travel Booking Form</h1>
            <form onSubmit={handleSubmit(submitData)}>
                <div>
                    <label htmlFor='travelerName'>Traveler's Name</label>
                    <input
                        type='text'
                        id='travelerName'
                        {...register('travelerName', {
                            required: "Traveler’s name is required"
                        })}
                    />
                    {errors.travelerName && <div style={{ color: 'red' }}>{errors.travelerName.message}</div>}
                </div>

                <div>
                    <label htmlFor='destination'>Destination</label>
                    <input
                        type='text'
                        id='destination'
                        {...register('destination', {
                            required: "Destination is required"
                        })}
                    />
                    {errors.destination && <div style={{ color: 'red' }}>{errors.destination.message}</div>}
                </div>

                <div>
                    <label htmlFor='travelDate'>Travel Date</label>
                    <input
                        type='date'
                        id='travelDate'
                        {...register('travelDate', {
                            required: "Travel date is required"
                        })}
                    />
                    {errors.travelDate && <div style={{ color: 'red' }}>{errors.travelDate.message}</div>}
                </div>

                <div>
                    <label htmlFor='numberOfTravelers'>Number of Travelers</label>
                    <input
                        type='number'
                        id='numberOfTravelers'
                        {...register('numberOfTravelers', {
                            required: "Number of travelers is required",
                            min : {
                                value : 1,
                                message : "Must be at least 1 traveler"
                            },
                            valueAsNumber : true
                        })}
                    />
                    {errors.numberOfTravelers && <div style={{ color: 'red' }}>{errors.numberOfTravelers.message}</div>}
                </div>

                <div>
                    <label htmlFor='transportMode'>Mode of Transport</label>
                    <input
                        type='text'
                        id='transportMode'
                        {...register('transportMode', {
                            required: "Transport mode is required"
                        })}
                    />
                    {errors.transportMode && <div style={{ color: 'red' }}>{errors.transportMode.message}</div>}
                </div>

                <div>
                    <label htmlFor='specialRequests'>Special Requests</label>
                    <input
                        type='text'
                        id='specialRequests'
                        {...register('specialRequests', {
                            required: "This field is required"
                        })}
                    />
                    {errors.specialRequests && <div style={{ color: 'red' }}>{errors.specialRequests.message}</div>}
                </div>

                <div>
                    <label htmlFor='contactEmail'>Contact Email (optional)</label>
                    <input
                        type='text'
                        id='contactEmail'
                        {...register('contactEmail', {
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email format'
                            }
                        })}
                    />
                    {errors.contactEmail && <div style={{ color: 'red' }}>{errors.contactEmail.message}</div>}

                </div>

                <div>
                    <button type='submit'>Submit</button>
                </div>
            </form>

            {Object.keys(currFormData).length > 0 &&
                <div>
                    <h2>Booking Confirmation</h2>
                    <p>Traveler's Name: {currFormData.travelerName}</p>
                    <p>Destination: {currFormData.destination}</p>
                    <p>Travel Date: {currFormData.travelDate}</p>
                    <p>Number of Travelers: {currFormData.numberOfTravelers}</p>
                    <p>Mode of Transport: {currFormData.transportMode}</p>
                    <p>Special Requests: {currFormData.specialRequests}</p>
                </div>
            }
        </div>
    )
}

export default TravelForm