import classes from './rightsection.module.css';
import {useSelector} from 'react-redux';
import {  useEffect, useRef, useState } from 'react';
import {addTodoAsync, deleteTodoAsync, fetchTodos} from '../db/index.js';
import { useDispatch } from "react-redux";
import { toggleTodoAsync } from '../db/index.js';
import { handleUpdate } from '../db/index.js';
export default function RightSection(){

    const [isLoading, setIsLoading] = useState(false);
    const [editingId, setEditingId] = useState(null);
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
        const time = timeRef.current.value;
        const todo = {title,time,type,color, isDone:false};
        await dispatch(addTodoAsync(todo));
        setIsLoading(false);
        inputRef.current.value = '';
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


// handle toggle
async function handleToggle(todo) {
    console.log(1);
    setIsLoading(true);
    await dispatch(toggleTodoAsync(todo));
    console.log(2);
    setIsLoading(false);
}

// Assuming `handleChangingTask` is defined inside a React component
async function handleChangingTask(id, newTitle){
    console.log(id, newTitle);
    // Correct use of dispatch with async action creator
    await dispatch(handleUpdate(id, newTitle));
    setEditingId(null);
}

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
        {(isLoading )&& <div className={classes.loadingstate}>
                                    <div className={classes.loading}>     
                                    </div>
                                </div>}
{/* PRINT TODOS */}
        {todolist.length > 0  && todolist.map((todo)=>(
            <div key={todo.id} className={classes.todoItem }>
                        <input
                            checked={todo.isDone}
                            onChange={()=>handleToggle(todo)}
                            type='checkbox'/>
                        <span
                            className={`${classes[todo.color]} ${classes.statusdot}`}>
                        </span>
                        {editingId === todo.id ? (
                        <input  style={{width:'80%'}} defaultValue={todo.title} onBlur={(e) => {handleChangingTask(todo.id, e.target.value)}} />
                        ) : (
                        <p>{todo.title}</p>
                        )}
                        <div className={classes.actionsDiv}>
                            <p>{todo.time}</p>
                            <i style={{cursor:"pointer"}} className="fa-solid fa-pen" onClick={() => setEditingId(todo.id)}></i>
                            <i style={{cursor:"pointer"}} className="fa-solid fa-trash" onClick={()=>handleDeleteTodo(todo.id)}></i>
                        </div>
            </div>
        ))}
        
    </div>
    );
}