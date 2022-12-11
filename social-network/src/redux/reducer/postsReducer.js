import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


/**
 * estado global de los posts
 */
const initialState = {
  posts: [],
  created: {},
  comments: [],
  detail: {},
  userDetail:{}
}

/*
 * filtro por categoría(s)
 */

const filterByCategory = (state, action) => {
  const notNullPosts = state.posts.length ? state.posts[0] : state.posts

  const filterCategories = notNullPosts.filter((p) =>
    p.category?.includes(action.payload)
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
    createPosts: (state, action) => {
      /**
       * llamo a la accion de todos los posts
       */
      state.created = [action.payload]
    },
    getPostDetail:(state, action)=>{
      state.detail = action.payload

    },
    getDetailUser:(state,action)=>{

      state.userDetail = [action.payload]

    },
    
    getByCategory: filterByCategory,
  },
})

export const getAllPostsAsync = (data) => async (dispatch) => {
  try {
    const response = await axios.get('http://127.0.0.1:3001/create')
    dispatch(getAllPosts(response.data.data))
  } catch (error) {
    console.log(error)
  }
}
export const getUserDetailAsync = (data) => async (dispatch) => {
  try {
    const response = await axios.get(`http://127.0.0.1:3001/userDetail/639604a18b5c1a0e8d07388f`)
    dispatch(getDetailUser(response[0]))
  } catch (error) {
    console.log(error)
  }
}

export const CreatePostsAsync = (data) =>  (dispatch) => {
  try{
    axios.post("http://127.0.0.1:3001/create/639604a18b5c1a0e8d07388f",data,
    {
      // Endpoint to send files
      headers: {
        // Add any auth token here
        'content-type': 'multipart/form-data',
      }
    }
   ).then(response=>dispatch(createPosts(response.data.data)))
   
  } catch(error){
   console.log(error)
  }
}

export const createComment = (data, postId) => {
  return async function(){
    try {
      await axios.post(`http://127.0.0.1:3001/comment/${postId}`, data)
      //console.log('createcomment')
    } catch (error) {
      console.log(error)
    }
  }
}
export const getPostDetailAsync = (postId) => async (dispatch) => {
  
  try{
    //Obtenemos el post buscado por id en la variable details
    const details = await axios.get(`http://127.0.0.1:3001/detail/${postId}`)

    //despachamos la accion 
    dispatch(getPostDetail(details.data))

  }
  catch(error){
    console.log(error)
  }
 }
 


/**
 * aquí importas todos los actions que vas creando
 */
export const { getAllPosts, getByCategory,createPosts, getPostDetail,getDetailUser } = findAllPost.actions

export default findAllPost.reducer
