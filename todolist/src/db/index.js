// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { deleteDoc, getFirestore, updateDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { addTodo, editTodo, removeTodo, setTodos, toggleDone } from "../store/index.js";
import {  doc } from "firebase/firestore";
import {removeMultipleTodos} from '../store/index.js'


const firebaseConfig = {
    apiKey: "AIzaSyD4c4Ou1tucNKbdnThFKqkFzzv5bbWs8ag",
    authDomain: "todolist-react-5ec98.firebaseapp.com",
    projectId: "todolist-react-5ec98",
    storageBucket: "todolist-react-5ec98.appspot.com",
    messagingSenderId: "499883090579",
    appId: "1:499883090579:web:8db844928041bed5146366",
    measurementId: "G-FD9R4XRVG0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firestore
const db = getFirestore(app);

export { app, db };

export const addTodoAsync = (todo) => async (dispatch) => {
    try {
        const docRef = await addDoc(collection(db, "todos"), todo);
        console.log("Document written with ID: ", docRef.id);
        const newTodo = { id: docRef.id, ...todo };
        dispatch(addTodo(newTodo));
        } catch (error) {
        console.error("Error adding document: ", error);
    }
};

// Async function to fetch todos from Firestore
export const fetchTodos = () => async (dispatch) => {
    const querySnapshot = await getDocs(collection(db, "todos"));
    const todos = querySnapshot.docs.map(doc => ({ id:doc.id,...doc.data()}));
    dispatch(setTodos(todos));
};
export const deleteTodoAsync = (id) => async (dispatch) => {
    try {
        if (!id) throw new Error("Document ID is undefined.");
        await deleteDoc(doc(db, "todos", id));
        dispatch(removeTodo(id));
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
};

export const toggleTodoAsync = (todo) => async (dispatch) => {
    try {
        const todoRef = doc(db, "todos", todo.id);
        await updateDoc(todoRef, { isDone: !todo.isDone });
        console.log("Document updated with ID: ", todo.id);
        dispatch(toggleDone(todo.id));
    } catch (error) {
        console.error("Error updating document: ", error);
    }
};

export const handleUpdate = (id, newTitle) => async(dispatch)=>{
    try{
         // Update in Firestore
        const todoRef = doc(db, "todos", id);
        await updateDoc(todoRef, { title: newTitle });
        console.log("Document updated with ID: ", id);
        // Optionally, dispatch an action to update the Redux state
        dispatch(editTodo({ id, title: newTitle }));
    }catch(error){
        console.error(error);
    }
};

export const deleteSetTodos = (doneTodos) => async (dispatch)=>{
    const deletePromises = doneTodos.map((todo) => {
        const todoRef = doc(db, "todos", todo.id);
        return deleteDoc(todoRef);
    });

    try {
        await Promise.all(deletePromises);
        dispatch(removeMultipleTodos(doneTodos));
        console.log("All selected todos have been deleted successfully.");
        // Update local state or UI here if necessary
    } catch (error) {
        console.error("Error deleting todos:", error);
    }
}



