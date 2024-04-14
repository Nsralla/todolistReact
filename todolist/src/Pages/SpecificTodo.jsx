import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import classes from '../components/rightsection.module.css';
import {useDispatch} from 'react-redux'
import { toggleTodoAsync } from '../db/index.js';
import { useState } from 'react';
import { UseDeleteTodo } from '../Hooks/UseDeleteTodo.jsx';
import { average } from 'firebase/firestore';
export default function SpecificTodo() {

    const todos = useSelector((state)=>state.todolist);
    const params = useParams();
    const todoColor = params.todoId;
    const filteredTodolist = todos.filter((todo)=>(todo.color === todoColor));
    const title = todoColor === "blue" ? 'Personal Todos' : todoColor === "green" ? "Freelance Todos": 'Work Todos';

    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

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

                <p style={{color:'#000'}}>{todo.title}</p>
                <div className={classes.actionsDiv}>
                    <p style={{color:'#000', margin:'0', padding:'0'}}>{todo.time}</p>
                    <i style={{color:"#000", cursor:"pointer"}} className="fa-solid fa-pen" onClick={() => {}}></i>
                    <i style={{color:"#000", cursor:"pointer"}} className="fa-solid fa-trash" onClick={() => {onDelete(todo.id)}}></i>
                </div>
                </section>
            ))
            )}
        </div>);
}
