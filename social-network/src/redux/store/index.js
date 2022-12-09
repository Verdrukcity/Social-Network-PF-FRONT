import { configureStore } from '@reduxjs/toolkit'
import categoriesReducer from '../reducer/categoriesReducer'
import postsReducer from '../reducer/postsReducer'

//Se agrego el getAllPostReducer al reducer para traer los posts del back
const store = configureStore({
  reducer: {
    posts: postsReducer,
    categories: categoriesReducer,
  },
})

export default store
