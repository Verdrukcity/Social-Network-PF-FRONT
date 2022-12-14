import axios from 'axios'
import { getAllUsers } from '../reducer/userReducer'

export const getAllPostsAsync = (data) => async (dispatch) => {
  try {
    const response = await axios.get('http://127.0.0.1:3001/authuser')
    dispatch(getAllUsers(response.data))
  } catch (error) {
    console.log(error)
  }
}
