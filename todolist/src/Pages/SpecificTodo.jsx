import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import classes from '../components/rightsection.module.css';
import {useDispatch} from 'react-redux'
import { toggleTodoAsync } from '../db/index.js';
import { useState } from 'react';
import { UseDeleteTodo } from '../Hooks/UseDeleteTodo.jsx';
import { average } from 'firebase/firestore';
import { UseEditTodo } from '../Hooks/UseEditTodo.jsx';
export default function SpecificTodo() {

    const todos = useSelector((state)=>state.todolist);
    const params = useParams();
    const todoColor = params.todoId;
    const filteredTodolist = todos.filter((todo)=>(todo.color === todoColor));
    const title = todoColor === "blue" ? 'Personal Todos' : todoColor === "green" ? "Freelance Todos": 'Work Todos';

    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const [editingId, setEditingId] = useState(null);

    const { handleChangingTask, editError} = UseEditTodo();

    const {handleDeleteTodo, error} = UseDeleteTodo();

    async function onDelete(id){
        setIsLoading(true);
        await handleDeleteTodo(id);
        if(!error){
            console.log("deleting successfully");
        }
        setIsLoading(false);
    }

    // handle toggle
    async function handleToggle(todo) {
        setIsLoading(true);
        dispatch(toggleTodoAsync(todo));
        setIsLoading(false);
    }

    async function handleEditing(id, newTitle){
        setIsLoading(true);
        await handleChangingTask(id, newTitle)
        if(!editError)
            console.error("error editing task");
        setIsLoading(false);
    }
    return(
        <div>
            <h1 style={{textAlign:"center"}}>{title}</h1>
            {isLoading ? (
            <div>Loading...</div>
            ) : (
            filteredTodolist.map((todo) => (
                <section style={{marginLeft:"5%"}} className={classes.todoItem} key={todo.id}>
                <input
                    checked={todo.isDone}
                    type="checkbox"
                    onChange={() => handleToggle(todo)}
                />
                <span
                    className={`${classes[todo.color]} ${classes.statusdot}`}
                ></span>
{/* Show the title or edit the title */}
                {editingId === todo.id ? (
                        <input  style={{width:'80%'}} defaultValue={todo.title} onBlur={(e) => {handleEditing(todo.id, e.target.value)}} />
                        ) : (
                        <p style={{color:'#000'}}>{todo.title}</p>
                )}

                <div className={classes.actionsDiv}>
                    <p style={{color:'#000', margin:'0', padding:'0'}}>{todo.time}</p>
                    <i style={{color:"#000", cursor:"pointer"}} className="fa-solid fa-pen" onClick={() => setEditingId(todo.id)}></i>
                    <i style={{color:"#000", cursor:"pointer"}} className="fa-solid fa-trash" onClick={() => {onDelete(todo.id)}}></i>
                </div>
                </section>
            ))
            )}
        </div>);
}
