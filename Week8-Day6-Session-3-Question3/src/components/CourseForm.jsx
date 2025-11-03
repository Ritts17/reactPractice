import React, { useState } from 'react'

function CourseForm({ addCourse }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [titleError, setTitleError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !description) {
            if (!title) {
                setTitleError("Course title is required");
            }
            if (!description) {
                setDescriptionError("Course description is required");
            }
        }else {
            addCourse(title, description);
            setDescription('');
            setTitle('');
            setDescriptionError('');
            setTitleError('');
        }

    }
    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Course Title</label>
                    <input
                        type='text'
                        id='title'
                        name='title'
                        placeholder='Course Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {titleError && <div style={{ color: 'red' }}>{titleError}</div>}
                </div>

                <div>
                    <label htmlFor="description">Course Description</label>
                    <textarea
                        type='text'
                        id='description'
                        name='description'
                        placeholder='Course Description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {descriptionError && <div style={{ color: 'red' }}>{descriptionError}</div>}
                </div>

                <button type='submit'>Add Course</button>
            </form>
        </div>
    )
}

export default CourseForm