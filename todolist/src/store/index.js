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
        removeMultipleTodos: (state, action) => {
            // Extract just the IDs from the action's payload of todo objects
            const idsToRemove = action.payload.map(todo => todo.id);

            // Filter out todos whose IDs are in the idsToRemove array
            return state.filter(todo => !idsToRemove.includes(todo.id));
        },


        toggleDone(state, action) {
                return state.map((item) => {
                if (item.id === action.payload) {
                return { ...item, isDone: !item.isDone };
                }
            // Return all other items unchanged
                return item;
            });
            },

        editTodo: (state, action) => {
        const { id, title } = action.payload;
            return state.map((item) => {
            if (item.id === id) {
                return { ...item, title};
            }
            // Return all other items unchanged
            return item;
            });
        },
    },
    });

    // Destructure the actions from the todoListSlice
    export const { addTodo, removeTodo, editTodo, setTodos, toggleDone, removeMultipleTodos } = todoListSlice.actions;

    // Configure the store with the reducer
    const store = configureStore({
        reducer: {
            todolist: todoListSlice.reducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    });

    export default store;
