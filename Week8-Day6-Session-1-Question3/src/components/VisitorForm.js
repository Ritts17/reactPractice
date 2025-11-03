import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

function VisitorForm() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm();

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  console.log("Register: ", typeof register, "Handle Submit: ", handleSubmit, "Reset Form: ", reset, "Set Value : ", setValue, "Errors: ", errors);

  const [visitor, setVisitor] = useState([]);

  const onSubmit = (data) => {
    console.log(data);
    if (isEditing) {
      //Better way to update Data
      const updateVisitor = visitor.map(visit => (
        visit.id === editId ? {...data, id : editId} : visit
      ))
      setVisitor(updateVisitor);

      // const findVisitor = visitor.find(visit => visit.id === data.id);
      // if(findVisitor){
      //   findVisitor.name = data.name;
      //   findVisitor.contact = data.contact;
      //   findVisitor.data = data.date;
      //   findVisitor.purpose = data.purpose
      // }
    } else {
      setVisitor([...visitor, { ...data, id: Date.now().toString() }]);
    }
    reset();
  }


  const handleDelete = (id) => {
    const filteredData = visitor.filter(visit => visit.id !== id);
    setVisitor(filteredData);
    reset();
    setEditId(null);
    setIsEditing(false);
  }

  const handleEdit = (id) => {
    const findVisitor = visitor.find(visit => visit.id === id);

    Object.entries(findVisitor).forEach(([fieldName, value]) => {
      setValue(fieldName, value)
    })
    setIsEditing(true);
    setEditId(id);
  }

  return (
    <div>
      <h1>Visitor Entry Form</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor='name'>Visitor Name</label>
            <input
              type='text'
              id='name'
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor='contact'>Contact Number</label>
            <input
              type='text'
              id='contact'
              {...register("contact", { required: "Contact is required", pattern: { value: /^\+?[1-9][0-9]{7,14}$/, message: "Contact number not valid" } })}
            />
            {errors.contact && <p style={{ color: 'red' }}>{errors.contact.message}</p>}
          </div>

          <div>
            <label htmlFor='date'>Visit Date</label>
            <input
              type='date'
              id='date'
              {...register("date", { required: "Visit Date is required" })}
            />
            {errors.date && <p style={{ color: 'red' }}>{errors.date.message}</p>}
          </div>

          <div>
            <label htmlFor='purpose'>Purpose</label>
            <textarea
              type='text'
              id='purpose'
              {...register("purpose", { required: "Purpose is required" })}
            />
            {errors.purpose && <p style={{ color: 'red' }}>{errors.purpose.message}</p>}
          </div>

          <div>
            <button>{isEditing ? "Update Entry" : "Register Visitor"}</button>
          </div>
        </form>
      </div>

      {visitor.length > 0 ? (
        <div>
          <h2>Registered Visitors</h2>
          {
            visitor.map(visit => (
              <li key={visit.id}>
                <p>Name: <span>{visit.name}</span></p>
                <p>Contact: <span>{visit.contact}</span></p>
                <p>Date: <span>{visit.date}</span></p>
                <p>Purpose: <span>{visit.purpose}</span></p>

                <button onClick={() => handleEdit(visit.id)}>Edit</button>
                <button onClick={() => handleDelete(visit.id)}>Delete</button>
              </li>
            ))
          }
        </div>
      ) : (
        <></>
      )}

    </div>
  )
}

export default VisitorForm