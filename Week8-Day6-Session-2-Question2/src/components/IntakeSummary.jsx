import React from 'react'

function IntakeSummary({intake}) {
  return (
    <div>
        <div>Patient Intake Summary</div>
        <p><strong>Full Name:</strong> <span>{intake.fullName}</span></p>
        <p><strong>Email:</strong> <span>{intake.email}</span></p>
        <p><strong>Phone Number:</strong> <span>{intake.phone}</span></p>
        <p><strong>Date of Birth:</strong> <span>{intake.dob}</span></p>
        <p><strong>Insurance:</strong> <span>{intake.insurance}</span></p>
        <p><strong>Has Allergies:</strong> <span>{intake.hasAllergies}</span></p>
        {intake.hasAllergies === 'Yes' && <p><strong>Allergies:</strong> <span>{intake.allergyList}</span></p>}
        <p><strong>Energency Contact:</strong> <span>{intake.emergencyContact}</span></p>
    </div>
  )
}

export default IntakeSummary