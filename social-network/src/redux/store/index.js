import { configureStore } from '@reduxjs/toolkit'
import categoriesReducer from '../reducer/categoriesReducer'
import countriesReducer from '../reducer/countriesReducer'
import postsReducer from '../reducer/postsReducer'

//Se agrego el getAllPostReducer al reducer para traer los posts del back
const store = configureStore({
  reducer: {
    posts: postsReducer,
    categories: categoriesReducer,
    countries: countriesReducer,
  },
})

export default store
