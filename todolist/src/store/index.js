import { configureStore, createSlice } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

// Define the initial state of the todos
const initialState = [];

const todoListSlice = createSlice({
    name: "todolist",
    initialState,
    reducers: {
        setTodos:(state,action)=>{
            return [...action.payload];
        }
        ,
        addTodo: (state, action) => {
        state.push(action.payload);
        },
        removeTodo: (state, action) => {
        return state.filter((todo)=>(todo.id !== action.payload))
        },
        
        editTodo: (state, action) => {
        const { index, newValue } = action.payload;
        state[index] = newValue;
        },
    },
    });

    // Destructure the actions from the todoListSlice
    export const { addTodo, removeTodo, editTodo, setTodos } = todoListSlice.actions;

    // Configure the store with the reducer
    const store = configureStore({
        reducer: {
            todolist: todoListSlice.reducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    });

    export default store;
