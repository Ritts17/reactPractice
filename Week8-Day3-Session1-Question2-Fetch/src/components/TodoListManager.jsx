import React, { useEffect, useState } from 'react'

function TodoListManager() {
    const url = 'https://ide-bfbabcfbf334849206bdbfcffdcadone.premiumproject.examly.io/proxy/3001/todos';
    const [todoList, setTodoList] = useState([]);
    const [todoInput, setTodoInput] = useState('');

    const fetchData = async () => {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setTodoList(data);
            } else {
                console.log("Failed to fetch data");
            }
        } catch (error) {
            console.error( error.message);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const handleClick = async () => {
        if (!todoInput.trim()) return;
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: todoInput })
            });
            if (response.ok) {
                const data = await response.json();
                setTodoList(prevData => [...prevData, data]);
                setTodoInput('');
            } else {
                console.log("Failed to add todo");
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    const handleToggleComplete = (id) => {
        setTodoList(prevData => 
            prevData.map(todo => 
                todo.id === id 
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        );
    }

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${url}/${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                setTodoList(prevData => prevData.filter(data => data.id !== id));
            } else {
                console.log("Failed to delete todo");
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <div>
            <h1>Todo List Manager</h1>            
            <input
                type='text'
                placeholder='Enter new todo'
                value={todoInput}
                onChange={(e) => setTodoInput(e.target.value)}
            />
            <button onClick={handleClick}>Add Todo</button>

            <h2>Todo List</h2>
            {todoList.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            todoList.map(task => (
                                <tr key={task.id}>
                                    <td>{task.title}</td>
                                    <td>{task.completed ? "Completed" : "Pending"}</td>
                                    <td>
                                        <button onClick={() => handleToggleComplete(task.id)}>
                                            {task.completed ? "Mark as Pending" : "Mark as Completed"}
                                        </button>
                                        <button 
                                            disabled={task.completed} 
                                            onClick={() => handleDelete(task.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            ) : (
                <div>No todos available.</div>
            )}
        </div>
    )
}

export default TodoListManager