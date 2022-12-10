import { createSlice } from '@reduxjs/toolkit'
import postActions from '../actions/postActions'
import axios from 'axios'
/**
 * estado global de los posts
 */
const initialState = {
  posts:[]
  
}

export const findAllPost = createSlice({
  name: 'post',
  initialState,

  reducers: {
    
    getAllPosts:(state, action)=>{
      /**
      * llamo a la accion de todos los posts  
      */
      state.posts = [action.payload]
    },


  },
})


export const getAllPostsAsync = (data) => async (dispatch) => {
 try{
  const response = await axios.get("http://127.0.0.1:3001/create")
  dispatch(getAllPosts(response.data.data))
 } catch(error){
  console.log(error)
 }
}


/**
 * aqui importas todos los actions que vas creando 
 */
export const { getAllPosts } = findAllPost.actions

export default findAllPost.reducer