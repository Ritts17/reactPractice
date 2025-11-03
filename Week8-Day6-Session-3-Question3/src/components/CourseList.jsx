import React from 'react'

function CourseList({ courses, toggleCourseStatus }) {
  const activeCourses = courses.filter(course => course.status === 'active');
  const completedCourses = courses.filter(course => course.status === 'completed');
  console.log("Active Courses",activeCourses);
  console.log("Completed COurses: ", completedCourses);
  return (
    <div>
      <div>
        <h2>Active Courses</h2>
        {activeCourses.length === 0 ? (
          <div>No active courses</div>
        ) : (
          <ul>
            {activeCourses.map(course => (
              <li key={course.id}>
                <span>{course.title}</span> - <span>{course.description}</span>
                <button onClick={() => toggleCourseStatus(course.id)}>Mark as Completed</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2>Completed Courses</h2>
        {completedCourses.length === 0 ? (
          <div>No completed courses yet</div>
        ) : (
          <ul>
            {completedCourses.map(course => (
              <li key={course.id}>
                <span>{course.title}</span> - <span>{course.description}</span>
                <button onClick={() => toggleCourseStatus(course.id)}>Mark as Active</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CourseList