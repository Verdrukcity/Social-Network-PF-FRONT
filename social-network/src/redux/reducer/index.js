import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './postsReducer'

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
})

export default store