import React, { useEffect, useState } from 'react'
const EnrollmentForm = ({ editedData, currCourse, onCancel, addMember }) => {
  const [formData, setFormData] = useState({
    name: editedData?.name || '',
    email: editedData?.email || '',
    reason: editedData?.reason || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    if (editedData) {
      setFormData({
        name: editedData.name,
        email: editedData.email,
        reason: editedData.reason
      });
    }
  }, [editedData]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Name and Email are required');
      return;
    }

    addMember(formData, currCourse);

    setFormData({
      name: '',
      email: '',
      reason: ''
    });
  };



  return (
    <div>
      {
        editedData ? <h3>Edit Enrollment</h3> : <h3>Enroll in Course</h3>
      }
      <form action="" onSubmit={handleSubmit}>
        <input type="text" name="name" id="name" value={formData.name} placeholder='Name' onChange={handleChange} />
        <input type="text" name="email" id="email" value={formData.email} placeholder='Email' onChange={handleChange} />
        <input type="text" name="reason" id="reason" value={formData.reason} placeholder='Reason' onChange={handleChange} />
        <button type='submit'>Submit</button>
        <button onClick={(e) => onCancel(e)}>Cancel</button>
      </form>

    </div>
  )
}

export default EnrollmentForm