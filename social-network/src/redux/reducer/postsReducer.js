import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

/**
 * estado global de los posts
 */
const initialState = {
  posts: [],
}

// ACTIONS

/*
 * trae todas las publicaciones
 */

export const getAllPostsAsync = (data) => async (dispatch) => {
  try {
    const response = await axios.get('http://127.0.0.1:3001/create')
    dispatch(getAllPosts(response.data.data))
  } catch (error) {
    console.log(error)
  }
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

    getByCategory: filterByCategory,
  },
})

/**
 * aquí importas todos los actions que vas creando
 */
export const { getAllPosts, getByCategory } = findAllPost.actions

export default findAllPost.reducer
