import React, { useState, useEffect } from 'react'

function TaskForm({ isEdited, handleAdd, task }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'Pending'
    });

    useEffect(() => {
        if (isEdited && task) {
            setFormData({
                title: task.title || '',
                description: task.description || '',
                status: task.status || 'Pending'
            });
        } else if (!isEdited) {
            setFormData({
                title: '',
                description: '',
                status: 'Pending'
            });
        }
    }, [isEdited, task]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, 
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.title.trim() || !formData.description.trim()) {
            alert("Please enter both title and description.");
            return;
        }

        if (isEdited && task) {
            const updatedTask = {
                id : task.id,
                title: formData.title,
                description: formData.description,
                status: formData.status
            };
            console.log("Updated task: ", updatedTask);
            handleAdd(updatedTask);
        } else {
            const newTask = {
                title: formData.title,
                description: formData.description,
                status: formData.status
            };
            handleAdd(newTask);
        }

        setFormData({
            title: '',
            description: '',
            status: 'Pending'
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name='title'
                    id='title'
                    placeholder='Enter title'
                    value={formData.title}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name='description'
                    id='description'
                    placeholder='Enter Description'
                    value={formData.description}
                    onChange={handleChange}
                />

                <select 
                    name="status" 
                    id="status" 
                    value={formData.status} 
                    onChange={handleChange}
                >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>

                <button type='submit'>
                    {isEdited ? "Update Task" : "Add Task"}
                </button>
                

            </form>
        </div>
    )
}

export default TaskForm