import { configureStore } from '@reduxjs/toolkit'
import posts from '../reducer/postsReducer'
import comments from '../reducer/commentsReducer'
import categories from '../reducer/categoriesReducer'
import countries from '../reducer/countriesReducer'


const store = configureStore({
  reducer: {
    posts: posts,
    countries: countries,
    comments: comments,
    categories: categories,
  },
})

export default store
