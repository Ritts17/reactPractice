import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { addTask, deleteTask, updateTask } from '../slice/taskSlice';

function TaskManager() {
    const [isEdited, setIsEdited] = useState(false);
    const [task, setTask] = useState({});
    const taskList = useSelector(state => state.tasks);
    const dispatch = useDispatch();

    const handleAdd = (taskData) => {
        console.log("Task Manager Task: ", taskData);
        
        if (isEdited && task.id) {
            dispatch(updateTask(taskData));
            setIsEdited(false);
            setTask({});
        } else {
            dispatch(addTask(taskData));
        }
    }

    const handleDelete = (id) => {
        dispatch(deleteTask(id));
    }

    const handleEdit = (task) => {
        console.log("Editing task: ", task);
        setTask(task);
        setIsEdited(true);
    }

    return (
        <div>
            <h1>Task Manager</h1>
            <TaskForm 
                isEdited={isEdited}
                handleAdd={handleAdd}
                task={task}
            />
            <TaskList 
                taskList={taskList} 
                handleEdit={handleEdit} 
                handleDelete={handleDelete}
            />
            <h3>Total Task: {taskList.length}</h3>
        </div>
    )
}

export default TaskManager