import React from 'react'

function TaskList({taskList, handleEdit, handleDelete}) {
  console.log(taskList);
  return (
    <div>
      <ul>
        {
          taskList.map(task => (
            <li key={task.id}>
              <p>{task.title}</p>
              <p>-{task.description} [{task.status}]</p>
              <button onClick={() => handleEdit(task)}>Edit</button>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default TaskList