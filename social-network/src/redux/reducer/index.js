import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './postsReducer'
import getAllPostsReducer from './getAllPostsReducer'

//Se agrego el getAllPostReducer al reducer para traer los posts del back
const store = configureStore({
  reducer: {
    posts: postsReducer,
    getAllPosts: getAllPostsReducer,
  },
})

export default store