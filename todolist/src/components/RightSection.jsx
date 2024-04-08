import classes from './rightsection.module.css';
import { addTodo } from '../store/index.js';
import {useSelector} from 'react-redux';
import {  useRef, useState } from 'react';
import {useDispatch} from 'react-redux'

export default function RightSection(){
    const todolist = useSelector((state)=>state.todolist);
    const [color,setColor] = useState('blue');
    const [type, setType] = useState('freelance');


    const dispatch = useDispatch();
    const inputRef = useRef();
    const timeRef = useRef();

//  handle adding todo
    function handleSubmit(event){
        event.preventDefault();
        const title = inputRef.current.value;
        const id = generateRandomID();
        const time = timeRef.current.value;
        dispatch(addTodo({id,title,time,type,color}));
    }

// handle choosing the color and the type
    function handleColorType(color,type){
        setColor(color);
        setType(type);
        console.log(color, type)
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

        {todolist.length > 0  && todolist.map((todo)=>(
            <div key={todo.id} className={classes.todoItem }>
                        <input type='checkbox'/>
                        <span className={`${classes[todo.color]} ${classes.statusdot}`}></span>
                        <p>{todo.title}</p>
                        <div className={classes.actionsDiv}>
                            <p>{todo.time}</p>
                            <i className="fa-solid fa-pen"></i>
                            <i className="fa-solid fa-trash"></i>
                        </div>
            </div>
        ))}
        
    </div>
    );
}


function generateRandomID() {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    // Generate a random ID of length 20
    let id = "";
    for (let i = 0; i < 20; i++) {
        // Generate a random index for the characters string
        const index = Math.floor(Math.random() * characters.length);
        // Add the character at the random index to the ID
        id += characters[index];
    }
    return id;
}