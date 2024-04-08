import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import classes from '../components/rightsection.module.css';
export default function SpecificTodo() {

    const todos = useSelector((state)=>state.todolist);
    const params = useParams();
    const todoColor = params.todoId;
    const filteredTodolist = todos.filter((todo)=>(todo.color === todoColor));
    const title = todoColor === "blue" ? 'Personal Todos' : todoColor === "green" ? "Freelance Todos": 'Work Todos';


    return(
    <div>
        <h1 style={{textAlign:"center"}}>{title}</h1>
            { filteredTodolist.map((todo)=>(
                <section style={{marginLeft:"5%"}} className={classes.todoItem} key={todo.id}>
                    <input type="checkbox" />
                    <span
                        className={`${classes[todo.color]} ${classes.statusdot}`}
                    ></span>
                    <p style={{color:'#000'}}>{todo.title}</p>
                    <div className={classes.actionsDiv}>
                        <p style={{color:'#000', margin:'0', padding:'0'}}>{todo.time}</p>
                        <i style={{color:"#000", cursor:"pointer"}} className="fa-solid fa-pen"></i>
                        <i style={{color:"#000", cursor:"pointer"}} className="fa-solid fa-trash"></i>
                    </div>
                </section>
            ))}
    </div>);
}
