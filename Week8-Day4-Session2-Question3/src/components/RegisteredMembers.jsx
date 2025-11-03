import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeMember } from '../redux/clubSlice';

function RegisteredMembers({onEdit}) {

    const {members} = useSelector(state => state.clubs);
    console.log(Object.entries(members));

    const dispatch = useDispatch();
  return (
    <div>
        {
            Object.entries(members).map(([club, memberList]) => (
                <div key={club}>
                    <h3>{club} Members</h3>
                    <ul>
                        {
                            memberList.map((member) => (
                                <li key={member.id}>
                                    <p>{member.fullName}</p> - <p>{member.email}</p> - <p>{member.interest}</p>
                                    <button onClick={() => onEdit(club, member)}>Edit</button>
                                    <button onClick={() => dispatch(removeMember({club, id: member.id}))}>Delete</button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            ))
        }
    </div>
  )
}

export default RegisteredMembers