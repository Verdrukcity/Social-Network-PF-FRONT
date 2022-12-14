import axios from "axios"
import { postComment } from "../reducer/commentsReducer"

export const createComment = (data, postId) => {
    return async function (dispatch) {
        try {
            const commentStatus = await axios.post(`http://127.0.0.1:3001/comment/${postId}`, data)
            //console.log('createcomment')
            console.log(commentStatus)
            dispatch(postComment(commentStatus))
        } catch (error) {
            console.log(error)
        }
    }
}