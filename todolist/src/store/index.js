import { configureStore, createSlice } from "@reduxjs/toolkit";

// Define the initial state of the todos
const initialState = [];

const todoListSlice = createSlice({
    name: "todolist",
    initialState,
    reducers: {
        addTodo: (state, action) => {
        state.push(action.payload);
        },
        removeTodo: (state, action) => {
        state.splice(action.payload, 1);
        },
        editTodo: (state, action) => {
        const { index, newValue } = action.payload;
        state[index] = newValue;
        },
    },
    });

    // Destructure the actions from the todoListSlice
    export const { addTodo, removeTodo, editTodo } = todoListSlice.actions;

    // Configure the store with the reducer
    const store = configureStore({
    reducer: {
        todolist: todoListSlice.reducer,
    },
    });

    export default store;
