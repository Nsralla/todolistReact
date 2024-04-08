import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import classes from '../components/rightsection.module.css';
import {useDispatch} from 'react-redux'
import { toggleTodoAsync } from '../db/index.js';
import { useState } from 'react';
export default function SpecificTodo() {

    const todos = useSelector((state)=>state.todolist);
    const params = useParams();
    const todoColor = params.todoId;
    const filteredTodolist = todos.filter((todo)=>(todo.color === todoColor));
    const title = todoColor === "blue" ? 'Personal Todos' : todoColor === "green" ? "Freelance Todos": 'Work Todos';

    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    // handle toggle
    async function handleToggle(todo) {
        setIsLoading(true);
        await dispatch(toggleTodoAsync(todo));
        setIsLoading(false);
    }


    return(
        <div>
            
            <h1 style={{textAlign:"center"}}>{title}</h1>
        <h1 style={{textAlign:"center"}}>{title}</h1>
        {isLoading ? (
        // Assuming you want to show some loading text or indicator
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
            <p style={{color:'#000'}}>{todo.title}</p>
            <div className={classes.actionsDiv}>
                <p style={{color:'#000', margin:'0', padding:'0'}}>{todo.time}</p>
                <i style={{color:"#000", cursor:"pointer"}} className="fa-solid fa-pen" onClick={() => {/* Add edit functionality here */}}></i>
                <i style={{color:"#000", cursor:"pointer"}} className="fa-solid fa-trash" onClick={() => {/* Add delete functionality here */}}></i>
            </div>
            </section>
        ))
        )}
        </div>);
}
