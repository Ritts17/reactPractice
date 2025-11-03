import React, { useState } from 'react'
import CourseList from './components/CourseList';
import CourseForm from './components/CourseForm';

function App() {
    const [courses, setCourses] = useState([]);
    console.log("Courses in App: ", courses);

    const addCourse = (title, description) => {
        console.log(title, description);
        const newObject = {
          id : Date.now().toString(),
          title,
          description,
          status : 'active'
        }
        setCourses(prevData => [...prevData, newObject]);
    }

    const toggleCourseStatus = (id) => {
      setCourses(courses.map(course => {
        return course.id === id ? {...course, status : course.status === 'active' ? "completed" : "active"} : course
      }))
    }
  return (
    <div>
        <h1>Online Course Platform</h1>
        <CourseForm addCourse={addCourse}/>
        <CourseList 
        courses = {courses}
        toggleCourseStatus = {toggleCourseStatus}
        />
    </div>
  )
}

export default App