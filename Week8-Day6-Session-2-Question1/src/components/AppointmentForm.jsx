import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import AppointmentSummary from './AppointmentSummary';

function AppointmentForm() {
    const [appointment, setAppointment] = useState(null);
    // console.log(appointment ? true : false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        setAppointment(data);
        reset();
    }

    const validateTime = (value) => {
        if (!value) {
            return "Time is required";
        }

        const [hours] = value.split(":");
        if (Number(hours) < 9 || Number(hours) > 17) {
            return "Appointments are allowed from 9AM to 5PM";
        }
        return true;
    }

    const specialist = watch('specialist');
    return (
        <div>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Patient Name:</label>
                    <input
                        type='text'
                        id='name'
                        {...register('name', {
                            required: "Name is required"
                        })}
                    />
                    {errors.name && <div>{errors.name.message}</div>}
                </div>

                <div>
                    <label htmlFor="age">Age:</label>
                    <input
                        type='text'
                        id='age'
                        {...register('age', {
                            required: "Age is required"
                        })}
                    />
                    {errors.age && <div>{errors.age.message}</div>}
                </div>

                <div>
                    <label htmlFor="gender">Gender:</label>
                    <select name="gender" id="gender" {...register('gender', {
                        required: "Gender is required"
                    })}>
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    {errors.gender && <div>{errors.gender.message}</div>}
                </div>

                <div>
                    <label htmlFor="specialist">Specialist:</label>
                    <select name="specialist" id="specialist" {...register('specialist', {
                        required: "Specialist is required"
                    })}>
                        <option value="">Select</option>
                        <option value="Cardiologist">Cardiologist</option>
                        <option value="Dermatologist">Dermatologist</option>
                        <option value="Orthopedic">Orthopedic</option>
                    </select>
                    {errors.specialist && <div>{errors.specialist.message}</div>}
                </div>

                <div>
                    <label htmlFor="date">Preferred Date:</label>
                    <input
                        type='date'
                        id='date'
                        {...register('date', {
                            required: "Date is required"
                        })}
                    />
                    {errors.date && <div>{errors.date.message}</div>}
                </div>

                <div>
                    <label htmlFor="time">Preferred Time:</label>
                    <input
                        type='time'
                        id='time'
                        {...register('time', {
                            required: "Time is required",
                            validate: validateTime
                        })}
                    />
                    {errors.time && <div>{errors.time.message}</div>}
                </div>

                {specialist === 'Cardiologist' &&
                    <div>
                        <label htmlFor="isFollowUp">Follow-Up Visit:</label>
                        <select name="isFollowUp" id="isFollowUp" {...register('isFollowUp', {
                            required: "Follow-up info required"
                        })}>
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        {errors.isFollowUp && <div>{errors.isFollowUp.message}</div>}
                    </div>
                }
                <button type='submit'>Submit</button>
            </form>

            {appointment &&
                <AppointmentSummary appointment={appointment}/>
            }
        </div>
    )
}

export default AppointmentForm