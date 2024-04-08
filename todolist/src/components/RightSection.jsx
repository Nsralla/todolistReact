import classes from './rightsection.module.css';
import {useSelector} from 'react-redux';
import {  useEffect, useRef, useState } from 'react';
import {addTodoAsync, deleteTodoAsync, fetchTodos} from '../db/index.js';
import { useDispatch } from "react-redux";
import { toggleDone } from '../store/index.js';

export default function RightSection(){

    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    // FETCH TODOS FROM DATA BASE
    useEffect(()=>{
        async function fetchtodosDb(){
            setIsLoading(true);
            await dispatch(fetchTodos());
            setIsLoading(false);
        }
        fetchtodosDb();
    },[dispatch]);

    const todolist = useSelector((state)=>state.todolist);
    const [color,setColor] = useState('blue');
    const [type, setType] = useState('freelance');

    const inputRef = useRef();
    const timeRef = useRef();
    
//  handle adding todo
    async function handleSubmit(event){
        event.preventDefault();
        setIsLoading(true);
        const title = inputRef.current.value;
        // const id = generateRandomID();
        const time = timeRef.current.value;
        const todo = {title,time,type,color, isDone:false};
        await dispatch(addTodoAsync(todo));
        setIsLoading(false);
    }

    async function handleDeleteTodo(id) {
        setIsLoading(true);
        try {
            await dispatch(deleteTodoAsync(id)); // Corrected the typo here
        } catch (error) {
            console.error("Error deleting todo: ", error);
            // Optionally handle the error state here (e.g., show an error message to the user)
        }
        setIsLoading(false);
}


// handle choosing the color and the type
    function handleColorType(color,type){
        setColor(color);
        setType(type);
    }

    console.log(todolist);

    return (
    <div className={classes.rightsideMainDiv}>
        <h2>Today Main Focus</h2>
        <h1>Add Teams Meetings</h1>

        <div className={classes.taskinputDiv}>
            <span style={{cursor:'pointer'}} onClick={()=>{handleColorType('blue','personal')}} className={`${classes.statusdot} ${classes.blue}`}></span>
            <span style={{cursor:'pointer'}}  onClick={()=>{handleColorType('green','freelance')}} className={`${classes.statusdot} ${classes.green}`}></span>
            <span style={{cursor:'pointer'}}  onClick={()=>{handleColorType('yellow', 'work')}} className={`${classes.statusdot} ${classes.yellow}`}></span>
            <input
            ref={inputRef}
                className={classes.taskinput}
                placeholder="what is your next task?"
                type="text"
                required
            />
            <input ref={timeRef}  className={classes.time} type='time'/>
            <button className={classes.button5} onClick={handleSubmit}>Add Task</button>
        </div>

{/* Loading spinner */}
        {isLoading && <div className={classes.loadingstate}>
                                    <div className={classes.loading}>     
                                    </div>
                                </div>}
{/* PRINT TODOS */}
        {todolist.length > 0  && todolist.map((todo)=>(
            <div key={todo.id} className={classes.todoItem }>
                        <input onClick={()=>{dispatch(toggleDone(todo.id))}} type='checkbox'/>
                        <span className={`${classes[todo.color]} ${classes.statusdot}`}></span>
                        <p>{todo.title}</p>
                        <div className={classes.actionsDiv}>
                            <p>{todo.time}</p>
                            <i style={{cursor:"pointer"}} className="fa-solid fa-pen"></i>
                            <i style={{cursor:"pointer"}} className="fa-solid fa-trash" onClick={()=>handleDeleteTodo(todo.id)}></i>
                        </div>
            </div>
        ))}
        
    </div>
    );
}


// function generateRandomID() {
//     const characters =
//         "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
//     // Generate a random ID of length 20
//     let id = "";
//     for (let i = 0; i < 20; i++) {
//         // Generate a random index for the characters string
//         const index = Math.floor(Math.random() * characters.length);
//         // Add the character at the random index to the ID
//         id += characters[index];
//     }
//     return id;
// }