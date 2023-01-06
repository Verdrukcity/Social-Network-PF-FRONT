import { configureStore } from '@reduxjs/toolkit'
import categories from '../reducer/categoriesReducer'
import comments from '../reducer/commentsReducer'
import countries from '../reducer/countriesReducer'
import posts from '../reducer/postsReducer'
import users from '../reducer/usersReducer'
import pago from '../reducer/pagoReducer'
import allUsers from '../reducer/adminReducer'
const store = configureStore({
  reducer: {
    users,
    posts,
    comments,
    countries,
    categories,
    pago,
    allUsers,
  },
})

export default store
