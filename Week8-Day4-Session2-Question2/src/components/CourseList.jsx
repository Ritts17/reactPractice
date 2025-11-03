import React from 'react'
import EnrolledUsers from './EnrolledUsers'
import { useDispatch } from 'react-redux'
import { deleteMember } from '../redux/courseSlice'

const CourseList = ({handleEdit, enrollForm, availableCourses, enrollments }) => {

    const dispatch = useDispatch()

    const handleDelete=(id, course)=>{
     dispatch(deleteMember({id, course}))
    }



    return (
        <div>
            {
                availableCourses.map((course) => (
                    <div key={course} className='course-card'>
                        <h2>{course}</h2>
                        <button onClick={() => enrollForm(course)}>Enroll</button>
                        <div>
                        {
                            Object.keys(enrollments).length !== 0 ? <EnrolledUsers handleEdit={handleEdit} handleDelete={handleDelete} courseTitle={course} enrollments={enrollments}/> : <p>No enrollments yet.</p>
                        }
                        </div>


                    </div>
                ))
            }
        </div>
    )
}

export default CourseList