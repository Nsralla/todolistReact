// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { addTodo, setTodos } from "../store/index.js";



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
        dispatch(addTodo(todo));
        } catch (error) {
        console.error("Error adding document: ", error);
    }
};

// Async function to fetch todos from Firestore
export const fetchTodos = () => async (dispatch) => {
    const querySnapshot = await getDocs(collection(db, "todos"));
    const todos = querySnapshot.docs.map(doc => ({ ...doc.data()}));
    dispatch(setTodos(todos));
};


