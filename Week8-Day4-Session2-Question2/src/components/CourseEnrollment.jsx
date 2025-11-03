import React, { createContext, useEffect, useState } from 'react'
import CourseList from './CourseList'
import EnrollmentForm from './EnrollmentForm'
import { useDispatch, useSelector } from 'react-redux'
import { enrollMember, fetchData } from '../redux/courseSlice'
import { nanoid } from '@reduxjs/toolkit'

const CourseEnrollment = () => {

    const [currCourse, setCurrCourse] = useState('')
    const [editedData, setEditedData] = useState(null)
    const enrollForm = (course) => {
        setCurrCourse(course)
    }

    useEffect(() => {
        dispatch(fetchData())
    }, [])

    const { availableCourses, enrollments } = useSelector(state => state.courses);
    const dispatch = useDispatch()
    console.log(enrollments);

    const [editingData, setEditingData] = useState('');

    const addMember = (member, course) => {
        const newMember = {
            id: nanoid(),
            ...member
        }
        dispatch(enrollMember({ newMember, course }))
    }

    const onCancel = (e) => {
        e.preventDefault();
        setCurrCourse('')
    }


    const handleEdit = (id, course) => {
        const userToEdit = enrollments[course].find((user) => user.id === id);
        if (userToEdit) {
            setEditedData(userToEdit);
            setCurrCourse(course);
        }
    };
    return (
        <div>
            <h1>Course Enrollment System</h1>
            <CourseList handleEdit={handleEdit} availableCourses={availableCourses} enrollments={enrollments} enrollForm={enrollForm} />
            {
                currCourse && <EnrollmentForm handleEdit={handleEdit} onCancel={onCancel} addMember={addMember} editedData={editedData} currCourse={currCourse} />
            }
        </div>
    )
}

export default CourseEnrollment