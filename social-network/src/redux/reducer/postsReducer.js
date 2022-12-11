import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

/**
 * estado global de los posts
 */
const initialState = {
  posts: [],
  created:{}
}



/*
 * filtro por categoría(s)
 */

const filterByCategory = (state, action) => {
  // const newTodos = state.todos.filter((todo) => todo.id !== action.payload)
  // state.todos = newTodos

  const notNullPosts = state.posts.length ? state.posts[0] : state.posts

  const filterCategories = notNullPosts.filter((p) =>
    p.category.includes(action.payload)
  )

  state.posts = [filterCategories]
  
  
  
}

// REDUCER

export const findAllPost = createSlice({
  name: 'post',
  initialState,

  reducers: {
    getAllPosts: (state, action) => {
      /**
       * llamo a la acción de todos los posts
       */
      state.posts = [action.payload]
    },
    createPosts:(state, action)=>{
      /**
      * llamo a la accion de todos los posts  
      */
      state.created = [action.payload]
    },

    getByCategory: filterByCategory,
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
export const CreatePostsAsync = (data) =>  (dispatch) => {
  try{
    console.log(data)
     axios.post("http://127.0.0.1:3001/create/6393c1ae810999a485add50e",data,
    {
      // Endpoint to send files
      headers: {
        // Add any auth token here
        
        'content-type': 'multipart/form-data',
      },
 
    }
   ).then(response=>dispatch(createPosts(response.data.data)))
   
  } catch(error){
   console.log(error)
  }
 }
 


/**
 * aquí importas todos los actions que vas creando
 */
export const { getAllPosts, getByCategory,createPosts } = findAllPost.actions

export default findAllPost.reducer
