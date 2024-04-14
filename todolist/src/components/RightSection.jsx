import classes from './rightsection.module.css';
import {useSelector} from 'react-redux';
import {  useCallback, useEffect, useRef, useState } from 'react';
import {addTodoAsync, fetchTodos} from '../db/index.js';
import { useDispatch } from "react-redux";
import { toggleTodoAsync } from '../db/index.js';
import { handleUpdate } from '../db/index.js';
import {deleteSetTodos} from '../db/index.js'
import Span from '../Pages/Span.jsx';
import { UseDeleteTodo } from '../Hooks/UseDeleteTodo.jsx';
export default function RightSection(){

    const [isLoading, setIsLoading] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const dispatch = useDispatch();
    const todolist = useSelector((state) => state.todolist);
    const [color, setColor] = useState("blue");
    const [type, setType] = useState("freelance");
    const inputRef = useRef();
    const timeRef = useRef();

    const {handleDeleteTodo, error} = UseDeleteTodo();


    // FETCH TODOS FROM DATA BASE
useEffect(()=>{
        async function fetchtodosDb(){
            setIsLoading(true);
            await dispatch(fetchTodos());
            setIsLoading(false);
        }
        fetchtodosDb();
    },[dispatch]);


async function onDelete(id){
    setIsLoading(true);
    await handleDeleteTodo(id);
    if(!error){
        console.log("deleting successfully");
    }
    setIsLoading(false);
}

//  handle adding todo
const handleSubmit = useCallback(async(event)=>{
        event.preventDefault();
        setIsLoading(true);
        const title = inputRef.current.value;
        const time = timeRef.current.value;
        const todo = {title,time,type,color, isDone:false};
        await dispatch(addTodoAsync(todo));
        setIsLoading(false);
        inputRef.current.value = '';
},[dispatch, color, type]);



// handle choosing the color and the type
const handleColorType = useCallback((color, type)=>{
    setColor(color);
    setType(type);
},[]);

// handle toggle
const handleToggle = useCallback(async(todo)=>{
    setIsLoading(true);
    await dispatch(toggleTodoAsync(todo));
    setIsLoading(false);
},[dispatch]);

// Assuming `handleChangingTask` is defined inside a React component
const handleChangingTask = useCallback(async(id,newTitle)=>{
    await dispatch(handleUpdate(id, newTitle));
    setEditingId(null);
},[dispatch]);

// handle delete set of todos
const handleDeleteSetTodos = useCallback(async()=>{
    setIsLoading(true);
    // collect all todos with isDone = true
    const doneTodos = todolist.filter((todo)=>{return(todo.isDone === true)});
    await dispatch(deleteSetTodos(doneTodos));
    setIsLoading(false);
},[dispatch, todolist]);


    return (
    <div className={classes.rightsideMainDiv}>
        <h2>Today Main Focus</h2>
        <div style={{display:'flex',justifyContent:'space-between', alignItems:'center', width:'80%'}}>
            <h1>Add Teams Meetings </h1>
            <button onClick={handleDeleteSetTodos} className={`${classes.bn632hover} ${classes.bn25}`}>Delete All</button>
        </div>
        <div className={classes.taskinputDiv}>
            <Span handleColorType={handleColorType} color='blue' functional='personal'/>
            <Span handleColorType={handleColorType} color='green' functional='freelance'/>
            <Span handleColorType={handleColorType} color='yellow' functional='work'/>
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
{/* {show error} */}
        {error && <h2>Error deleting the todo {error}</h2>}
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
                            <i style={{cursor:"pointer"}} className="fa-solid fa-trash" onClick={()=>onDelete(todo.id)}></i>
                        </div>
            </div>
        ))}
        
    </div>
    );
}