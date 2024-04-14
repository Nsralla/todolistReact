import { useCallback, useState } from "react";
import { deleteTodoAsync } from "../db/index";
import {useDispatch} from 'react-redux';

export function UseDeleteTodo(){
    const [error, setError] = useState(null);
    const dispatch = useDispatch();


    const handleDeleteTodo = useCallback(async(id)=>{
        setError(null);
                try {
                    await dispatch(deleteTodoAsync(id)); 
                } catch (error) {
                    console.error("Error deleting todo: ", error);
                    setError(error);
                }
    },[dispatch]);
    
    return {handleDeleteTodo, error};

}