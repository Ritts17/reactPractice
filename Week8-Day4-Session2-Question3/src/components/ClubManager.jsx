import React, { useEffect, useState } from 'react'
import RegistrationForm from './RegistrationForm'
import RegisteredMembers from './RegisteredMembers'
import ClubList from './ClubList'
import { useDispatch } from 'react-redux';
import { fetchClubs } from '../redux/clubSlice';

function ClubManager() {

    const [joinClub, setJoinClub] = useState('');
    const [editData, setEditData] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchClubs());
    }, [dispatch])

    const onCLickClub = (club) => {
        setJoinClub(club);
        setEditData(null);
    }

    const handleCancelForm = () => {
        setJoinClub('');
    }

    const handleEdit = (club, member) => {
        setJoinClub(club);
        setEditData(member);
    }

    const handleDelete = (id) => {

    }
    return (
        <div>
            <h1>Club Membership Manager</h1>
            <ClubList onCLickClub={onCLickClub} />
            {
                joinClub.length > 0 && <RegistrationForm club={joinClub} handleCancelForm={handleCancelForm} editData={editData}/>
            }
            <RegisteredMembers onEdit={handleEdit}/>
        </div>
    )
}

export default ClubManager