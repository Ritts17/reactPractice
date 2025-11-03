import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addMember, updateMember } from '../redux/clubSlice';

function RegistrationForm({ club, handleCancelForm, editData }) {

    console.log(club);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        interest: ''
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (editData) {
            setFormData({
                fullName: editData.fullName,
                email: editData.email,
                interest: editData.interest
            })
        }
    }, []);

    const handleSubmit = (e) => {
        const { fullName, email, interest } = formData;
        e.preventDefault();
        if (!formData.fullName || !formData.email) {
            alert("Full Name and Email are required");
            return;
        }

        const payload = {
            club,
            fullName,
            email,
            interest
        }

        setFormData({
            fullName: '',
            email: '',
            interest: ''
        })
        if (editData) {
            dispatch(updateMember({...payload, id : editData.id}));
        } else {
            dispatch(addMember(payload));
        }
        handleCancelForm();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value
        });
    }

    return (
        <div>
            <h2>Join {club}</h2>
            <form action="" onSubmit={handleSubmit}>
                <input type="text"
                    name='fullName'
                    id='fullName'
                    placeholder='Full Name'
                    value={formData.fullName}
                    onChange={handleChange}
                />

                <input
                    type='text'
                    id='email'
                    name='email'
                    placeholder='Email'
                    value={formData.email}
                    onChange={handleChange}
                />

                <input
                    type='text'
                    id='interest'
                    name='interest'
                    placeholder='Interest'
                    value={formData.interest}
                    onChange={handleChange}
                />

                <button type='submit'>{editData ? "Update" : "Submit"}</button>
                <button type='submit' onClick={handleCancelForm}>Cancel</button>
            </form>
        </div>
    )
}

export default RegistrationForm