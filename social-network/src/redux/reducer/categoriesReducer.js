import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
// import categoriesActions from '../actions/categoriesActions'

/**
 * estado global categorías
 */
const initialState = {
  name: [],
}

export const categories = createSlice({
  name: 'categories',
  initialState,

  reducers: {
    getAllCategories: (state, action) => {
      /**
       * traer todos las categorías
       */
      state.name = [action.payload]
    },
  },
})

export const getAllCategoriesAsync = (data) => async (dispatch) => {
  try {
    const response = await axios.get('http://127.0.0.1:3001/category')
    dispatch(getAllCategories(response.data.data))
  } catch (error) {
    console.log(error)
  }
}

/**
 * aquí se importan todos los actions y el reducer
 */
export const { getAllCategories } = categories.actions

export default categories.reducer
