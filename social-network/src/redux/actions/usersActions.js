import { postUser } from "../reducer/usersReducer";
import axios from ('axios');

export const createUser = (data)=>{
    return async function(dispatch){
        try{
            let created = await axios.post(`http://127.0.0.1:3001/user`, data)
            dispatch(postUser(created.data))
        }
        catch(error){
            res.send(error.message)
        }
    }
}
