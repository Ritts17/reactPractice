import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [];

const shoppingSlice = createSlice({
    name : 'shopping',
    initialState,
    reducers : {
        addItem : (state, action) => {
            const name = action.payload;
            const newItem = {
                id : nanoid(),
                name,
                completed : false
            }
            state.unshift(newItem);
        },
        deleteItem : (state, action) => {
            const id = action.payload
            return state.filter(currItem => currItem.id !== id);
        },
        toggleItem : (state, action) => {
            const id = action.payload;
            const found = state.find(item => item.id === id);
            if(found) {
                found.completed = !found.completed;
            }
        },
        editItem : (state, action) => {
            const {id, name} = action.payload;
            const found = state.find(item => item.id === id);
            if(found) {
                found.name = name;
            }
        }
    }
})

export const {addItem, deleteItem, toggleItem, editItem} = shoppingSlice.actions;
export default shoppingSlice.reducer;