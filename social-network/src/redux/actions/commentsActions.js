import axios from "axios"

export const createComment = (data, postId) => {
    return async function () {
        try {
            await axios.post(`http://127.0.0.1:3001/comment/${postId}`, data)
            //console.log('createcomment')
        } catch (error) {
            console.log(error)
        }
    }
}