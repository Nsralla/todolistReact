import { useDispatch } from "react-redux";
import { handleUpdate } from "../db/index";
import { useCallback, useState } from "react";
export function UseEditTodo() {

    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const handleChangingTask = useCallback(
        async (id, newTitle) => {
            try{
                await dispatch(handleUpdate(id, newTitle));
            }
            catch(error){
                console.log(error);
                setError(error);
                console.log("error editing todo");
            }
        },
        [dispatch]
    );

    return {handleChangingTask, error};
}
