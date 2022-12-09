import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../reducer/postsReducer'

//Se agrego el getAllPostReducer al reducer para traer los posts del back
const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
})

export default store