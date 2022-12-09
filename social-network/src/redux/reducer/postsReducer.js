import { createSlice } from '@reduxjs/toolkit'
import postActions from '../actions/postActions'
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
    
    getAllPosts:(state)=>{
      /**
      * llamo a la accion de todos los posts  
      */
      postActions.getAllPosts(state)
    },


  },
})

/**
 * aqui importas todos los actions que vas creando 
 */
export const { getAllPosts } = findAllPost.actions

export default findAllPost.reducer