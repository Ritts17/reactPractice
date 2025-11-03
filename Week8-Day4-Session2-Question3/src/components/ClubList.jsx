import React from 'react';
import { useSelector } from 'react-redux';

function ClubList({onCLickClub}) {

    const { availableClubs, loading } = useSelector(state => state.clubs);
    console.log(availableClubs, loading);

    if (loading) {
        return <p>Loading...</p>
    }
    return (
        <div>

            {
                availableClubs.map((club) => (
                    <div key={club} className='club-card'>
                        <h3 className='club-title'>{club}</h3>
                        <button aria-label={`Join ${club}`} onClick={() => onCLickClub(club)}>Join</button>
                    </div>
                ))
            }
        </div>
    )
}

export default ClubList