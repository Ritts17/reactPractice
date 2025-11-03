import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [];

const taskSlice = createSlice({
    name : 'tasks',
    initialState,
    reducers : {
        addTask : (state, action) => {
            const {title, description, status} = action.payload;
            const newTask = {
                id: nanoid(),
                title,
                description,
                status
            };
            state.push(newTask);
        },
        updateTask : (state, action) => {
            const {id, title, description, status} = action.payload;
            const found = state.find(task => task.id === id);
            if(found) {
                found.title = title;
                found.description = description;
                found.status = status;
            }
        },
        deleteTask : (state, action) => {
            const id = action.payload;
            const findTask = state.findIndex(task => task.id === id);
            if(findTask !== -1){
                state.splice(findTask, 1);
            }
        }
    }
})

export const  {addTask, updateTask, deleteTask} = taskSlice.actions;
export default taskSlice.reducer;