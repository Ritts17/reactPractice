import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import IntakeSummary from './IntakeSummary';

function PatientForm() {
    const [intake, setIntake] = useState(null);
    const {
        register,
        formState: { errors },
        watch,
        reset,
        handleSubmit
    } = useForm();

    const hasAllergies = watch('hasAllergies');

    const onSubmit = (data) => {
        setIntake(data);
        reset();
    }

    const validateAge = (value) => {
        const dob = new Date(value);
        const today = new Date();
        const year = today.getFullYear() - dob.getFullYear();
        return year >= 18 || "You must be at least 18 years old."
    }
    return (
        <div>
            <h1>Patient Intake Form</h1>
            <div>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="fullName">Full Name:</label>
                        <input
                            type='text'
                            id='fullName'
                            {...register('fullName', {
                                required: "Full Name is required"
                            })}
                        />
                        {errors.fullName && <div>{errors.fullName.message}</div>}
                    </div>

                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type='text'
                            id='email'
                            {...register('email', {
                                required: "Valid email is required"
                            })}
                        />
                        {errors.email && <div>{errors.email.message}</div>}
                    </div>

                    <div>
                        <label htmlFor="phone">Phone Number:</label>
                        <input
                            type='text'
                            id='phone'
                            {...register('phone', {
                                required : "Phone must be 10 digits",
                                minLength: {
                                    value: 10,
                                    message: "Phone must be 10 digits"
                                },
                                pattern: {
                                    value: /^\d{10}$/,
                                    message: "Phone must be 10 digits"
                                }
                            })}
                        />
                        {errors.phone && <div>{errors.phone.message}</div>}
                    </div>

                    <div>
                        <label htmlFor="dob">Date of Birth:</label>
                        <input
                            type='date'
                            id='dob'
                            {...register('dob', {
                                required: "Date of birth is required",
                                validate: validateAge
                            })}
                        />
                        {errors.dob && <div>{errors.dob.message}</div>}
                    </div>

                    <div>
                        <label htmlFor="insurance">Insurance Provider (optional):</label>
                        <input
                            type='text'
                            id='insurance'
                            {...register('insurance')}
                        />
                    </div>

                    <div>
                        <label htmlFor="hasAllergies">Has Allergies</label>
                        <select name="hasAllergies" id="hasAllergies" {...register('hasAllergies', {
                            required : "Please select an option"
                        })}>
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        {errors.hasAllergies && <div>{errors.hasAllergies.message}</div>}
                    </div>

                    {hasAllergies === 'Yes' &&
                        <div>
                            <label htmlFor="allergyList">Allergy List</label>
                            <textarea
                                id='allergyList'
                                {...register('allergyList', {
                                    required: "Please list your allergies."
                                })}
                            />
                            {errors.allergyList && <div>{errors.allergyList.message}</div>}
                        </div>
                    }

                    <div>
                        <label htmlFor="emergencyContact">Emergency Contact:</label>
                        <input
                            type='text'
                            id='emergencyContact'
                            {...register('emergencyContact', {
                                required: "Emergency contact is required"
                            })}
                        />
                        {errors.emergencyContact && <div>{errors.emergencyContact.message}</div>}
                    </div>

                    <button type='submit'>Submit</button>
                </form>

                {intake && 
                <IntakeSummary intake={intake}/>
                }
            </div>
        </div>
    )
}

export default PatientForm