import { configureStore } from '@reduxjs/toolkit'
import posts from '../reducer/postsReducer'
import comments from '../reducer/commentsReducer'
import categories from '../reducer/categoriesReducer'
import countries from '../reducer/countriesReducer'
import pago from '../reducer/pagoReducer'


const store = configureStore({
  reducer: {
    posts: posts,
    countries: countries,
    comments: comments,
    categories: categories,
    pago:pago,
  },
})

export default store
