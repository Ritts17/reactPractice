import React from 'react'

function AppointmentSummary({appointment}) {
  return (
    <div>
      <h2>Appointment Summary</h2>
      {
        <>
          <p><strong>Name:</strong> {appointment.name}</p>
          <p><strong>Age:</strong> {appointment.age}</p>
          <p><strong>Gender:</strong> {appointment.gender}</p>
          <p><strong>Specialist:</strong> {appointment.specialist}</p>
          <p><strong>Date:</strong> {appointment.date}</p>
          <p><strong>Time:</strong> {appointment.time}</p>
          {appointment.specialist === 'Cardiologist' && <p><strong>Follow-up:</strong> {appointment.isFollowUp}</p>
          }
        </>
      }
    </div>
  )
}

export default AppointmentSummary