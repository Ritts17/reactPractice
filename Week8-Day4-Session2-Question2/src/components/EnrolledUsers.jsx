import React, { useContext } from 'react'
import { EditContext } from './CourseEnrollment';

const EnrolledUsers = ({ handleEdit, courseTitle, enrollments, handleDelete }) => {
  console.log(Object.entries(enrollments));
  return (
    <div>
      {
        Object.keys(enrollments).map((course) => (
          courseTitle === course &&
          enrollments[course].map((user) => (
            <li key={user.id}>
              <p>{user.name}</p>
              ({user.email})- {user.reason}
              <button onClick={() => handleEdit(user.id, course)}>Edit</button>
              <button onClick={() => handleDelete(user.id, course)}>Delete</button>
            </li>
          ))
        ))
      }
    </div>
  )
}

export default EnrolledUsers